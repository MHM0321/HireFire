import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';

interface PerformanceMetrics {
  totalAppointments: number;
  averageRating: number;
  responseTime: string;
}

const performanceData: PerformanceMetrics = {
  totalAppointments: 120,
  averageRating: 4.8,
  responseTime: '2 hours',
};

export default function ConsultantPerformancePg() {
  return (
    <ThemedView style={styles.container}>
      <Text style={styles.header}>Performance Metrics</Text>
      <View style={styles.metricCard}>
        <Text style={styles.metricLabel}>Total Appointments</Text>
        <Text style={styles.metricValue}>{performanceData.totalAppointments}</Text>
      </View>
      <View style={styles.metricCard}>
        <Text style={styles.metricLabel}>Average Rating</Text>
        <Text style={styles.metricValue}>{performanceData.averageRating}</Text>
      </View>
      <View style={styles.metricCard}>
        <Text style={styles.metricLabel}>Average Response Time</Text>
        <Text style={styles.metricValue}>{performanceData.responseTime}</Text>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  metricCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  metricLabel: { fontSize: 16, color: '#666' },
  metricValue: { fontSize: 18, fontWeight: '600', color: '#333' },
});
