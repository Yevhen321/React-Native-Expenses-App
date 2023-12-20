import { View, Text, StyleSheet, FlatList } from "react-native";
import { GLOBALSTYLES } from "../constants";

import type { ExpenseItemT } from "./expense-item";

type ExpensesSummaryProps = {
  periodName: any;
  expenses: ExpenseItemT[];
};
export default function ExpensesSummary({
  expenses,
  periodName,
}: ExpensesSummaryProps) {
  const expensesSum = expenses.reduce((sum, expense) => {
    return sum + expense.amount;
  }, 0);

  return (
    <View style={styles.box}>
      <Text style={styles.period}>Last 7 days</Text>
      <Text style={styles.sum}>{expensesSum}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    padding: 8,
    backgroundColor: GLOBALSTYLES.colors.primary50,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  period: {
    fontSize: 12,
    color: GLOBALSTYLES.colors.primary400,
  },
  sum: {
    fontSize: 12,
    fontWeight: "bold",
    color: GLOBALSTYLES.colors.primary500,
  },
});
