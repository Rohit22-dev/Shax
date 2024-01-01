import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Alert,
  ToastAndroid,
} from "react-native";
import React, { useRef, useState } from "react";
import OTPTextInput from "react-native-otp-textinput";
import { ResetNavigation } from "../components/NavigationUtils";
import CustomInput from "../components/CustomInput";
import { useForm } from "react-hook-form";
import CustomButton from "../components/CustomButton";
import { SafeAreaView } from "react-native-safe-area-context";

const ForgetPsw = ({ navigation }) => {
  let otpInput = useRef(null);
  const [otpScreen, setOtpScreen] = useState(false);
  const [load, setLoad] = useState(false);

  const [id, setId] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },reset
  } = useForm();

  const clearText = () => {
    otpInput.current.clear();
  };

  const handleVerifyOtp = async (data) => {
    console.log(data,id);
    try {
      const res = await fetch(
        `https://shax.onrender.com/auth/verify-otp/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const token = await res.json();
      console.log(token)
      // if (res.ok) {
      //   console.log(token.access_token);
      //   ResetNavigation(navigation, "ResetPsw", { token: token.access_token });
      //   Alert.alert("Notice", "Otp has been send successfully to your email.");
      // } else {
      //   console.error("Error in login:", token.detail);
      // }
      ResetNavigation(navigation, "ResetPsw", { token: token.access_token });
    } catch (error) {
      Alert.alert(error.message);
      console.log(error);
    }
  };

  const handleSendOtp = async (data) => {
    try {
      setLoad(true);
      console.log(data);

      const res = await fetch(
        "https://shax.onrender.com/auth/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      // print(res)
      const token = await res.json();
      print(token);
      if (res.ok) {
        console.log(token.message);
        setId(token.user_id);
        Alert.alert("Notice", "Otp has been send successfully to your email.");
      } else {
        console.error("Error in login:", token.detail);
      }

      setOtpScreen(true);
      reset();
      setLoad(false);
    } catch (error) {
      Alert.alert(error.message);
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      {!otpScreen && (
        <Text style={{ fontSize: 28, fontWeight: 500, color: "black" }}>
          Hello there
        </Text>
      )}
      {!otpScreen ? (
        <View style={styles.container}>
          <CustomInput
            name="email"
            placeholder="Email"
            control={control}
            rules={{ required: "Email is required" }}
          />
          <CustomButton
            title={!load && "Send otp"}
            loading={load ? true : false}
            onPress={handleSubmit(handleSendOtp)}
            tintColor="white"
          />
        </View>
      ) : (
        <View style={styles.container}>
          <CustomInput
            name="otp"
            placeholder="OTP"
            control={control}

            rules={{ required: "OTP is required" }}
          />
          <CustomButton
            title={!load && "Verify otp"}
            loading={load ? true : false}
            onPress={handleSubmit(handleVerifyOtp)}
            tintColor="white"
          />
        </View>
      )}
      <CustomButton
        title="Have an account? Sign in"
        onPress={load ? undefined : () => ResetNavigation(navigation, "Login")}
        tintColor="white"
      />
    </SafeAreaView>
  );
};

export default ForgetPsw;

const styles = StyleSheet.create({
  root: {
    padding: 40,
    flex: 1,
    gap: 20,
    width: "100%",
    alignItems: "center",
    position: "relative",
  },
  otp: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    gap: 20,
  },
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    gap: 20,
  },
});
