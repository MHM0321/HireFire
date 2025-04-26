import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { ThemedView } from '@/components/ThemedView';
import { useRouter } from 'expo-router';

export default function MyClientsScreen() {
  const router = useRouter();
  const [clients, setClients] = useState([
    { id: '1', name: 'Emily Johnson' },
    { id: '2', name: 'Daniel Smith' },
    { id: '3', name: 'Sophia Williams' },
  ]);

  const handleBackPress = () => {
    router.back();
  };

  const handleMessagePress = (clientName: string) => {
    router.push({
      pathname: '/chatPg',
      params: { clientName },
    });
  };

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={handleBackPress}>
          <Feather name="arrow-left" size={24} color="#FFFFFF" />
        </TouchableOpacity>

        <View style={styles.logoContainer}>
          <Image
            source={require('@/assets/images/logoText.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
      </View>

      {/* Main Content */}
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>My Clients</Text>

        {clients.map((client) => (
          <View key={client.id} style={styles.clientCard}>
            <Text style={styles.clientName}>{client.name}</Text>
            <TouchableOpacity onPress={() => handleMessagePress(client.name)}>
              <Feather name="message-square" size={24} color="#F44336" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1D1D1D',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 38,
    backgroundColor: '#1A0D0E',
    justifyContent: 'space-between',
  },
  headerButton: {
    width: 40,
    alignItems: 'center',
  },
  logoContainer: {
    flex: 1,
    alignItems: 'flex-end',
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
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 20,
    textAlign: 'center',
  },
  clientCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  clientName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
});