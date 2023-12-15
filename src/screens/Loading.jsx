import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";

const Loading = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("Home");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <LottieView source={require("../../assets/welcome.json")} autoPlay loop />
    </View>
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
