import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function PlansPage() {
  const router = useRouter();

  const plans = [
    {
      title: "Basic Plan",
      price: "$4.99/month",
      features: [
        "Limited access to services",
        "Standard support",
        "No discounts",
      ],
    },
    {
      title: "Pro Plan",
      price: "$9.99/month",
      features: [
        "Priority access to top-rated providers",
        "Exclusive discounts",
        "Free consultations",
      ],
    },
    {
      title: "Elite Plan",
      price: "$19.99/month",
      features: [
        "All Pro features",
        "Dedicated account manager",
        "24/7 premium support",
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Feather name="arrow-left" size={20} color="#D33A3A" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        <Text style={styles.header}>Choose a Subscription Plan</Text>
        {plans.map((plan, index) => (
          <View key={index} style={styles.planCard}>
            <Text style={styles.planTitle}>{plan.title}</Text>
            <Text style={styles.planPrice}>{plan.price}</Text>
            {plan.features.map((feature, idx) => (
              <Text key={idx} style={styles.featureText}>
                ✅ {feature}
              </Text>
            ))}
            <TouchableOpacity style={styles.subscribeButton}>
              <Text style={styles.subscribeText}>Subscribe</Text>
              <Feather name="arrow-right" size={16} color="#fff" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#EFE6E6" },
  container: {
    padding: 20,
    backgroundColor: "#EFE6E6",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  planCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    elevation: 2,
  },
  planTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#B30000",
    marginBottom: 6,
  },
  planPrice: {
    fontSize: 16,
    color: "#555",
    marginBottom: 10,
  },
  featureText: {
    fontSize: 14,
    color: "#444",
    marginBottom: 4,
  },
  subscribeButton: {
    backgroundColor: "#D33A3A",
    marginTop: 12,
    padding: 10,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 180,
    alignSelf: "center",
  },
  subscribeText: {
    color: "#fff",
    marginRight: 6,
    fontWeight: "600",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 1,
    alignSelf: "center",
    marginBottom: 20,
  },
  backText: {
    color: "#D33A3A",
    marginLeft: 6,
    fontWeight: "600",
  },
});
