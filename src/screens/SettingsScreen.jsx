import { decode as atob, encode as btoa } from "base-64";
if (!global.btoa) {
  global.btoa = btoa;
}
if (!global.atob) {
  global.atob = atob;
}

import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

const SettingsScreen = () => {
  const [decodedData, setDecodedData] = useState(null);

  useEffect(() => {
    const decodeToken = async () => {
      try {
        const token = await AsyncStorage.getItem("shaxJwtToken");
        if (token) {
          const data = jwtDecode(token);
          setDecodedData(data);
          console.log(data);
        } else {
          console.log("Token not found");
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    };

    decodeToken();
  }, []);

  return (
    <View>
      <Text>Profile</Text>
      {decodedData && (
        <View>
          <Text>Username: {decodedData.username}</Text>
          <Text>Email: {decodedData.email}</Text>
        </View>
      )}
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({});
