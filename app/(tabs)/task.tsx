import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { EvilIcons, Feather, Foundation, Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import AntDesign from 'react-native-vector-icons/AntDesign';

const { width } = Dimensions.get('window');

const TaskItem = () => (
  <View style={styles.taskCard}>
    <View>
      <Text style={styles.taskTitle}>Judul Task</Text>
      <Text style={styles.taskSubtitle}>Kategori Task?</Text>
    </View>
    <View style={styles.iconContainer}>
      <TouchableOpacity>
        <MaterialIcons name="edit" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity>
        <MaterialIcons name="delete" size={24} color="black" />
      </TouchableOpacity>
    </View>
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
          <Link href="/dashboard" style={styles.sidebarLink}>
            <View style={styles.sidebarItem}>
                <Feather name="home" size={30} color="black" />
              <Text style={styles.sidebarText}>Dashboard</Text>
            </View>
          </Link>
          <Link href="/task" style={styles.sidebarLink}>
            <View style={[styles.sidebarItem, styles.activeSidebarItem]}>
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
          <Link href="/profile" style={styles.sidebarLink}>
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
            <Ionicons name="menu" size={40} color="black" />
          </TouchableOpacity>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Nama User</Text>
            <Text style={styles.userRole}>Orang Tua</Text>
          </View>
          <View style={styles.profileIcon}></View>
        </View>
        <View style={styles.resetInfoContainer}>
          <Ionicons name="information-circle-outline" size={16} color="black" />
          <Text style={styles.resetInfo}>Task akan reset setiap hari</Text>
        </View>
        <View style={styles.taskSection}>
          <Text style={styles.sectionTitle}>TASK ANAK</Text>
          <TaskItem />
        </View>
        <View style={styles.taskSection}>
          <Text style={styles.sectionTitle}>TASK PENGASUH</Text>
          <TaskItem />
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.addButton} onPress={() => {}}>
        <MaterialIcons name="add" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  sidebarItemsContainer: {
    flex: 1,
    paddingTop: 102,
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
    height: 60,
  },
  sidebarItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#E3F2FD',
    width: 270,
    height: 59,
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 18,
    padding: 20,
    backgroundColor: '#e0f7ff',
  },
  userInfo: {
    alignItems: 'center',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userRole: {
    fontSize: 14,
    color: 'gray',
  },
  profileIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#ccc',
    borderRadius: 15,
  },
  resetInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    marginVertical: 10,
  },
  resetInfo: {
    fontSize: 12,
    color: '#6c757d',
    marginLeft: 4,
  },
  taskSection: {
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  taskCard: {
    backgroundColor: '#a4d4ff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  taskSubtitle: {
    fontSize: 14,
    color: '#6c757d',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 60,
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    padding: 20,
    backgroundColor: '#d9e7fb',
    borderRadius: 50,
    elevation: 5,
  },
});
