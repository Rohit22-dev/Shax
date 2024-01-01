import { CommonActions } from "@react-navigation/native";

export const ResetNavigation = (navigation, routeName,data={}) => {
  navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: routeName,params:data }],
    })
  );
};