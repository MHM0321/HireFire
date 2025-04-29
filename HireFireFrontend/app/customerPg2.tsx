// customerPg.tsx
import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { Image } from 'react-native';
import { DateTimePicker } from '@/components/DateTimePicker';


import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
  

export default function CustomerPg2Screen() {
    
    
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* Left: Hamburger */}
        <TouchableOpacity style={styles.leftContainer} onPress={() => console.log('Open drawer or menu')}>
          <Feather name="menu" size={24} color="#FFFFFF" />
        </TouchableOpacity>
  
        {/* Center: Logo */}
        <View style={styles.centerContainer}>
          <Image
            source={require('@/assets/images/logoText.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>
  
        {/* Right: Profile */}
        <TouchableOpacity style={styles.rightContainer} onPress={() => console.log('Go to profile')}>
          <Feather name="user" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      
  
      <ScrollView style={styles.contentContainer}>

      </ScrollView>

    </SafeAreaView>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1D1D1D',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 38,
    backgroundColor: '#1A0D0E',
    position: 'relative',
  },
  
  leftContainer: {
    width: 70,
    paddingTop: 20,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  
  centerContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    paddingTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  rightContainer: {
    width: 70,
    paddingTop: 20,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  logoImage: {
    width: 120,
    height: 60,
  },
  contentHeader: {
    backgroundColor: '#F5F0F0',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  contentHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#F5F0F0',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 80, // Add padding at bottom for the next button
  },
});