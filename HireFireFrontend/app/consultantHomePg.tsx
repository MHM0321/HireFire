import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, TextInput, Animated } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React = require('react');

export default function ConsultantScreen() {
  const [location, setLocation] = useState('');
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
      
      {/* Main Content */}
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>Welcome, Consultant</Text>
        </View>

        {/* Search Location */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Feather name="search" size={20} color="#666666" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Set Location"
              placeholderTextColor="#666666"
              value={location}
              onChangeText={setLocation}
            />
          </View>
        </View>

        {/* Set Availability Button */}
        <View style={styles.setAvailabilityContainer}>
          <TouchableOpacity style={styles.setAvailabilityButton} onPress={() => router.push('/setAvailabilityPg')}>
            <Text style={styles.setAvailabilityText}>Set Availability</Text>
          </TouchableOpacity>
        </View>

        {/* Features Section */}
        <View style={styles.featuresGrid}>
          <FeatureCard 
            iconName="calendar"
            title="Appointments"
            subtitle="Manage your sessions"
            onPress={() => router.push('/appointmentsPg')}
          />
          <FeatureCard 
            iconName="users"
            title="My Clients"
            subtitle="View and manage clients"
            onPress={() => router.push('/myClientsPg')}
          />
          <FeatureCard 
            iconName="bar-chart"
            title="Analytics"
            subtitle="Check your performance"
            onPress={() => router.push('/myPerformancePg')}
          />
          <FeatureCard 
            iconName="edit-2"
            title="Rate & Review"
            subtitle="Give client feedback"
            onPress={() => router.push('/rateAndReviewPg')}
          />
          <FeatureCard 
            iconName="dollar-sign"
            title="Earnings"
            subtitle="Track your income"
            onPress={() => router.push('/earningsPg')}
          />
        </View>
      </ScrollView>

      
      
    </ThemedView>
  );
}

// Reusable FeatureCard
const FeatureCard = ({ iconName, title, subtitle, onPress }: { iconName: any, title: string, subtitle: string, onPress: () => void }) => {
  const [glowAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: false,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, [glowAnim]);
  
  const animatedStyle = {
    shadowOpacity: glowAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0.3, 0.8],
    }),
    shadowRadius: glowAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [5, 15],
    }),
  };

  return (
    <Animated.View style={[styles.featureCard, animatedStyle]}>
      <TouchableOpacity onPress={onPress}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
          <Feather name={iconName} size={20} color="#FF0000" style={{ marginRight: 8 }} />
          <Text style={styles.featureTitle}>{title}</Text>
        </View>
        <Text style={styles.featureSubtitle}>{subtitle}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1D1D1D',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 38,
    backgroundColor: '#1A0D0E',
  },
  headerButton: {
    width: 40,
    alignItems: 'center',
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 60,
  },
  content: {
    flexGrow: 1,
    backgroundColor: '#F5F0F0',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  welcomeSection: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  searchContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
  },
  setAvailabilityContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  setAvailabilityButton: {
    backgroundColor: '#FF0000',
    borderRadius: 50,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  setAvailabilityText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  featuresGrid: {
    paddingHorizontal: 16,
    gap: 16,
  },
  featureCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    borderWidth: 2,
    borderColor: '#FF0000',
    shadowColor: '#FF0000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
    marginBottom: 10,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
  featureSubtitle: {
    fontSize: 14,
    color: '#666666',
  },

  // Bottom Tab
  bottomTab: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
});
