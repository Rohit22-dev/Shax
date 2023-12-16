import { Image, ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Navbar from "../components/Navbar";
import { FAB, IconButton, Text } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

const GroupExpense = ({ route, navigation }) => {
  const { groupData: data } = route.params;
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#016A70" }}>
      <Navbar />
      <ScrollView contentContainerStyle={styles.root} scrollEnabled>
        <IconButton
          icon={() => <Ionicons name="chevron-back" size={24} />}
          onPress={() => navigation.goBack()}
          style={styles.back}
        />
        <Text variant="headlineMedium">{data.name}</Text>

        <Image
          source={{ uri: "https://picsum.photos/901" }}
          style={styles.image}
        />
      </ScrollView>
      <FAB
        icon="plus"
        style={styles.fab}
        backgroundColor="#A2C579"
        mode="elevated"
        size="large"
      />
    </SafeAreaView>
  );
};

export default GroupExpense;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#FFFFDD",
    padding: 10,
    alignItems: "center",
  },
  fab: {
    position: "absolute",
    bottom: 80,
    left: "50%",
    transform: [{ translateX: -40 }],
  },
  back: { position: "absolute", left: 1 },
  image: {
    width: "100%",
    height: "10%",
    marginTop: 10,
  },
});
