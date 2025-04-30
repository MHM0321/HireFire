import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image, ScrollView, Animated } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function ConsultantScreen() {
  const [specialization, setSpecialization] = useState('');
  const [availabilityFrom, setAvailabilityFrom] = useState(new Date());
  const [availabilityTo, setAvailabilityTo] = useState(new Date());
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

        {/* Specialization Input */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Feather name="briefcase" size={20} color="#666666" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Enter Specialization"
              placeholderTextColor="#666666"
              value={specialization}
              onChangeText={setSpecialization}
            />
          </View>
        </View>

        {/* Availability Time Range */}
        <View style={styles.dateTimeSection}>
          <Text style={styles.sectionHeader}>Set Availability Time</Text>

          <Text style={styles.timeLabel}>From:</Text>
          <DateTimePicker
            value={availabilityFrom}
            mode="time"
            display="default"
            onChange={(event, selectedDate) => selectedDate && setAvailabilityFrom(selectedDate)}
          />

          <Text style={styles.timeLabel}>To:</Text>
          <DateTimePicker
            value={availabilityTo}
            mode="time"
            display="default"
            onChange={(event, selectedDate) => selectedDate && setAvailabilityTo(selectedDate)}
          />
        </View>

        {/* Features */}
        <View style={styles.featuresGrid}>
          <FeatureCard
            iconName="calendar"
            title="Appointments"
            subtitle="View client bookings"
            onPress={() => router.push('/consultantAppointmentsPg')}
          />

          <FeatureCard
            iconName="message-circle"
            title="Consult Messages"
            subtitle="Chat with clients"
            onPress={() => router.push('/consultantChatPg')}
          />

          <FeatureCard
            iconName="star"
            title="Reviews"
            subtitle="See client feedback"
            onPress={() => router.push('/consultantReviewsPg')}
          />

          <FeatureCard
            iconName="bar-chart"
            title="Performance"
            subtitle="View your stats"
            onPress={() => router.push('/consultantPerformancePg')}
          />

          <FeatureCard
            iconName="dollar-sign"
            title="Earnings"
            subtitle="Track your income"
            onPress={() => router.push('/consultantEarningsPg')}
          />
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const FeatureCard = ({ iconName, title, subtitle, onPress }) => {
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
    shadowOpacity: glowAnim.interpolate({ inputRange: [0, 1], outputRange: [0.3, 0.8] }),
    shadowRadius: glowAnim.interpolate({ inputRange: [0, 1], outputRange: [5, 15] }),
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
  dateTimeSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 12,
    textAlign: 'center',
  },
  timeLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
    textAlign: 'center',
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
});