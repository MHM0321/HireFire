import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';

interface EarningsData {
  totalEarnings: string;
  monthlyEarnings: string;
  pendingPayments: string;
}

const earnings: EarningsData = {
  totalEarnings: '$5,000',
  monthlyEarnings: '$1,200',
  pendingPayments: '$300',
};

export default function ConsultantEarningsPg() {
  return (
    <ThemedView style={styles.container}>
      <Text style={styles.header}>Earnings Summary</Text>
      <View style={styles.earningCard}>
        <Text style={styles.earningLabel}>Total Earnings</Text>
        <Text style={styles.earningValue}>{earnings.totalEarnings}</Text>
      </View>
      <View style={styles.earningCard}>
        <Text style={styles.earningLabel}>Monthly Earnings</Text>
        <Text style={styles.earningValue}>{earnings.monthlyEarnings}</Text>
      </View>
      <View style={styles.earningCard}>
        <Text style={styles.earningLabel}>Pending Payments</Text>
        <Text style={styles.earningValue}>{earnings.pendingPayments}</Text>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  earningCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  earningLabel: { fontSize: 16, color: '#666' },
  earningValue: { fontSize: 18, fontWeight: '600', color: '#333' },
});
