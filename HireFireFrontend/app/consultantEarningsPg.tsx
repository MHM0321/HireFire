import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

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
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Earnings Summary</Text>
      </View>

      <View style={styles.earningsContainer}>
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
  earningsContainer: {
    padding: 16,
  },
  earningCard: {
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
  earningLabel: {
    fontSize: 16,
    color: '#1A0D0E',
    marginBottom: 6,
  },
  earningValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },
});
