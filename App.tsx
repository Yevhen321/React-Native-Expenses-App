import { StatusBar } from "expo-status-bar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import AllExpensesScreen from "./screens/all-expenses.screen";
import ManageExpenseScreen from "./screens/manage-expense.screen";
import RecentExpensesScreen from "./screens/recent-expenses.screen";
import { GLOBALSTYLES } from "./constants";
import IconButton from "./components/icon-button";
import ExpensesContextProvider from "./store/context";

export type RootStackParamList = {
  ExpensesOverview: undefined;
  ManageExpense: { expenseId: string };
};

export type RootBottomTabsParamList = {
  RecentExpenses: undefined;
  AllExpenses: undefined;
  ManageExpense: { expenseId: string };
};

type BottomTabsNavigationProp =
  BottomTabNavigationProp<RootBottomTabsParamList>;

const BottomTabs = createBottomTabNavigator<RootBottomTabsParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

function ExpensesOverview() {
  return (
    <BottomTabs.Navigator
      screenOptions={({
        navigation,
      }: {
        navigation: BottomTabsNavigationProp;
      }) => ({
        headerStyle: { backgroundColor: GLOBALSTYLES.colors.primary500 },
        headerTintColor: "#fff",
        tabBarStyle: { backgroundColor: GLOBALSTYLES.colors.primary500 },
        tabBarActiveTintColor: GLOBALSTYLES.colors.accent500,
        headerRight: ({ tintColor }) => (
          <IconButton
            name="add"
            size={24}
            color={tintColor!}
            onPress={() =>
              navigation.navigate("ManageExpense", { expenseId: "" })
            }
          />
        ),
      })}
    >
      <BottomTabs.Screen
        name="RecentExpenses"
        component={RecentExpensesScreen}
        options={{
          tabBarLabel: "Recent",
          tabBarIcon: ({ color, size }) => (
            <Ionicons color={color} size={size} name="hourglass" />
          ),
        }}
      />
      <BottomTabs.Screen
        name="AllExpenses"
        component={AllExpensesScreen}
        options={{
          tabBarLabel: "All list",
          tabBarIcon: ({ color, size }) => (
            <Ionicons color={color} size={size} name="calendar" />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <ExpensesContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="ExpensesOverview"
            screenOptions={{
              headerStyle: { backgroundColor: GLOBALSTYLES.colors.primary500 },
              headerTintColor: "#fff",
            }}
          >
            <Stack.Screen
              name="ExpensesOverview"
              component={ExpensesOverview}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="ManageExpense"
              component={ManageExpenseScreen}
              options={{
                title: "Manage Expense",
                presentation: "modal",
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
}
