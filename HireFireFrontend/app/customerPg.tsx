import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, SafeAreaView, ScrollView, Text } from 'react-native';
import { Link } from 'expo-router';
import { Feather, MaterialCommunityIcons, FontAwesome6 } from '@expo/vector-icons';
import { Image } from 'react-native';
import { DateTimePicker } from '@/components/DateTimePicker';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const categories = [
  { icon: 'zap', label: 'Electrician', lib: 'Feather' },
  { icon: 'tool', label: 'Mechanic', lib: 'Feather' },
  { icon: 'faucet-drip', label: 'Plumber', lib: 'FA' },
  { icon: 'table-furniture', label: 'Carpenter', lib: 'Material' },
  { icon: 'format-paint', label: 'Painter', lib: 'Material' },
  { icon: 'account-hard-hat', label: 'Labourer', lib: 'Material' },
  { icon: 'broom', label: 'Janitor', lib: 'FA' },
  { icon: 'leaf', label: 'Gardener', lib: 'Material' },
  { icon: 'utensils', label: 'Cook', lib: 'FA' },
  { icon: 'wall', label: 'Mason', lib: 'Material' },
  { icon: 'human-baby-changing-table', label: 'Baby Sitter', lib: 'Material' },
  { icon: 'radiator', label: 'Gas Fitter', lib: 'Material' },
];

export default function CustomerPgScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Worker Link */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.leftContainer}>
          <Feather name="menu" size={24} color="#FFFFFF" />
        </TouchableOpacity>

        <View style={styles.centerContainer}>
          <Image
            source={require('@/assets/images/logoText.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>

// worker is linked here.
        <View style={styles.rightContainer}>
          <Link href="/workerPg" style={styles.workerLink}>
            <Feather name="user-check" size={18} color="#FF4D4D" />
            <Text style={styles.workerLinkText}>Worker</Text>
          </Link>
          <TouchableOpacity style={styles.profileButton}>
            <Feather name="user" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Feather name="search" size={20} color="#666666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Set Location"
            placeholderTextColor="#666666"
          />
        </View>
      </View>

      <ScrollView style={styles.contentContainer}>
        {/* DateTime Picker */}
        <ThemedText style={styles.DTLabel}>Select Date and Time</ThemedText>
        <DateTimePicker 
          initialDate={selectedDate}
          onDateChange={date => setSelectedDate(date)}
        />

        {/* Categories Grid */}
        <View style={styles.categoriesContainer}>
          <ThemedText style={styles.sectionTitle}>Select Category</ThemedText>
          <View style={styles.gridContainer}>
            {categories.map((item, index) => (
              <TouchableOpacity key={index} style={styles.categoryCard}>
                {item.lib === 'Feather' && (
                  <Feather name={item.icon as any} size={24} color="#FF4D4D" />
                )}
                {item.lib === 'Material' && (
                  <MaterialCommunityIcons name={item.icon as any} size={24} color="#FF4D4D" />
                )}
                {item.lib === 'FA' && (
                  <FontAwesome6 name={item.icon as any} size={24} color="#FF4D4D" />
                )}
                <ThemedText style={styles.categoryLabel}>{item.label}</ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        </View>
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
  },
  leftContainer: {
    width: 40,
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  workerLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: '#1A0D0E',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FF4D4D',
  },
  workerLinkText: {
    color: '#FF4D4D',
    fontSize: 14,
    fontWeight: '600',
  },
  profileButton: {
    padding: 4,
  },
  logoImage: {
    width: 120,
    height: 60,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingBottom: 18,
    backgroundColor: '#1A0D0E',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F0F0',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 3,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#F5F0F0',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  categoriesContainer: {
    paddingTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 12,
    textAlign: 'center',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '45%',
    aspectRatio: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  categoryLabel: {
    marginTop: 8,
    color: '#333333',
    fontWeight: '500',
    fontSize: 16,
    textAlign: 'center',
  },
  DTLabel: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 12,
    textAlign: 'center',
  },
});