import { createContext, useReducer } from "react";
import type { ExpenseItemT } from "../components/expense-item";

export type ExpenseData = {
  title: string;
  amount: number;
  date: string;
};

type ExpensesContextType = {
  expenses: ExpenseItemT[];
  addExpense: ({ title, amount, date }: ExpenseData) => void;
  deleteExpense: (id: string) => void;
  updateExpense: (id: string, data: ExpenseData) => void;
  setExpenses: (expenses: ExpenseItemT[]) => void;
};

type ExpensesState = {
  expenses: ExpenseItemT[];
};

type ExpensesAction =
  | {
      type: "ADD";
      payload: ExpenseData;
    }
  | { type: "DELETE"; payload: { id: string } }
  | {
      type: "UPDATE";
      payload: { id: string; expenseData: ExpenseData };
    }
  | { type: "SET"; payload: ExpenseItemT[] };

export const ExpensesContext = createContext<ExpensesContextType>({
  expenses: [],
  addExpense: () => {},
  deleteExpense: () => {},
  updateExpense: () => {},
  setExpenses: () => {},
});

function expensesReducer(state: ExpensesState, action: ExpensesAction) {
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        expenses: [
          ...state.expenses,
          { ...action.payload, id: Math.random().toString() },
        ],
      };
    case "DELETE":
      return {
        ...state,
        expenses: state.expenses.filter(
          (item) => item.id !== action.payload.id
        ),
      };
    case "UPDATE":
      return {
        ...state,
        expenses: state.expenses.map((expense) =>
          expense.id === action.payload.id
            ? { ...expense, ...action.payload.expenseData }
            : expense
        ),
      };
    case "SET": {
      return {
        ...state,
        expenses: action.payload,
      };
    }

    default:
      return state;
  }
}

function ExpensesContextProvider({ children }: { children: React.ReactNode }) {
  const [expensesState, dispatch] = useReducer<
    React.Reducer<ExpensesState, ExpensesAction>
  >(expensesReducer, { expenses: [] });

  const addExpense = (expenseData: ExpenseData) => {
    dispatch({ type: "ADD", payload: expenseData });
  };

  const deleteExpense = (id: string) => {
    dispatch({ type: "DELETE", payload: { id } });
  };

  const updateExpense = (id: string, expenseData: ExpenseData) => {
    dispatch({ type: "UPDATE", payload: { id, expenseData } });
  };

  const setExpenses = (expenses: ExpenseItemT[]) => {
    dispatch({ type: "SET", payload: expenses });
  };

  const contextValue: ExpensesContextType = {
    expenses: expensesState.expenses,
    addExpense,
    deleteExpense,
    updateExpense,
    setExpenses,
  };

  return (
    <ExpensesContext.Provider value={contextValue}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;
