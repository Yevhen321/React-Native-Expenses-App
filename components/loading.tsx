import { View, ActivityIndicator, StyleSheet } from "react-native";
import { GLOBALSTYLES } from "../constants";

export default function Loading() {
  return (
    <View style={styles.box}>
      <ActivityIndicator size="large" color="#fff" />
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
    padding: 24,
    backgroundColor: GLOBALSTYLES.colors.primary700,
    justifyContent: "center",
    alignItems: "center",
  },
});
