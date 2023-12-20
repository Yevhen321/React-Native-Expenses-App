import React from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import { GLOBALSTYLES } from "../constants";

export default function Button({
  children,
  onPress,
  mode = "none",
  style,
}: {
  children: React.ReactNode;
  onPress: () => void;
  mode?: "flat" | "none";
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View style={style}>
      <Pressable
        style={({ pressed }) => pressed && styles.pressed}
        onPress={onPress}
      >
        <View style={[styles.btn, mode === "flat" && styles.flat]}>
          <Text style={[styles.btnText, mode === "flat" && styles.flatText]}>
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    borderRadius: 4,
    padding: 8,
    backgroundColor: GLOBALSTYLES.colors.primary500,
  },
  flat: {
    backgroundColor: "transparent",
  },
  btnText: {
    color: "#fff",
    textAlign: "center",
  },
  flatText: {
    color: GLOBALSTYLES.colors.primary200,
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: GLOBALSTYLES.colors.primary100,
    borderRadius: 4,
  },
});
