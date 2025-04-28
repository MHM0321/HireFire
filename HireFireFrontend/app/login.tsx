import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    // Reset messages
    setErrorMessage('');
    setSuccessMessage('');
  
    // Validate inputs
    if (!username || !password) {
      setErrorMessage('Please fill all fields');
      return;
    }
  
    const apiUrl = 'http://localhost:8080/api/auth/login';
    const userData = {
      name: username.trim(), // Use "name" instead of "username"
      password: password,
    };
  
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        setErrorMessage(data.message || 'Login failed');
        Alert.alert('Error', data.message || 'Login failed');
        return;
      }
  
      setSuccessMessage('Logged in successfully!');
      Alert.alert('Success', 'Logged in successfully!', [
        {
          text: 'OK',
          onPress: () => router.replace('/customerPg'), // Navigate to customer page
        },
      ]);
  
      // Clear form after successful login
      setUsername('');
      setPassword('');
    } catch (error) {
      setErrorMessage('An unexpected error occurred');
      Alert.alert('Error', 'An unexpected error occurred');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      {/* Display error message if there is one */}
      {errorMessage ? (
        <View style={styles.messageContainer}>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      ) : null}

      {/* Display success message if there is one */}
      {successMessage ? (
        <View style={styles.messageContainer}>
          <Text style={styles.successText}>{successMessage}</Text>
        </View>
      ) : null}

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Signup redirect section */}
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => router.push('/signUP')}>
          <Text style={styles.signupLink}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  messageContainer: {
    width: '100%',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  errorText: {
    color: '#d9534f', // Red color for errors
    textAlign: 'center',
    fontWeight: '500',
  },
  successText: {
    color: '#5cb85c', // Green color for success
    textAlign: 'center',
    fontWeight: '500',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupContainer: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signupText: {
    fontSize: 16,
    color: '#333',
  },
  signupLink: {
    fontSize: 16,
    color: '#007BFF',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

export default Login;
