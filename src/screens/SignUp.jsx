import { View, StyleSheet, Text, Alert, Image } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Box, Avatar } from "@react-native-material/core";
import { SafeAreaView } from "react-native-safe-area-context";

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const SignUp = () => {
  const { control, handleSubmit, watch } = useForm();
  const [registering, setRegistering] = useState(false);
  const pwd = watch("password");
  const navigation = useNavigation();

  const onRegisterPressed = async (data) => {
    const { username, password, email } = data;
    console.log(data);
    if (registering) {
      return;
    }
    setRegistering(true);
    try {
      navigation.navigate("home");
    } catch (e) {
      Alert.alert("Oops", e.message);
      console.log(e);
    }
    setRegistering(false);
    // navigation.navigate('ConfirmEmail');
  };
  const onTermsOfUsePressed = () => {
    console.warn("On terms of use pressed");
  };
  const onPrivacyPressed = () => {
    console.warn("On privacy pressed");
  };

  return (
    <SafeAreaView style={styles.root}>
        <Text style={styles.title}>Create an account</Text>
        <View>
          {/* <Image
            style={{
              width: 150,
              height: 150,
              borderRadius: 20,
            }}
            resizeMode="cover"
            source={
              image === ''
                ? require('../assets/panda_3.png')
                : {uri: image.assets[0].uri}
            }
          /> */}
        </View>

        <CustomInput
          name="username"
          placeholder="Username"
          control={control}
          rules={{
            required: "Username is required",
            minLength: {
              value: "3",
              message: "Username should be at least 3 characters long",
            },
            maxLength: {
              value: "24",
              message: "Username should be at most 24 characters long",
            },
          }}
        />
        <CustomInput
          name="email"
          placeholder="Email"
          control={control}
          rules={{
            required: "Email is required",
            pattern: { value: EMAIL_REGEX, message: "Email is invalid" },
          }}
        />
        <CustomInput
          name="password"
          placeholder="Password"
          control={control}
          rules={{
            required: "Password is required",
            minLength: {
              value: "4",
              message: "Password should be at least 3 characters long",
            },
          }}
          secureTextEntry
          hideButton
        />
        <CustomInput
          name="repeat-password"
          placeholder="Repeat Password"
          control={control}
          rules={{
            validate: (value) => value === pwd || "Password do not match",
          }}
          secureTextEntry
          hideButton

        />

        <CustomButton
          title={registering ? "Registering..." : "Register"}
          onPress={handleSubmit(onRegisterPressed)}
          tintColor='white'
        />

        {/* <CustomButton
          text="Upload profile image"
          type="SECONDARY"
          required
          // bgColor="cyan"
          onPress={() => selectDoc()}
        />
        <CustomButton text="Launch camera" onPress={() => camera()} /> */}

        <Text style={styles.text}>
          By registering, you confirm that you accept our{" "}
          <Text style={styles.link} onPress={onTermsOfUsePressed}>
            Terms of Use
          </Text>{" "}
          and{" "}
          <Text style={styles.link} onPress={onPrivacyPressed}>
            Privacy Policy.
          </Text>
        </Text>

        <CustomButton
          title="Have an account? Sign in"
          onPress={() => navigation.navigate("Login")}
          tintColor='white'

        />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    // backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#222",
    margin: 10,
  },
  text: {
    color: "grey",
    marginVertical: 10,
  },
  link: {
    color: "#fdb075",
  },
  imageUpload: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 5,
    marginVertical: 5,
    borderColor: "#3871f3",
    borderWidth: 2,
    backgroundColor: "white",
  },
});

export default SignUp;
