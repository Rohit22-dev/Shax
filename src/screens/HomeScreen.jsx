import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <View>
        <Text>HomeScreen</Text>
        <Button
          title="Go to Login"
          onPress={() => navigation.navigate("Login")}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
