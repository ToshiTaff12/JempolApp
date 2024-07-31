import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, TextInput, Animated, Dimensions } from 'react-native';
import { AntDesign, EvilIcons, Feather, Foundation, Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Link } from 'expo-router';

const { width } = Dimensions.get('window');

export default function ProfileScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [birthDate, setBirthDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const sidebarAnim = useRef(new Animated.Value(-width)).current;
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);


  const onChangeDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || birthDate;
    setShowDatePicker(false); // Untuk menutup DatePicker setelah tanggal dipilih
    setBirthDate(currentDate);
  };

  const handleLogoutPress = () => {
    setLogoutModalVisible(true);
  };


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
            <View style={styles.sidebarItem}>
              <EvilIcons name="trophy" size={40} color="black" />
              <Text style={styles.sidebarText}>Rewards</Text>
            </View>
          </Link>
          <Link href="/profile" style={styles.sidebarLink}>
            <View style={[styles.sidebarItem, styles.activeSidebarItem]}>
              <Feather name="user" size={30} color="black" />
              <Text style={styles.sidebarText}>Profile</Text>
            </View>
          </Link>
        </View>
      </Animated.View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <TouchableOpacity onPress={toggleSidebar}>
            <Ionicons name="menu" size={24} color="black" style={styles.menuIcon} />
          </TouchableOpacity>
          <Text style={styles.headerText}>PROFILE</Text>
        </View>
        <View style={styles.profileContainer}>
          <View style={styles.profilePicture}>
            <Text style={styles.profilePictureText}>FOTO PROFILE</Text>
          </View>
          <Text style={styles.profileName}>Nama User</Text>
          <Text style={styles.profileRole}>Role User</Text>
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Text style={styles.infoText}>Nama: Nama User</Text>
            <TouchableOpacity style={styles.changeButton}>
              <Text style={styles.buttonText}>Change Name</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoText}>Password: ********</Text>
            <TouchableOpacity style={styles.changeButton}>
              <Text style={styles.buttonText}>Change Password</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.additionalInfoContainer}>
          <Text style={styles.infoText}>Email: user@email.com</Text>
          <Text style={styles.infoText}>Phone: +62 123-456-7890</Text>
          <Text style={styles.infoText}>Tanggal Lahir: {birthDate.toLocaleDateString()}</Text>
          <Text style={styles.infoText}>Pekerjaan:</Text>
          <Text style={styles.infoText}>Hobi:</Text>
          <TouchableOpacity style={styles.editButton} onPress={() => setModalVisible(true)}>
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.familySection}>
          <Text style={styles.sectionTitle}>FAMILY MEMBERS</Text>
          <Text style={styles.sectionSubtitle}>TOKEN: 1a2b3c</Text>
          <View style={styles.familyMember}>
            <TouchableOpacity style={styles.circleButton}></TouchableOpacity>
            <View style={styles.familyInfo}>
              <Text style={styles.familyMemberName}>Nama User</Text>
              <Text style={styles.familyMemberRole}>Role User</Text>
            </View>
          </View>
          <View style={styles.familyMember}>
            <TouchableOpacity style={styles.circleButton}></TouchableOpacity>
            <View style={styles.familyInfo}>
              <Text style={styles.familyMemberName}>Nama User</Text>
              <Text style={styles.familyMemberRole}>Pengasuh</Text>
            </View>
          </View>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>EDIT YOUR PROFILE</Text>
              <View style={styles.profilePictureModal}>
                <Text style={styles.profilePictureTextModal}>FOTO PROFILE</Text>
                <TouchableOpacity style={styles.uploadButton}>
                  <Text style={styles.uploadButtonText}>Upload Your Image</Text>
                </TouchableOpacity>
              </View>
              <TextInput style={styles.input} placeholder="Email" />
              <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                <TextInput
                  style={styles.input}
                  placeholder="Tanggal Lahir"
                  value={birthDate.toLocaleDateString()}
                  editable={false}
                />
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={birthDate}
                  mode="date"
                  display="default"
                  onChange={onChangeDate}
                />
              )}
              <TextInput style={styles.input} placeholder="No. Telpon" />
              <TextInput style={styles.input} placeholder="Pekerjaan" />
              <TextInput style={styles.input} placeholder="Hobi" />
              <TouchableOpacity
                style={styles.saveButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Simpan</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingLeft: 0,
    paddingRight: 0,
    padding: 10,
    backgroundColor: '#e0f7ff',
  },
  menuIcon: {
    marginRight: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#d9e7fb',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  profilePictureText: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  profileRole: {
    fontSize: 16,
    color: '#6c757d',
    marginBottom: 26
  },
  infoContainer: {
    backgroundColor: '#d9e7fb',
    padding: 16,
    borderRadius: 8,
    marginBottom: 35,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  changeButton: {
    backgroundColor: '#e6d4f4',
    padding: 8,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  additionalInfoContainer: {
    backgroundColor: '#d9e7fb',
    padding: 16,
    borderRadius: 8,
    marginBottom: 35,
  },
  editButton: {
    backgroundColor: '#e6d4f4',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  familySection: {
    backgroundColor: '#e6d4f4',
    padding: 16,
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#6c757d',
    marginBottom: 8,
  },
  familyMember: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  familyInfo: {
    flex: 1,
    marginLeft: 8,
  },
  familyMemberName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  familyMemberRole: {
    fontSize: 14,
    color: '#6c757d',
  },
  circleButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#6c757d',
  },
  syncButton: {
    padding: 8,
  },
  pendingRequest: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pendingRequestName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  pendingRequestRole: {
    fontSize: 14,
    color: '#6c757d',
  },
  requestButtons: {
    flexDirection: 'row',
  },
  approveButton: {
    marginRight: 8,
    padding: 8,
  },
  rejectButton: {
    padding: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 16,
    backgroundColor: '#d9e7fb',
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  profilePictureModal: {
    alignItems: 'center',
    marginBottom: 16,
  },
  profilePictureTextModal: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
  },
  uploadButton: {
    backgroundColor: '#e6d4f4',
    padding: 8,
    borderRadius: 8,
    marginTop: 8,
  },
  uploadButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  saveButton: {
    backgroundColor: '#e6d4f4',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  backButton: {
    marginBottom: 15,
    marginTop: 5,
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
  sidebarLink: {
    marginBottom: 20,
    width: 270,
    height: 60
  },
  sidebarItemsContainer: {
    flex: 1,
    paddingTop: 102
  },
  activeSidebarItem: {
    backgroundColor: '#61C0F4',
  },
  sidebarText: {
    marginLeft: 20,
    fontSize: 20,
    height: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  scrollView: {
    flex: 1,
  },
  logoutModalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalReminderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalReminderText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
  },
  yesButton: {
    flex: 1,
    padding: 15,
    backgroundColor: '#28a745',
    borderRadius: 5,
    alignItems: 'center',
    marginRight: 10,
  },
  noButton: {
    flex: 1,
    padding: 15,
    backgroundColor: '#dc3545',
    borderRadius: 5,
    alignItems: 'center',
  },
});