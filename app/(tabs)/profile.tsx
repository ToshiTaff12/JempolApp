import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, TextInput, Button } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

export default function ProfileScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [birthDate, setBirthDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onChangeDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || birthDate;
    setShowDatePicker(false); // Untuk menutup DatePicker setelah tanggal dipilih
    setBirthDate(currentDate);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="menu" size={24} color="black" style={styles.menuIcon} />
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
          <TouchableOpacity style={styles.syncButton}>
           <Feather name="log-out" size={24} color="black"></Feather>
          </TouchableOpacity>
        </View>
        <View style={styles.familyMember}>
          <TouchableOpacity style={styles.circleButton}></TouchableOpacity>
          <View style={styles.familyInfo}>
            <Text style={styles.familyMemberName}>Nama User</Text>
            <Text style={styles.familyMemberRole}>Role User</Text>
          </View>
          <TouchableOpacity style={styles.syncButton}>
          <Feather name="log-out" size={24} color="black"></Feather>
          </TouchableOpacity>
        </View>
        <Text style={styles.sectionTitle}>PENDING REQUEST</Text>
        <View style={styles.pendingRequest}>
          <TouchableOpacity style={styles.circleButton}></TouchableOpacity>
          <View style={styles.familyInfo}>
            <Text style={styles.pendingRequestName}>Nama User</Text>
            <Text style={styles.pendingRequestRole}>Role User</Text>
          </View>
          <View style={styles.requestButtons}>
            <TouchableOpacity style={styles.approveButton}>
              <Entypo name="check" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.rejectButton}>
              <Entypo name="cross" size={24} color="black" />
            </TouchableOpacity>
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
    marginBottom: 52,
    backgroundColor: '#61C0F4',
    width: 363,
    height: 85
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
});

