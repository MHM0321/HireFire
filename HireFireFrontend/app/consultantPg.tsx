import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image, ScrollView, Animated } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { DateTimePicker } from '@/components/DateTimePicker';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function ConsultantScreen() {
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton}>
          <Feather name="menu" size={24} color="#FFFFFF" />
        </TouchableOpacity>

        <View style={styles.logoContainer}>
          <Image
            source={require('@/assets/images/logoText.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <TouchableOpacity style={styles.headerButton}>
          <Feather name="user" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>Welcome, Consultant</Text>
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
            title="Queries"
            subtitle="Manage current queries"
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
  );
}

// Reusable Feature Card Component
const FeatureCard = ({ iconName, title, subtitle, onPress }: { iconName: any, title: string, subtitle: string, onPress: () => void }) => {
  const glowAnim = useState(new Animated.Value(0))[0];

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
    elevation: 10, // for Android glow
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
});