import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import usersData from '@/assets/data/exampleUsers.json';
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { router } from 'expo-router';

// Function to navigate to the next page
const handleNextPress = () => {
    // Navigate to the next page with params (replace with your actual route)
    router.push({
      pathname: '/customerPg3',
    });
  };

export default function CustomerPg2Screen() {
    const renderStars = (rating: number) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
          const isFilled = i <= rating;
          stars.push(
            <FontAwesome
              key={i}
              name={isFilled ? 'star' : 'star-o'}
              size={24}
              color={isFilled ? '#FF4D4D' : 'black'}
              style={styles.starIcon}
            />
          );
        }
        return <View style={styles.starRow}>{stars}</View>;
      };

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

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ThemedText style={styles.sectionTitle}>Matches Found</ThemedText>
        {usersData.map(user => (
          <View key={user.id} style={styles.card}>
            <View style={styles.topRow}>
              <Image source={{ uri: user.image }} style={styles.avatar} />

              <View style={styles.infoSection}>
                <Text style={styles.name}>{user.name}</Text>
                <View style={styles.ratingRow}>
                  {renderStars(user.rating)}
                  <Text style={styles.reviewText}>({user.reviews})</Text>
                </View>
                <Text style={styles.fee}>{user.fee}</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.button} onPress={() => router.push({ pathname: '/customerPg3', params: { userId: user.id } })}>
              <Text style={styles.buttonText}>View Details →</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#F5F0F0',
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
    scrollContainer: {
      padding: 16,
    },
    card: {
      borderWidth: 1,
      borderColor: '#FFFFFF',
      borderRadius: 8,
      padding: 16,
      marginBottom: 16,
      backgroundColor: '#FFFFFF',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    topRow: {
      flexDirection: 'row',
      alignItems: 'center', 
    },
    avatar: {
      width: 64,
      height: 64,
      borderRadius: 32,
      borderWidth: 1,
      borderColor: '#000',
      backgroundColor: '#ccc',
    },
    infoSection: {
      flex: 1,
      marginLeft: 12,
      
    },
    name: {
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 4,
    },
    ratingRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    starRow: {
        flexDirection: 'row',
    },
    starIcon: {
        marginRight: 4,
    },
    reviewText: {
      marginLeft: 6,
      fontSize: 16,
    },
    button: {
      marginTop: 16,
      paddingVertical: 10,
      borderWidth: 1,
      borderRadius: 8,
      backgroundColor: '#FF4D4D',
      alignItems: 'center',
      borderColor: '#FF4D4D',
    },
    buttonText: {
      fontSize: 16,
      color: '#FFFFFF',
    },
    sectionTitle: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333333',
        marginBottom: 12,
        textAlign: 'center',
      },
      fee: {
        flexDirection: 'row',
        marginTop: 4,
        fontSize: 16,
        color: 'gray',
      },
  });
  