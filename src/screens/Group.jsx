import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, FAB, Modal, PaperProvider, Portal } from "react-native-paper";

const data = [
  { id: 1, name: "Alice", petName: "Buddy" },
  { id: 2, name: "Bob", petName: "Max" },
  // { id: 3, name: "Charlie", petName: "Bella" },
  // { id: 4, name: "Daisy", petName: "Rocky" },
  // { id: 5, name: "Eva", petName: "Lucy" },
  // { id: 11, name: "Alice", petName: "Buddy" },
  // { id: 12, name: "Bob", petName: "Max" },
  // { id: 13, name: "Charlie", petName: "Bella" },
  // { id: 14, name: "Daisy", petName: "Rocky" },
  // { id: 15, name: "Eva", petName: "Lucy" },
  // { id: 21, name: "Alice", petName: "Buddy" },
  // { id: 22, name: "Bob", petName: "Max" },
  // { id: 23, name: "Charlie", petName: "Bella" },
  // { id: 24, name: "Daisy", petName: "Rocky" },
  // { id: 25, name: "Eva", petName: "Lucy" },
];

const Group = ({ navigation }) => {
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {
    backgroundColor: "white",
    padding: 20,
    height: "60%",
    width: "80%",
    // left:"50%",
    // transform: [{ translateX: '50%' }],
    zIndex: 100,
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("Expense", { groupData: item })}
      style={{
        // flex: 1,
        alignItems: "center",
        padding: 10,
        paddingVertical: 50,
        margin: 5,
        backgroundColor: "#A2C579",
        borderRadius: 5,
      }}
    >
      <View>
        <Text>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.root}>
      <FAB
        icon="plus"
        style={styles.fab}
        backgroundColor="#A2C579"
        mode="elevated"
        size="large"
        label="Add Expense"
        onPress={showModal}
      />
      {/* <PaperProvider style={styles.paper}> */}
      {/* <Portal style={styles.portal}> */}
    
      {/* </Portal> */}
      {/* </PaperProvider> */}
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        // numColumns={2}
        // key={(item) => item.id.toString()}
        scrollEnabled
        showsVerticalScrollIndicator={false}
      />
        <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={containerStyle}
      >
        <Text>Example Modal. Click outside this area to dismiss.</Text>
      </Modal>
    </View>
  );
};

export default Group;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#FFFFDD",
    padding: 20,
    position: "relative",
    alignItems: "center",e
  },
  fab: {
    // position: "absolute",
    // bottom: 80,
    // left: "50%",
    // transform: [{ translateX: -40 }],
  },
  paper: {
    position: "absolute",
  },
  portal: {
    position: "absolute",
  },
});
