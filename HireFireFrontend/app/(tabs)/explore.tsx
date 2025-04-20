// app/(tabs)/explore.tsx
import React from 'react';
import { StyleSheet, Image, Platform, TouchableOpacity, ScrollView, View } from 'react-native';
import { useRouter } from 'expo-router';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

const categories = [
  "Firefighters", "Emergency Medical", "Fire Chiefs", 
  "Fire Engineers", "Fire Inspectors", "Fire Instructors",
  "Paramedics", "EMTs", "Dispatchers"
];

export default function ExploreScreen() {
  const router = useRouter();
  
  const navigateToCustomerPage = () => {
    router.push('./customerPg2');
  };
  
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Explore</ThemedText>
      </ThemedView>
      
      <ThemedText style={styles.sectionTitle}>Search by category</ThemedText>
      
      <View style={styles.categoriesContainer}>
        {categories.map((category, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.categoryButton}
            onPress={navigateToCustomerPage}
          >
            <ThemedText style={styles.categoryText}>{category}</ThemedText>
          </TouchableOpacity>
        ))}
      </View>
      
      <ThemedText style={styles.sectionTitle}>App Information</ThemedText>
      
      <Collapsible title="File-based routing">
        <ThemedText>
          This app has two screens:{' '}
          <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> and{' '}
          <ThemedText type="defaultSemiBold">app/(tabs)/explore.tsx</ThemedText>
        </ThemedText>
        <ThemedText>
          The layout file in <ThemedText type="defaultSemiBold">app/(tabs)/_layout.tsx</ThemedText>{' '}
          sets up the tab navigator.
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/router/introduction">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      
      {/* Keep your existing Collapsible sections if needed */}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 12,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  categoryButton: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: '500',
  },
});