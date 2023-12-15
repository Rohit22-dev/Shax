import {
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import { useForm } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";

const Signin = () => {
  const { height } = useWindowDimensions();
  const navigation = useNavigation();
  const [load, setLoad] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSignIn = async (data) => {
    // try {
    //   setLoad(true);
    //   const {email, password} = data;
    //   const res = await auth().signInWithEmailAndPassword(email, password);
    //   dispatch(setUser(res.user._user));
    //   navigation.navigate('home');
    //   setLoad(false);
    // } catch (error) {
    //   setLoad(false);
    //   console.error(error.code.slice(5));
    // }
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
        rules={{ required: "Emailvamp@wolfecsd is required" }}
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

      <CustomButton title="Forgot Password" color="white" />

      <CustomButton
        title="Don't have an account? Create one"
        onPress={load ? undefined : () => navigation.navigate("SignUp")}
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
