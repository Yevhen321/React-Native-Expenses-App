import { View, Text, StyleSheet, FlatList } from "react-native";
import ExpenseItem, { type ExpenseItemT } from "./expense-item";

type ExpensesListProps = {
  expenses: ExpenseItemT[];
};

function renderExpensesItem(item: ExpenseItemT) {
  return <ExpenseItem {...item} />;
}

export default function ExpensesList({ expenses }: ExpensesListProps) {
  return (
    <View>
      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => renderExpensesItem(item)}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
