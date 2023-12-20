import { View, StyleSheet, Text } from "react-native";
import ExpensesOutput from "../components/expenses-output";
import { useContext } from "react";
import { ExpensesContext } from "../store/context";

export default function AllExpensesScreen() {
  const { expenses } = useContext(ExpensesContext);
  return (
    <View style={styles.container}>
      <ExpensesOutput
        expensesPeriod="Total"
        expenses={expenses}
        fallBackText="No registered expenses found"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
