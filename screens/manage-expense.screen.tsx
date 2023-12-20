import { useContext, useLayoutEffect } from "react";
import { View, StyleSheet } from "react-native";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";

import IconButton from "../components/icon-button";
import { GLOBALSTYLES } from "../constants";
import { type ExpenseData, ExpensesContext } from "../store/context";
import ExpenseForm from "../components/expense-form";
import { storeExpense } from "../api";
import { RootStackParamList } from "../App";

type ManageExpenseScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "ManageExpense"
>;

export default function ManageExpenseScreen({
  route,
  navigation,
}: ManageExpenseScreenProps) {
  const { deleteExpense, addExpense, updateExpense, expenses } =
    useContext(ExpensesContext);

  const editedExpense = route.params?.expenseId;
  const isEditing = !!editedExpense;
  const selectedExpense = expenses.find((item) => item.id === editedExpense);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [isEditing, navigation]);

  const handleDelete = () => {
    deleteExpense(editedExpense as string);
    navigation.goBack();
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleConfirm = (data: ExpenseData) => {
    if (isEditing) {
      // updateExpense();
    } else {
      storeExpense(data);
      addExpense(data);
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={handleCancel}
        onSubmit={handleConfirm}
        submitBtnLabel={isEditing ? "Update" : "Add"}
        defaultValues={selectedExpense}
      />
      {isEditing && (
        <View style={styles.deleteBtnBox}>
          <IconButton
            name="trash"
            color={GLOBALSTYLES.colors.error500}
            size={24}
            onPress={handleDelete}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GLOBALSTYLES.colors.primary800,
  },
  deleteBtnBox: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GLOBALSTYLES.colors.primary200,
  },
});
