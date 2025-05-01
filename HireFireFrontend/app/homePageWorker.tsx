// customerPg.tsx
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router/build/exports";

import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { Image } from "react-native";
import { DateTimePicker } from "@/components/DateTimePicker";
import { LocationSearch } from '@/components/LocationSearch';
import { LocationMapModal } from '@/components/LocationMapModal';

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";

export default function CustomerPgScreen() {
 
  return (
    <SafeAreaView style={styles.container}>

    <ScrollView>   


      </ScrollView>


    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1D1D1D",
  },

  contentContainer: {
    flex: 1,
    backgroundColor: "#F5F0F0",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 80, // Add padding at bottom for the next button
  },
  categoriesContainer: {
    backgroundColor: "#F5F0F0",
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  sectionTitle: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 12,
    textAlign: "center",
  },
});
