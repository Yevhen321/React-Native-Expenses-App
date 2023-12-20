import {
  View,
  TextInput,
  Text,
  StyleSheet,
  KeyboardTypeOptions,
  TextInputProps,
  StyleProp,
} from "react-native";
import { GLOBALSTYLES } from "../constants";

type InputProps = TextInputProps & {
  label: string;
  style?: StyleProp<View>;
};

export default function Input({
  label,
  value,
  onChangeText,
  keyboardType,
  placeholder,
  multiline,
  style,
  ...rest
}: InputProps) {
  return (
    <View style={[styles.box, style]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        {...rest}
        style={[styles.input, multiline && styles.multiline]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    marginHorizontal: 4,
    marginVertical: 16,
    flex: 1,
  },
  label: {
    fontSize: 12,
    color: GLOBALSTYLES.colors.primary100,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GLOBALSTYLES.colors.primary100,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
    color: GLOBALSTYLES.colors.primary700,
  },
  multiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
});
