import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View, Alert, ScrollView, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Picker } from '@react-native-picker/picker';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('Orangtua');
  const router = useRouter();

  const handleRegister = () => {
    if (password !== confirmPassword) {
      Alert.alert('Registration Failed', 'Passwords do not match.');
      return;
    }
    Alert.alert('Registration Successful', 'Welcome to the app!', [
      { text: 'OK', onPress: () => router.push('/dashboard') },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.cardContainer}>
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tab]}
              onPress={() => router.push('/')}
            >
              <ThemedText style={styles.tabText}>Login</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, styles.activeTab]}
              onPress={() => {}}
            >
              <ThemedText style={[styles.tabText, styles.activeTabText]}>Register</ThemedText>
            </TouchableOpacity>
          </View>

          <ThemedText style={styles.fontLabel}>Name</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />

          <ThemedText style={styles.fontLabel}>Phone</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Phone"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />

          <ThemedText style={styles.fontLabel}>Email</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />

          <ThemedText style={styles.fontLabel}>Password</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />

          <ThemedText style={styles.fontLabel}>Confirm Password</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry={true}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          <ThemedText style={styles.fontLabel}>Role</ThemedText>
          <Picker
            selectedValue={role}
            style={styles.input}
            onValueChange={(itemValue) => setRole(itemValue)}
          >
            <Picker.Item label="Orangtua" value="Orangtua" />
            <Picker.Item label="Anak" value="Anak" />
            <Picker.Item label="Helper" value="Pengasuh" />
          </Picker>

          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <ThemedText style={styles.buttonText}>Register</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: Dimensions.get('window').height + 200, // Menambahkan 200px untuk membuat scroll lebih banyak
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    width: '100%',
  },
  cardContainer: {
    backgroundColor: '#F1F1F1',
    borderRadius: 12,
    padding: 20,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#E0E0E0',
    marginHorizontal: -1,
  },
  activeTab: {
    backgroundColor: 'white',
    borderBottomWidth: 2,
    borderBottomColor: 'black',
  },
  tabText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  activeTabText: {
    color: 'black',
  },
  input: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderColor: '#C7C7C7',
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    marginBottom: 15,
  },
  button: {
    height: 50,
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#61C0F4',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
  fontLabel: {
    fontSize: 20,
    marginLeft: 8,
    marginBottom: 5,
    alignSelf: 'flex-start',
    color: 'black',
  },
});
