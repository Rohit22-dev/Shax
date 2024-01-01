import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import { ResetNavigation } from "../components/NavigationUtils";
import { useForm } from "react-hook-form";

const ResetPsw = ({ navigation, route }) => {
    const { height } = useWindowDimensions();
  const token = route.params.token;
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const password = useRef({});
  password.current = watch("password", "");
  const [load, setLoad] = useState(false);

  const handleResetPsw = async (data) => {
    try {
      setLoad(true);
      const res = await fetch("https://shax.onrender.com/auth/reset-password", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ password: data.password }),
      });
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        ResetNavigation(navigation, "Login");
      } else {
        const errorData = await res.json();
        console.error("Error in login:", errorData.detail);
        // Show an error message to the user
      }
      setLoad(false);
    } catch (error) {
      Alert.alert(error.message);
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={[styles.root, { height: height }]}>
      <Text style={{ fontSize: 28, fontWeight: 500, color: "black" }}>
        Reset Password
      </Text>
      <CustomInput
        name="password"
        placeholder="Password"
        control={control}
        rules={{
          required: "Password is required",
          minLength: {
            value: "4",
            message: "Password should be minimum 4 characters long",
          },
        }}
        secureTextEntry
        hideButton
      />
      <CustomInput
        name="rPassword"
        placeholder="Repeat Password"
        control={control}
        rules={{
          required: "Reset Password is required",
          minLength: {
            value: "4",
            message: "Password should be minimum 4 characters long",
          },
          valiadate: (value) =>
            value === password.current || "The passwords do not match",
        }}
        secureTextEntry
        hideButton
      />
      <CustomButton
        title={!load && "Reset Password"}
        loading={load ? true : false}
        disabled={load}
        onPress={handleSubmit(handleResetPsw)}
        tintColor="white"
      />

      <CustomButton
        title="Don't have an account? Create one"
        onPress={load ? undefined : () => ResetNavigation(navigation, "Login")}
        tintColor="white"
      />
    </SafeAreaView>
  );
};

export default ResetPsw;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    paddingTop: "20%",
    padding: 20,
  },
});
