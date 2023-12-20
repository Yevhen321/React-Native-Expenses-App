import { Text, StyleSheet, View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type {
  CompositeNavigationProp,
  ParamListBase,
} from "@react-navigation/native";
import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import type { StackNavigationProp } from "@react-navigation/stack";

import { GLOBALSTYLES } from "../constants";
import { getFormattedDate } from "../utils";
import { RootStackParamList } from "../App";

type ProfileScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<ParamListBase, "">,
  StackNavigationProp<RootStackParamList, "ManageExpense">
>;

export type ExpenseItemT = {
  id: string;
  title: string;
  amount: number;
  date: string;
};

export default function ExpenseItem({ title, amount, date, id }: ExpenseItemT) {
  const { navigate } = useNavigation<ProfileScreenNavigationProp>();

  const handleExpensePress = () => {
    navigate("ManageExpense", {
      expenseId: id,
    });
  };

  return (
    <Pressable
      onPress={handleExpensePress}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.item}>
        <View>
          <Text style={[styles.textBase, styles.desctiption]}>{title}</Text>
          <Text style={styles.textBase}>{getFormattedDate(date)}</Text>
        </View>
        <View style={styles.amountBox}>
          <Text style={styles.amount}>{amount.toFixed()}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  item: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: GLOBALSTYLES.colors.primary500,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 6,
    elevation: 3,
    shadowColor: GLOBALSTYLES.colors.gray500,
    shadowRadius: 4,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.4,
  },
  textBase: {
    color: GLOBALSTYLES.colors.primary50,
  },
  desctiption: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
  },
  amountBox: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    minWidth: 80,
  },
  amount: {
    color: GLOBALSTYLES.colors.primary500,
  },
});
