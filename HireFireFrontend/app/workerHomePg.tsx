import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image, ScrollView, Animated } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import React = require('react');

export default function WorkerScreen() {
  const [location, setLocation] = useState('');
  const router = useRouter();

  const mockRequests = [
    { title: 'Fix Kitchen Sink', details: 'April 30, 3:00 PM - 5:00 PM, Location: XYZ Street' },
    { title: 'Install Light Fixtures', details: 'May 1, 10:00 AM - 12:00 PM, Location: ABC Avenue' },
  ];

  return (
    <View style={{ flex: 1 }}>
      <ThemedView style={styles.container}>
       
        {/* Main Content */}
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.welcomeSection}>
            <Text style={styles.welcomeText}>Welcome, Worker</Text>
          </View>

          {/* Search */}
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
            <TouchableOpacity
              style={styles.setAvailabilityButton}
              onPress={() => router.push('/setAvailabilityPg')}
            >
              <Text style={styles.setAvailabilityText}>Set Availability</Text>
            </TouchableOpacity>
          </View>

          {/* Work Requests Section */}
          <View style={styles.requestsSection}>
            <Text style={styles.sectionHeader}>Work Requests</Text>
            {mockRequests.map((req, index) => (
              <View key={index} style={styles.requestCard}>
                <Text style={styles.requestTitle}>{req.title}</Text>
                <Text style={styles.requestDetail}>{req.details}</Text>
                <View style={styles.buttonRow}>
                  <TouchableOpacity style={styles.acceptButton}>
                    <Text style={styles.buttonText}>Accept</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.declineButton}>
                    <Text style={styles.buttonText}>Decline</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>

          {/* Features */}
          <View style={styles.featuresGrid}>
            <FeatureCard
              iconName="calendar"
              title="Available Appointments"
              subtitle="View work requests"
              onPress={() => router.push('/appointmentsPg')}
            />
            <FeatureCard
              iconName="briefcase"
              title="My Clients"
              subtitle="Manage current clients"
              onPress={() => router.push('/myClientsPg')}
            />
            <FeatureCard
              iconName="bar-chart"
              title="My Performance"
              subtitle="View your statistics"
              onPress={() => router.push('/myPerformancePg')}
            />
            <FeatureCard
              iconName="edit-3"
              title="Rate and Review"
              subtitle="Review past clients"
              onPress={() => router.push('/rateAndReviewPg')}
            />
            <FeatureCard
              iconName="dollar-sign"
              title="Earnings"
              subtitle="Withdraw your money"
              onPress={() => router.push('/earningsPg')}
            />
          </View>
        </ScrollView>

       
      </ThemedView>
    </View>
  );
}

// Reusable Feature Card Component
const FeatureCard = ({ iconName, title, subtitle, onPress }) => {
  const glowAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    Animated.loop(
      Animated.sequence([ 
        Animated.timing(glowAnim, { 
          toValue: 1, 
          duration: 1500, 
          useNativeDriver: false 
        }),
        Animated.timing(glowAnim, { 
          toValue: 0, 
          duration: 1500, 
          useNativeDriver: false 
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
  welcomeSection: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
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
  requestsSection: {
    paddingHorizontal: 16,
    marginBottom: 30,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 12,
    textAlign: 'center',
  },
  requestCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#FF0000',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginBottom: 12,
  },
  requestTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  requestDetail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  acceptButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 8,
    flex: 0.48,
    alignItems: 'center',
  },
  declineButton: {
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 8,
    flex: 0.48,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
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
  bottomTab: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
});
