import { StyleSheet, Text, View, Button } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import TabNavigator from "../components/TabNav";
import Navbar from "../components/Navbar";

const HomeScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", (e) => {
      e.preventDefault();
    });

    return () => unsubscribe();
  }, [navigation]);

  return (
    <SafeAreaView style={styles.root}>
      <Navbar />
      <TabNavigator />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#016A70",
  },
});
