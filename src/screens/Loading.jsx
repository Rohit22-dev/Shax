import { Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Loading = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // const timer = setTimeout(() => {
    //   navigation.navigate("Home");
    // }, 3000);

    // return () => clearTimeout(timer);
    const checkAuthentication = async () => {
      try {
        const jwtToken = await AsyncStorage.getItem("shaxJwtToken");

        if (jwtToken) {
          navigation.navigate("Home");
        } else {
          
          navigation.navigate("Login");
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
      }
    };
    checkAuthentication();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <LottieView source={require("../../assets/welcome.json")} autoPlay loop />
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
    </SafeAreaView>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});
