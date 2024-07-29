import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="menu" size={24} color="black" style={styles.menuIcon} />
        <View style={styles.headerContent}>
          <Text style={styles.headerText}>Nama User</Text>
          <Text style={styles.subHeaderText}>Orang Tua</Text>
        </View>
        <View style={styles.profilePicture} />
      </View>
      <View style={styles.infoContainer}>
        <Ionicons name="information-circle-outline" size={24} color="black" />
        <Text style={styles.infoText}>Task akan reset setiap hari</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
          <MaterialIcons name="add-box" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.taskSection}>
        <Text style={styles.sectionTitle}>TASK ANAK</Text>
        <View style={styles.taskCard}>
          <Text style={styles.taskTitle}>Judul Task</Text>
          <Text style={styles.taskSubtitle}>Assigned Role</Text>
          <View style={styles.iconContainer}>
            <MaterialIcons name="edit" size={24} color="black" />
            <MaterialIcons name="delete" size={24} color="black" />
          </View>
        </View>
        <Text style={styles.sectionTitle}>Requested Task</Text>
        <View style={styles.requestedTaskCard}>
          <Text style={styles.taskTitle}>Judul Task</Text>
          <Text style={styles.taskSubtitle}>0 Jempol Requested</Text>
          <Text style={styles.taskRequestedBy}>Requested by: Nama User</Text>
        </View>
        <Text style={styles.sectionTitle}>TASK PENGASUH</Text>
        <View style={styles.taskCard}>
          <Text style={styles.taskTitle}>Judul Task</Text>
          <Text style={styles.taskSubtitle}>Kategori Task?</Text>
          <View style={styles.iconContainer}>
            <MaterialIcons name="edit" size={24} color="black" />
            <MaterialIcons name="delete" size={24} color="black" />
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
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>REQUESTED TASK</Text>
          <TextInput style={styles.input} placeholder="Judul Task" />
          <TextInput style={styles.input} placeholder="Kategori" />
          <TextInput style={styles.input} placeholder="Requested Points" />
          <TextInput style={styles.input} placeholder="Deskripsi" multiline />
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.denyButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonText}>DENY</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.acceptButton}>
              <Text style={styles.buttonText}>ACCEPT</Text>
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
    padding: 10,
    backgroundColor: '#f8f9fa',
    marginTop: 20
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#61C0F4'
  },
  menuIcon: {
    marginRight: 16,
  },
  headerContent: {
    flex: 1,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 129
  },
  subHeaderText: {
    fontSize: 16,
    color: '#6c757d',
    marginLeft: 170
  },
  profilePicture: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#dee2e6',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  infoText: {
    fontSize: 16,
    marginLeft: 8,
    flex: 1,
  },
  addButton: {
    marginLeft: 8,
  },
  taskSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  taskCard: {
    backgroundColor: '#d9e7fb',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  taskSubtitle: {
    fontSize: 16,
    color: '#6c757d',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 60,
  },
  requestedTaskCard: {
    backgroundColor: '#e6d4f4',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  taskRequestedBy: {
    fontSize: 14,
    color: '#6c757d',
    marginTop: 8,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 8,
    marginBottom: 16,
    borderColor: '#ced4da',
    borderWidth: 1,
    width: '100%',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  denyButton: {
    backgroundColor: '#dc3545',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
  },
  acceptButton: {
    backgroundColor: '#198754',
    padding: 12,
    borderRadius: 8,
    flex: 1,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
