import { EvilIcons, Feather, Foundation } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, Dimensions } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const { width } = Dimensions.get('window');

const TaskItem = () => (
  <View style={styles.taskItem}>
    <Text style={styles.taskTitle}>List item</Text>
    <Text style={styles.taskDescription}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam, cumque!</Text>
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
            <Feather name="menu" size={40} color="black" />
          </TouchableOpacity>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Nama User</Text>
            <Text style={styles.userRole}>Orang Tua</Text>
          </View>
          <View style={styles.profileIcon}></View>
        </View>
        <Text style={styles.dashboardTitle}>DASHBOARD</Text>
        <View style={styles.taskSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Task Anak</Text>
            <TouchableOpacity style={styles.addButton}>
              <AntDesign name="pluscircleo" size={24} color="#000" />
            </TouchableOpacity>
          </View>
          <TaskItem />
          <TaskItem />
          <TaskItem />
        </View>
        <View style={styles.taskSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Task Pengasuh</Text>
            <TouchableOpacity style={styles.addButton}>
              <AntDesign name="pluscircleo" size={24} color="#000" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 10,
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 18,
    padding: 20,
    backgroundColor: '#e0f7ff',
  },
  menuIcon: {
    width: 30,
    height: 30,
    backgroundColor: '#000',
    borderRadius: 5,
    marginTop: 10,
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
  dashboardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal: 15,
    paddingBottom: 10,
    marginTop: 15,
  },
  taskSection: {
    backgroundColor: '#e0f7ff',
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
  addButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 24,
    lineHeight: 24,
  },
  taskItem: {
    backgroundColor: '#d1c4e9',
    borderRadius: 10,
    padding: 15,
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
});
