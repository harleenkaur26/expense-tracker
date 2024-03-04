import { expenceReducer } from "./slices/expenseSlice";
import { uiReducer } from "./slices/uiSlice";

const { configureStore } = require("@reduxjs/toolkit");

const reducer = {
  expenses: expenceReducer,
  ui: uiReducer,
};

export const store = configureStore({
  reducer,
});
