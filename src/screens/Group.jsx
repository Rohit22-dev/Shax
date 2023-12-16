import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

const data = [
  { id: 1, name: "Alice", petName: "Buddy" },
  { id: 2, name: "Bob", petName: "Max" },
  { id: 3, name: "Charlie", petName: "Bella" },
  { id: 4, name: "Daisy", petName: "Rocky" },
  { id: 5, name: "Eva", petName: "Lucy" },
  { id: 11, name: "Alice", petName: "Buddy" },
  { id: 12, name: "Bob", petName: "Max" },
  { id: 13, name: "Charlie", petName: "Bella" },
  { id: 14, name: "Daisy", petName: "Rocky" },
  { id: 15, name: "Eva", petName: "Lucy" },
  { id: 21, name: "Alice", petName: "Buddy" },
  { id: 22, name: "Bob", petName: "Max" },
  { id: 23, name: "Charlie", petName: "Bella" },
  { id: 24, name: "Daisy", petName: "Rocky" },
  { id: 25, name: "Eva", petName: "Lucy" },
];

const Group = ({navigation}) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("Expense", { groupData: item })}
      style={{
        flex: 1,
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
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        scrollEnabled
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Group;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#FFFFDD",
    padding: 20,
  },
});
