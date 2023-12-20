import { View, ActivityIndicator, StyleSheet, Text } from "react-native";
import { GLOBALSTYLES } from "../constants";
import Button from "./button";

type ErrorProps = {
  message?: string;
  onConfirm: () => void;
};

export default function Error({ message, onConfirm }: ErrorProps) {
  return (
    <View style={styles.box}>
      <Text style={[styles.text, styles.title]}>Error occured</Text>
      <Text style={styles.text}>{message}</Text>
      <Button onPress={onConfirm}>Ok</Button>
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
  text: {
    color: "#fff",
    textAlign: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  message: {
    fontSize: 14,
  },
});
