import { EvilIcons, Feather, Foundation } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, Dimensions, Modal, TextInput, Button } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { FontAwesome } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const rewards = [
  { id: 1, name: 'Nama Reward', thumbs: 0, limit: '1/1', image: null },
  { id: 2, name: 'Nama Reward', thumbs: 0, limit: '1/1', image: null },
  { id: 3, name: 'Nama Reward', thumbs: 0, limit: '1/1', image: null },
  { id: 4, name: 'Nama Reward', thumbs: 0, limit: '1/1', image: null },
];

export default function Rewards() {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const sidebarAnim = useRef(new Animated.Value(-width)).current;

  const toggleSidebar = () => {
    Animated.timing(sidebarAnim, {
      toValue: isSidebarVisible ? -width : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setSidebarVisible(!isSidebarVisible);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
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
            <View style={styles.sidebarItem}>
              <Foundation name="checkbox" size={30} color="black" />
              <Text style={styles.sidebarText}>Task</Text>
            </View>
          </Link>
          <Link href="/rewards" style={styles.sidebarLink}>
            <View style={[styles.sidebarItem, styles.activeSidebarItem]}>
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
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={toggleSidebar}>
            <Feather name="menu" size={40} color="black" />
          </TouchableOpacity>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Nama User</Text>
            <Text style={styles.userRole}>Orang Tua</Text>
          </View>
          <View style={styles.userAvatar}></View>
        </View>
        <View style={styles.rewardsHeader}>
          <Text style={styles.rewardsTitle}>REWARDS</Text>
          <TouchableOpacity style={styles.editButton}>
            <FontAwesome name="edit" size={24} color="#718096" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.addButton} onPress={toggleModal}>
            <FontAwesome name="plus" size={24} color="#718096" />
          </TouchableOpacity>
        </View>
        <Text style={styles.limitText}>
          <FontAwesome name="exclamation-circle" size={16} color="#718096" /> Limit redeem rewards akan refresh setiap bulan
        </Text>
        <View style={styles.filterContainer}>
          <Text style={[styles.filterText, styles.activeFilter]}>Semua</Text>
          <Text style={styles.filterText}>Mainan</Text>
          <Text style={styles.filterText}>Pakaian</Text>
          <Text style={styles.filterText}>Voucher</Text>
        </View>
        <View style={styles.rewardsContainer}>
          {rewards.map((reward) => (
            <View key={reward.id} style={styles.rewardCard}>
              <View style={styles.imagePlaceholder}>
                <Text style={styles.imageText}>FOTO REWARD</Text>
              </View>
              <Text style={styles.rewardName}>{reward.name}</Text>
              <Text style={styles.rewardInfo}>{reward.thumbs} Jempol</Text>
              <Text style={styles.rewardInfo}>{reward.limit} Limit Redeem</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Tambah Reward</Text>
              <TouchableOpacity onPress={toggleModal}>
                <AntDesign name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>
            <View style={styles.imagePlaceholderModal}>
              <Text style={styles.imageTextModal}>FOTO REWARD</Text>
            </View>
            <TouchableOpacity style={styles.uploadButton}>
              <Text style={styles.uploadButtonText}>Upload</Text>
            </TouchableOpacity>
            <TextInput placeholder="Nama Reward" style={styles.input} />
            <TextInput placeholder="Harga (Jempol)" style={styles.input} keyboardType="numeric" />
            <TextInput placeholder="Limit Redeem" style={styles.input} keyboardType="numeric" />
            <TextInput placeholder="Deskripsi Reward" style={styles.textArea} multiline={true} numberOfLines={4} />
            <TouchableOpacity style={styles.saveButton} onPress={toggleModal}>
              <Text style={styles.saveButtonText}>Simpan</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC',
  },
  scrollContainer: {
    paddingTop: 30,
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
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#E3F2FD',
  },
  menuButton: {
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
    alignItems: 'flex-end',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userRole: {
    fontSize: 14,
    color: '#718096',
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#CBD5E0',
  },
  rewardsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  rewardsTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
  },
  editButton: {
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#E2E8F0',
    padding: 5,
    borderRadius: 10,
  },
  limitText: {
    padding: 10,
    fontSize: 14,
    color: '#718096',
    backgroundColor: '#EDF2F7',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#EDF2F7',
  },
  filterText: {
    fontSize: 14,
    color: '#4A5568',
  },
  activeFilter: {
    color: '#3182CE',
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  rewardsContainer: {
    padding: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  rewardCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 10,
  },
  imageText: {
    fontSize: 12,
    color: '#A0AEC0',
  },
  rewardName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  rewardInfo: {
    fontSize: 12,
    color: '#718096',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  imagePlaceholderModal: {
    width: '100%',
    height: 150,
    backgroundColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 10,
  },
  imageTextModal: {
    fontSize: 16,
    color: '#A0AEC0',
  },
  uploadButton: {
    width: '100%',
    backgroundColor: '#E2E8F0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  uploadButtonText: {
    color: '#718096',
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    marginBottom: 10,
  },
  textArea: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    marginBottom: 10,
    textAlignVertical: 'top',
  },
  saveButton: {
    width: '100%',
    backgroundColor: '#4299E1',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
  },
});

