import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View, Image, Alert } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('login');
  const router = useRouter();

  const handleLogin = () => {
    if (email === 'admin@gmail.com' && password === 'admin123') {
      Alert.alert('Login Successful', 'Welcome to the app!', [
        { text: 'OK', onPress: () => router.push('/dashboard') },
      ]);
    } else if (email === 'anak1@gmail.com' && password === 'anak123') {
      Alert.alert('Login Successful', 'Welcome to the app, Anak!', [
        { text: 'OK', onPress: () => router.push('/dashboardAnak') },
      ]);
    } else if (email === 'pengasuh@gmail.com'  && password === 'pengasuh123') {
      Alert.alert('Login Successful', 'Welcome to the app!', [
        {text: 'OK', onPress: () => router.push('/dashboardPengasuh') },
      ]);
    }
    else {
      Alert.alert('Login Failed', 'Incorrect email or password.');
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.logoContainer}>
        <Image
          source={{ uri: 'https://cdn.icon-icons.com/icons2/1713/PNG/512/iconfinder-thumbsuplikegesture-3993840_112657.png' }}
          style={styles.logo}
        />
        <ThemedText style={styles.appName}>Jempol App</ThemedText>
      </ThemedView>

      <ThemedView style={styles.cardContainer}>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'login' && styles.activeTab]}
            onPress={() => setActiveTab('login')}
          >
            <ThemedText style={[styles.tabText, activeTab === 'login' && styles.activeTabText]}>Login</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'register' && styles.activeTab]}
            onPress={() => router.push('/register')}
          >
            <ThemedText style={[styles.tabText, activeTab === 'register' && styles.activeTabText]}>Register</ThemedText>
          </TouchableOpacity>
        </View>

        {activeTab === 'login' && (
          <>
            <ThemedText style={styles.fontEmail}>Email</ThemedText>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />

            <ThemedText style={styles.fontPassword}>Password</ThemedText>
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />

            <Link href="/" style={styles.link}>
              <ThemedText style={styles.forgetText}>Forget Password?</ThemedText>
            </Link>

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <ThemedText style={styles.buttonText}>Login</ThemedText>
            </TouchableOpacity>
          </>
        )}
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: 'white'
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
    backgroundColor: 'white'
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  cardContainer: {
    backgroundColor: '#F1F1F1', // Background color of the form
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
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    marginBottom: 15,
  },
  forgetText: {
    color: '#606060',
    marginTop: 10,
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
  link: {
    marginTop: 10,
    marginBottom: 20,
  },
  fontEmail: {
    fontSize: 20,
    marginLeft: 8,
    marginBottom: 5,
    alignSelf: 'flex-start',
    color: 'black',
  },
  fontPassword: {
    fontSize: 20,
    marginLeft: 8,
    marginBottom: 5,
    alignSelf: 'flex-start',
    color: 'black',
  },
});
