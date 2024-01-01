import { StyleSheet, Text, useWindowDimensions } from "react-native";
import { useEffect, useState } from "react";
import { CommonActions } from "@react-navigation/native";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import { useForm } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ResetNavigation } from "../components/NavigationUtils";

const Signin = ({ navigation }) => {
  const { height } = useWindowDimensions();
  const [load, setLoad] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const checkAuthentication = async () => {
    try {
      const jwtToken = await AsyncStorage.getItem("shaxJwtToken");

      if (jwtToken) {
        ResetNavigation(navigation, "Home");
      }
    } catch (error) {
      console.error("Error checking authentication:", error);
    }
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  const handleSignIn = async (data) => {
    try {
      setLoad(true);
      console.log(data)
      const res = await fetch("https://shax.onrender.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      // token = await res.json();
      // print(res)
      if (res.ok) {
        // Handle successful login
        const token = await res.json();
        await AsyncStorage.setItem("shaxJwtToken", token.access_token);
        ResetNavigation(navigation, "Home");
      } else {
        // Handle unsuccessful login
        const errorData = await res.json();
        console.error("Error in login:", errorData.detail);
        // Show an error message to the user
      }

      setLoad(false);
    } catch (error) {
      setLoad(false);
      console.log("error", error);
      // console.error("Error in login:", error.message);
    }
  };

  return (
    <SafeAreaView style={[styles.root, { height: height }]}>
      <Text style={{ fontSize: 28, fontWeight: 500, color: "black" }}>
        Hello there
      </Text>
      <Text style={{ fontSize: 14, color: "#333" }}>Welcome back</Text>
      {/* <Image
          style={{
            width: 180,
            height: 180,
          }}
          source={require('../assets/panda.png')}
        /> */}
      <CustomInput
        name="email"
        placeholder="Email"
        control={control}
        rules={{ required: "Email is required" }}
      />

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
      <CustomButton
        title={!load && "Sign In"}
        loading={load ? true : false}
        onPress={handleSubmit(handleSignIn)}
        tintColor="white"
      />

      <CustomButton
        title="Forgot Password"
        color="white"
        onPress={() => ResetNavigation(navigation, "ForgetPsw")}
      />

      <CustomButton
        title="Don't have an account? Create one"
        onPress={load ? undefined : () => ResetNavigation(navigation, "SignUp")}
        tintColor="white"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    paddingTop: "20%",
    // justifyContent: 'center',
    padding: 20,
    // backgroundColor: 'orangereds',
  },
});

export default Signin;
