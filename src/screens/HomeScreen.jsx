import { StyleSheet} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TabNavigator from "../components/TabNav";
import Navbar from "../components/Navbar";

const HomeScreen = () => {

  return (
    <SafeAreaView style={styles.root}>
      <Navbar />
      <TabNavigator />
    </SafeAreaView>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#016A70",
  },
});
