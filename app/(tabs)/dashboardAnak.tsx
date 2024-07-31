import { EvilIcons, Feather, Foundation } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, Dimensions } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const { width } = Dimensions.get('window');

const rewards = [
  { id: 1, name: 'Nama Reward', thumbs: 0, limit: '1/1', image: null },
  { id: 2, name: 'Nama Reward', thumbs: 0, limit: '1/1', image: null },
];

const TaskItem = () => (
  <View style={styles.taskItem}>
    <Text style={styles.taskTitle}>List item</Text>
    <Text style={styles.taskDescription}>Supporting line text lorem ipsum dolor sit amet, consectetur.</Text>
  </View>
);

export default function App() {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const sidebarAnim = useRef(new Animated.Value(-width)).current;

  const toggleSidebar = () => {
    Animated.timing(sidebarAnim, {
      toValue: isSidebarVisible ? -width : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setSidebarVisible(!isSidebarVisible);
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.sidebar, { transform: [{ translateX: sidebarAnim }] }]}>
        <TouchableOpacity style={styles.backButton} onPress={toggleSidebar}>
          <AntDesign name="arrowleft" size={35} color="black" />
        </TouchableOpacity>
        <View style={styles.sidebarItemsContainer}>
          <Link href="/dashboardAnak" style={styles.sidebarLink}>
            <View style={[styles.sidebarItem, styles.activeSidebarItem]}>
              <Feather name="home" size={30} color="black" />
              <Text style={styles.sidebarText}>Dashboard</Text>
            </View>
          </Link>
          <Link href="/task" style={styles.sidebarLink}>
            <View style={styles.sidebarItem}>
              <Foundation name="checkbox" size={30} color="black" />
              <Text style={styles.sidebarText}>Task</Text>
            </View>
          </Link>
          <Link href="/rewards" style={styles.sidebarLink}>
            <View style={styles.sidebarItem}>
              <EvilIcons name="trophy" size={40} color="black" />
              <Text style={styles.sidebarText}>Rewards</Text>
            </View>
          </Link>
          <Link href="/profileAnak" style={styles.sidebarLink}>
            <View style={styles.sidebarItem}>
              <Feather name="user" size={30} color="black" />
              <Text style={styles.sidebarText}>Profile</Text>
            </View>
          </Link>
        </View>
      </Animated.View>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity onPress={toggleSidebar}>
            <Feather name="menu" size={40} color="black" />
          </TouchableOpacity>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Nama User</Text>
            <Text style={styles.userRole}>Anak</Text>
          </View>
          <View style={styles.profileIcon}></View>
        </View>
        <Text style={styles.dashboardTitle}>DASHBOARD</Text>
        <View style={styles.taskSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Task</Text>
            <View style={styles.taskProgress}>
              <Text style={styles.completedTaskText}>0/3 Completed</Text>
              <Text style={styles.resetText}>Reset setiap hari</Text>
            </View>
          </View>
          <TaskItem />
          <TaskItem />
          <TaskItem />
        </View>
        <View style={styles.rewardsSection}>
          <Text style={styles.sectionTitle}>Rewards</Text>
          <View style={styles.rewardsContainer}>
            {rewards.map((reward) => (
              <View key={reward.id} style={styles.rewardCard}>
                <View style={styles.imagePlaceholder}>
                  <Text style={styles.imageText}>FOTO REWARD</Text>
                </View>
                <Text style={styles.rewardName}>{reward.name}</Text>
                <Text style={styles.rewardInfo}>{reward.thumbs} Jempol</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  sidebarItemsContainer: {
    flex: 1,
    paddingTop: 102
  },
  sidebar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: width * 0.83,
    backgroundColor: '#fff',
    paddingVertical: 40,
    paddingHorizontal: 20,
    zIndex: 1000,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  backButton: {
    marginBottom: 15,
    marginTop: 5,
  },
  sidebarLink: {
    marginBottom: 20,
    width: 270,
    height: 60
  },
  sidebarItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#E3F2FD',
    width: 270,
    height: 59
  },
  activeSidebarItem: {
    backgroundColor: '#61C0F4',
  },
  sidebarText: {
    marginLeft: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 10,
    backgroundColor: '#E3F2FD', // Ubah warna background header menjadi biru
  },
  menuIcon: {
    marginRight: 10,
  },
  userInfo: {
    alignItems: 'center',
    marginLeft: 'auto',
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  userRole: {
    fontSize: 14,
    color: 'grey',
  },
  profileIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#ccc',
    borderRadius: 20,
    marginLeft: 10,
  },
  dashboardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  taskSection: {
    backgroundColor: '#e3f2fd',
    marginHorizontal: 15,
    marginVertical: 10,
    borderRadius: 10,
    padding: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  taskProgress: {
    alignItems: 'flex-end',
  },
  completedTaskText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  resetText: {
    fontSize: 12,
    color: 'grey',
  },
  taskItem: {
    backgroundColor: '#bbdefb',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  taskDescription: {
    fontSize: 14,
    color: '#666',
  },
  rewardsSection: {
    marginHorizontal: 15,
    marginVertical: 10,
    borderRadius: 10,
    padding: 15,
    backgroundColor: '#e3f2fd', // Tambahkan warna biru pada card container
    opacity: 0.5, // Tambahkan transparansi 50%
  },
  rewardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rewardCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  imagePlaceholder: {
    width: 80,
    height: 80,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  imageText: {
    fontSize: 12,
    color: '#757575',
  },
  rewardName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  rewardInfo: {
    fontSize: 14,
    color: '#666',
  },
});
