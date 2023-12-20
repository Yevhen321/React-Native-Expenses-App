import { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { ExpensesContext } from "../store/context";
import ExpensesOutput from "../components/expenses-output";
import { getDatesMinusDays } from "../utils";
import { fetchExpenses } from "../api";
import Loading from "../components/loading";
import Error from "../components/error";

export default function RecentExpensesScreen() {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const { expenses, setExpenses } = useContext(ExpensesContext);

  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true);
      try {
        const fetchedExpenses = await fetchExpenses();
        setExpenses(fetchedExpenses);
      } catch (error) {
        setError("Could not fetch expenses");
      } finally {
        setIsFetching(false);
      }
    }

    getExpenses();
  }, []);

  if (isFetching) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} onConfirm={() => console.log("sd")} />;
  }

  const recent = expenses.filter((item) => {
    const today = new Date();
    const sevenDaysAgo = getDatesMinusDays(today, 7);

    return new Date(item.date) > sevenDaysAgo;
  });

  return (
    <View style={styles.container}>
      <ExpensesOutput
        expenses={recent}
        expensesPeriod="Last 7 Days"
        fallBackText="No expenses registered for the last 7 days"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
