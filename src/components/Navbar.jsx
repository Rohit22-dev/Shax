import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { CommonActions, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {ResetNavigation} from "../components/NavigationUtils";

const Navbar = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.root}>
      <Text style={styles.text}>Shax</Text>
      <View style={styles.logout}>
        <Button
          title="Logout"
          onPress={async () => {
            await AsyncStorage.removeItem("shaxJwtToken");
            ResetNavigation(navigation, "Login")
          }}
        />
      </View>
    </View>
  );
};

export default Navbar;

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#016A70",
    justifyContent: "center",
    alignItems: "center",
    // borderBottomWidth: 1,
    // borderBottomColor: "#333",
  },
  text: {
    marginVertical: 10,
    color: "#333",
    fontSize: 30,
    fontWeight: "bold",
  },
  logout: {
    position: "absolute",
    right: 10,
    top: 10,
  },
});
