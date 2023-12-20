import { View, Text, StyleSheet, FlatList } from "react-native";
import ExpensesSummary from "./expenses-summary";
import ExpensesList from "./expenses-list";
import { GLOBALSTYLES } from "../constants";
import { type ExpenseItemT } from "./expense-item";

type ExpensesOutputProps = {
  expenses: ExpenseItemT[];
  expensesPeriod?: string;
  fallBackText: string;
};
export default function ExpensesOutput({
  expenses,
  expensesPeriod,
  fallBackText,
}: ExpensesOutputProps) {
  let content = <Text style={styles.infoText}>{fallBackText}</Text>;

  if (expenses.length > 0) {
    content = <ExpensesList expenses={expenses} />;
  }
  return (
    <View style={styles.box}>
      <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GLOBALSTYLES.colors.primary700,
  },
  infoText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 36,
  },
});
