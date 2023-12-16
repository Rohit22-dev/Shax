import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/HomeScreen";
import Login from "./src/screens/Login";
import Loading from "./src/screens/Loading";
import SignUp from "./src/screens/SignUp";
import GroupExpense from "./src/screens/GroupExpense";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Loading" component={Loading} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Expense" component={GroupExpense} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
