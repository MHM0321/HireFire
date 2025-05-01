import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

interface Review {
  id: string;
  client: string;
  rating: number;
  comment: string;
}

const reviews: Review[] = [
  { id: '1', client: 'John Doe', rating: 5, comment: 'Excellent advice and support.' },
  { id: '2', client: 'Jane Smith', rating: 4, comment: 'Very helpful and professional.' },
];

export default function ConsultantReviewsPg() {
  return (
    <View style={styles.container}>
      {/* Custom header with theme color */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Client Reviews</Text>
      </View>

      <FlatList
        data={reviews}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <View style={styles.reviewCard}>
            <Text style={styles.clientName}>{item.client}</Text>
            <Text style={styles.rating}>⭐ Rating: {item.rating} / 5</Text>
            <Text style={styles.comment}>{item.comment}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F0F0',
  },
  headerContainer: {
    backgroundColor: '#1A0D0E',
    paddingVertical: 30,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  listContainer: {
    padding: 16,
  },
  reviewCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    elevation: 4,
    borderWidth: 2,
    borderColor: '#FF0000',
    shadowColor: '#FF0000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  clientName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#1A0D0E',
  },
  rating: {
    fontSize: 14,
    color: '#444',
    marginBottom: 6,
  },
  comment: {
    fontSize: 14,
    color: '#333',
  },
});
