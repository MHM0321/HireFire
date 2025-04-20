// app/(tabs)/customerPg1.tsx
import React from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';


import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

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
  

export default function CustomerPg1Screen() {
  const router = useRouter();
  
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <IconSymbol name="line.3.horizontal" size={64} color="#FFFFFF" />
        </TouchableOpacity>
        
        <View style={styles.logoContainer}>

        </View>
        
        <TouchableOpacity>
          <IconSymbol name="person.circle" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

       {/* Search Bar */}
       <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
        <Feather name="search" size={20} color="#666666" style={styles.searchIcon} />
            <TextInput
            style={styles.searchInput}
            placeholder="search text"
            placeholderTextColor="#666666"
          />
        </View>
      </View>

      
      <ScrollView style={styles.contentContainer}>        

        {/* Categories*/}
      <View style={styles.categoriesContainer}>
      <ThemedText style={styles.sectionTitle}>Categories</ThemedText>
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
    paddingVertical: 22,
    backgroundColor: '#1A0D0E',
  },
  logoContainer: {
    alignItems: 'center',
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
  },
  categoriesContainer: {
    backgroundColor: '#F5F0F0',
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 12,
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
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    backgroundColor: '#1A0D0E',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F0F0',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
  },

});