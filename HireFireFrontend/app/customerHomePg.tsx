import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import { Feather, FontAwesome } from '@expo/vector-icons';

export default function CustomerPgScreen() {
  // Define a map for image assets
  const imageMap = {
    consultant: require('@/assets/images/consultant.png'),
    electrician: require('@/assets/images/electrician.png'),
    carpenter: require('@/assets/images/carpenter.png'),
    gurt: require('@/assets/images/gurt.png'),
    farmer: require('@/assets/images/farmer.png'),
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          
          {/* Search Bar */}
          <View style={styles.searchWrapper}>
            <View style={styles.searchBar}>
              <Feather name="search" size={18} color="#666" />
              <TextInput
                placeholder="search text"
                placeholderTextColor="#666"
                style={styles.searchInput}
              />
            </View>
          </View>

          {/* Welcome Text */}
          <Text style={styles.welcomeText}>Welcome, Eishal.</Text>

          {/* Upcoming Appointments */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardHeaderText}>Upcoming appointments</Text>
            </View>
            <View style={styles.cardBody}>
              <Text style={styles.placeholderText}>No appointments</Text>
            </View>
          </View>

          {/* Hire Cards */}
          <TouchableOpacity style={styles.hireCard}>
            <View style={styles.hireContent}>
              <View style={styles.iconPlaceholder}>
                <Image
                  source={imageMap.consultant} // Use the image map
                  style={styles.iconImage}
                />
              </View>
              <Text style={styles.hireText}>Hire a consultant</Text>
            </View>
            <Feather name="arrow-right" size={20} color="#B30000" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.hireCard}>
            <View style={styles.hireContent}>
              <View style={styles.iconPlaceholder}>
                <Image
                  source={imageMap.electrician} // Use the image map
                  style={styles.iconImage}
                />
              </View>
              <Text style={styles.hireText}>Hire a worker</Text>
            </View>
            <Feather name="arrow-right" size={20} color="#B30000" />
          </TouchableOpacity>

        

          {/* Subscriptions Section */}
          <View style={styles.sectionCard}>
            <View style={styles.subscriptionHeader}>
              <FontAwesome name="check-circle" size={18} color="white" />
              <Text style={styles.subscriptionText}>Subscriptions</Text>
            </View>
            <Text style={styles.subscriptionDesc}>
              Unlock premium features and{'\n'}get the most out of HireFire
            </Text>
            <View style={styles.benefitsBox}>
              {[
                'Priority access to top-rated service providers',
                'Exclusive discounts on bookings',
                'Free consultation minutes each month',
                'Faster customer support response time',
                'Track your service history in detail',
              ].map((item, idx) => (
                <Text key={idx} style={styles.benefitItem}>✅ {item}</Text>
              ))}
            </View>
            <TouchableOpacity style={styles.viewPlansBtn}>
              <Text style={styles.viewPlansText}>view plans</Text>
              <Feather name="arrow-right" size={16} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={{ height: 80 }} />
        </ScrollView>

        
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#EFE6E6' },
  scrollContainer: { paddingBottom: 40, backgroundColor: '#EFE6E6' },
  header: {
    backgroundColor: '#2A1516',
    paddingHorizontal: 16,
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoText: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
  searchWrapper: { backgroundColor: '#1A0D0E', paddingHorizontal: 16, paddingBottom: 20 },
  searchBar: {
    backgroundColor: '#F5F5F5',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: 12,
    height: 40,
  },
  searchInput: { marginLeft: 8, flex: 1, color: '#000' },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginHorizontal: 16,
    marginVertical: 20,
  },
  card: {
    marginHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 24,
    overflow: 'hidden',
  },
  cardHeader: {
    backgroundColor: '#712C2C',
    paddingVertical: 10,
    alignItems: 'center',
  },
  cardHeaderText: { color: '#fff', fontWeight: 'bold' },
  cardBody: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  placeholderText: { color: '#999' },
  hireCard: {
    marginHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  hireContent: { flexDirection: 'row', alignItems: 'center' },
  iconPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FCDADA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  iconImage: {
    width: 24,
    height: 24,
  },
  hireText: { fontSize: 16, fontWeight: '600', color: '#B30000' },

  // Popular
  sectionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 12,
    color: '#333',
  },
  popularGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  popularItem: {
    backgroundColor: '#FCECEC',
    width: '47%',
    height: 70,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  popularImage: {
    width: 40,
    height: 40,
  },
  seeAllBtn: {
    flexDirection: 'row',
    backgroundColor: '#D33A3A',
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 24,
    alignItems: 'center',
  },
  seeAllText: { color: '#fff', marginRight: 6, fontWeight: '600' },

  // Subscriptions
  subscriptionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#712C2C',
    paddingVertical: 6,
    paddingHorizontal: 14,
    alignSelf: 'flex-start',
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    marginBottom: 12,
  },
  subscriptionText: { color: '#fff', marginLeft: 8, fontWeight: '600' },
  subscriptionDesc: {
    textAlign: 'center',
    color: '#444',
    marginBottom: 16,
    fontSize: 13,
  },
  benefitsBox: {
    backgroundColor: '#1C1C1C',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  benefitItem: {
    color: '#00FF7F',
    fontSize: 12,
    marginBottom: 4,
  },
  viewPlansBtn: {
    backgroundColor: '#D33A3A',
    flexDirection: 'row',
    paddingVertical: 10,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewPlansText: { color: '#fff', marginRight: 6, fontWeight: '600' },

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
