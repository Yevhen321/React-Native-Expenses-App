import { View, StyleSheet, Text, Alert } from "react-native";
import Input from "./input";
import { useState } from "react";
import Button from "./button";
import { type ExpenseData } from "../store/context";
import { getFormattedDate } from "../utils";

type ExpenseFormProps = {
  onCancel: () => void;
  onSubmit: (data: ExpenseData) => void;
  submitBtnLabel: string;
  defaultValues?: ExpenseData;
};

export default function ExpenseForm({
  onCancel,
  onSubmit,
  submitBtnLabel,
  defaultValues,
}: ExpenseFormProps) {
  const [state, setState] = useState({
    amount: defaultValues?.amount.toString() ?? "",
    title: defaultValues?.title ?? "",
    date: defaultValues ? getFormattedDate(defaultValues.date) : "",
  });

  const handleChange = (text: string, type: "amount" | "title" | "date") => {
    setState((prev) => ({
      ...prev,
      [type]: text,
    }));
  };

  const handleSubmit = () => {
    const values: ExpenseData = {
      amount: +state.amount,
      title: state.title,
      date: new Date(state.date),
    };

    const amountIsValid = !isNaN(values.amount) && values.amount > 0;
    const dateIsValid = values.date.toString() !== "Invalid Date";
    const titleIsValid = values.title.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !titleIsValid) {
      Alert.alert("Invalid input", "Pls check");
      return;
    } else {
      onSubmit(values);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.topBox}>
        <Input
          label="Amount"
          value={state.amount}
          onChangeText={(text) => handleChange(text, "amount")}
          keyboardType="decimal-pad"
        />
        <Input
          label="Date"
          placeholder="YYYY-MM-DD"
          maxLength={10}
          value={state.date}
          onChangeText={(text) => handleChange(text, "date")}
        />
      </View>
      <Input
        label="Title"
        value={state.title}
        onChangeText={(text) => handleChange(text, "title")}
        multiline
      />
      <View style={styles.buttons}>
        <Button mode="flat" onPress={onCancel} style={styles.singleBtn}>
          Cancel
        </Button>
        <Button mode="flat" onPress={handleSubmit} style={styles.singleBtn}>
          {submitBtnLabel}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBox: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  singleBtn: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
