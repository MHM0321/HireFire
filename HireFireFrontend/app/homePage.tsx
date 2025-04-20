import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomePage() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome!</Text>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/customerPg2')}>
        <Text style={styles.buttonText}>Go to customerPg2</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.redButtonContainer} onPress={() => router.push('/redButton')}>
        <Text style={styles.buttonText}>Go to redButton</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A0D0E',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    color: '#FFFFFF',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#FF4D4D',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  redButtonContainer: {
    backgroundColor: '#FF4D4D',
    paddingHorizontal: 14,
    paddingVertical: 14,
    paddingTop: 10,
    borderRadius: 10,
  },
});
