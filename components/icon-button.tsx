import { Pressable, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type IconButtonProps = {
  name:
    | "search"
    | "repeat"
    | "link"
    | "at"
    | "body"
    | "code"
    | "map"
    | "menu"
    | "time"
    | "ellipse"
    | "filter"
    | "image"
    | "stop"
    | "text"
    | "key"
    | "alert"
    | "checkbox"
    | "radio"
    | "timer"
    | "add"
    | "trash";
  size: number;
  color: string;
  onPress: () => void;
};

export default function IconButton({
  name,
  size,
  color,
  onPress,
}: IconButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.btnBox}>
        <Ionicons name={name} size={size} color={color} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btnBox: {
    borderRadius: 24,
    padding: 6,
    marginHorizontal: 8,
    marginVertical: 2,
  },
  pressed: {
    opacity: 0.75,
  },
});
