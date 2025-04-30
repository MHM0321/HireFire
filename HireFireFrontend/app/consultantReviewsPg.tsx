import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';

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
    <ThemedView style={styles.container}>
      <Text style={styles.header}>Client Reviews</Text>
      <FlatList
        data={reviews}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.reviewCard}>
            <Text style={styles.clientName}>{item.client}</Text>
            <Text style={styles.rating}>Rating: {item.rating} / 5</Text>
            <Text style={styles.comment}>{item.comment}</Text>
          </View>
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  reviewCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  clientName: { fontSize: 16, fontWeight: '600' },
  rating: { fontSize: 14, color: '#666', marginVertical: 4 },
  comment: { fontSize: 14, color: '#333' },
});
