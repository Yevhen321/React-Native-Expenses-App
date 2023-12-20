import axios from "axios";
import { type ExpenseData } from "../store/context";
import { type ExpenseItemT } from "../components/expense-item";

const api = axios.create({
  baseURL: process.env.API_URL,
});

export function storeExpense(expenseData: ExpenseData) {
  return api.post(`/expenses.json`, expenseData);
}

export async function fetchExpenses() {
  const response = await api.get(`/expenses.json`);

  const expenses: ExpenseItemT[] = [];

  for (const key in response.data) {
    const expense = {
      id: key,
      amount: response.data[key].amount,
      date: response.data[key].date,
      title: response.data[key].title,
    };

    expenses.push(expense);
  }

  return expenses;
}
