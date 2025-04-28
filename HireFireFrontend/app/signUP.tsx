import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router'; // Import useRouter for navigation

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter(); // Initialize router for navigation

  const handleSignup = async () => {
    // Reset messages
    setErrorMessage('');
    setSuccessMessage('');
    
    // Validate inputs
    if (!name || !email || !password || !confirmPassword) {
      setErrorMessage('Please fill all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }
    
    const apiUrl = 'http://localhost:8080/api/auth/signup';
    const userData = {
      name: name,
      email: email.toLowerCase(),
      password: password,
    };
    
    try {
      const response = await axios.post(apiUrl, userData);
      setSuccessMessage(response.data.message || 'Account created successfully!');
      
      // Show alert in addition to the in-component message
      Alert.alert(
        'Success', 
        response.data.message || 'Account created successfully!',
        [
          { 
            text: 'Login Now', 
            onPress: () => router.push('/login') // Navigate to login page
          },
          { 
            text: 'OK' 
          }
        ]
      );
      
      // Clear form after successful signup
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        // Handle specific error codes
        if (error.response.status === 409) {
          // Email already exists
          setErrorMessage('This email is already registered');
          
          // Show alert with option to go to login
          Alert.alert(
            'Email Already Exists', 
            'This email is already registered. Would you like to login instead?',
            [
              { text: 'Cancel' },
              { 
                text: 'Go to Login', 
                onPress: () => router.push('/login') // Navigate to login page
              }
            ]
          );
        } else {
          setErrorMessage(error.response.data.message || 'Registration failed');
          Alert.alert('Error', error.response.data.message || 'Registration failed');
        }
      } else if (error instanceof Error) {
        setErrorMessage('An unexpected error occurred: ' + error.message);
        Alert.alert('Error', 'An unexpected error occurred: ' + error.message);
      } else {
        setErrorMessage('Failed to connect to the server');
        Alert.alert('Error', 'Failed to connect to the server');
      }
    }
  };

  // Handler to navigate to login page
  const goToLogin = () => {
    router.push('/login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      
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
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      
      {/* Login redirect section */}
      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Already have an account? </Text>
        <TouchableOpacity onPress={goToLogin}>
          <Text style={styles.loginLink}>Login</Text>
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
    color: '#d9534f',  // Red color for errors
    textAlign: 'center',
    fontWeight: '500',
  },
  successText: {
    color: '#5cb85c',  // Green color for success
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
  loginContainer: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {
    fontSize: 16,
    color: '#333',
  },
  loginLink: {
    fontSize: 16,
    color: '#007BFF',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

export default Signup;