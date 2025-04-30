import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { ThemedView } from '@/components/ThemedView';

interface Appointment {
  id: string;
  client: string;
  time: string;
}

const appointments: Appointment[] = [
  { id: '1', client: 'John Doe', time: '10:00 AM' },
  { id: '2', client: 'Jane Smith', time: '11:30 AM' },
];

export default function ConsultantAppointmentsPg() {
  return (
    <ThemedView style={styles.container}>
      <Text style={styles.header}>Upcoming Appointments</Text>
      <FlatList
        data={appointments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.appointmentCard}>
            <Text style={styles.clientName}>{item.client}</Text>
            <Text style={styles.appointmentTime}>{item.time}</Text>
          </View>
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  appointmentCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  clientName: { fontSize: 16, fontWeight: '600' },
  appointmentTime: { fontSize: 14, color: '#666' },
});
