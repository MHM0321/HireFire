import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

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
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Performance Metrics</Text>
      </View>

      <View style={styles.metricsContainer}>
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
      </View>
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
  metricsContainer: {
    padding: 16,
  },
  metricCard: {
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
  metricLabel: {
    fontSize: 16,
    color: '#1A0D0E',
    marginBottom: 6,
  },
  metricValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },
});
