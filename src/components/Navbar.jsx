import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Navbar = () => {
  return (
    <View style={styles.root}>
      <Text style={styles.text}>Shax</Text>
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
});
