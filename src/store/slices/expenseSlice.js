import { createSlice, current, createAsyncThunk } from '@reduxjs/toolkit';
import {
  calculateAmount,
  filterArrayByDate,
  getDateFromExpense,
} from 'util/helpers';
import {
  db,
  getDataByYear,
  getDataByDate as getDataByDateFirebase,
  addExpense as addExpenseFirebase,
  removeExpense as removeExpenseFirebase,
} from 'config/firebase';

const initialState = {
  amount: 0,
  expenseList: [],
  fetching: true,
  filterBy: 'month',
};

//Get all epxenses
export const fetchExpenses = createAsyncThunk(
  'expenses/fetchExpensesByDate',
  async () => {
    let existing = localStorage.getItem('expensesList');
    let amount = parseFloat(localStorage.getItem('amount')) || 0;
    existing = existing ? JSON.parse(existing) : [];
    return { expenseList: existing, amount };
  }
);

//Get epxenses by date
export const fetchExpensesByDate = createAsyncThunk(
  'expenses/fetchExpensesByDate',
  async ({ month, year }, thunkApi) => {
    const filter = thunkApi.getState().expenses.filterBy;
    //Firebase
    let result = {};
    if (filter === 'year') result = await getDataByYear(year);
    else result = await getDataByDateFirebase(month, year);
    //Local
    //const expenseList = getDataByDateLocal(month, year);

    const { amount, expenseList } = result;
    let data = filterArrayByDate(expenseList, month, year, filter);

    //Local
    //let amount = calculateAmount(data);
    return { expenseList: data, amount };
  }
);

//Add Expense
export const addExpense = createAsyncThunk(
  'expenses/addExpense',
  async (expense) => {
    //Firebase
    const { expenseList, amount } = await addExpenseFirebase(expense);
    //Local
    //const { expenseList, amount } = addExpenseLocal(expense);

    return { expenseList, amount };
  }
);

//Delete expense
export const deleteExpense = createAsyncThunk(
  'expenses/deleteExpense',
  async (expense) => {
    //Firebase
    const { expenseList, amount } = await removeExpenseFirebase(expense);
    //Local
    //const { expenseList, amount } = removeDataLocal(expense);
    return { expenseList, amount };
  }
);

const expenseSlice = createSlice({
  name: 'expense',
  initialState,
  reducers: {
    setFetch: (state, action) => {
      state.fetching = false;
    },
    changeFilter(state) {
      const { filterBy } = current(state);
      if (filterBy === 'month') state.filterBy = 'year';
      else if (filterBy === 'year') state.filterBy = 'month';
    },
  },
  extraReducers: (builder) => {
    //Get
    builder.addCase(fetchExpensesByDate.fulfilled, (state, action) => {
      state.expenseList = action.payload.expenseList;
      state.amount = action.payload.amount;
      state.fetching = false;
    });
    builder.addCase(fetchExpensesByDate.pending, (state, action) => {
      state.fetching = true;
    });
    builder.addCase(fetchExpensesByDate.rejected, (state, action) => {
      state.fetching = false;
      state.amount = 0;
      state.expenseList = [];
    });
    //Add
    builder.addCase(addExpense.fulfilled, (state, action) => {
      state.amount = action.payload.amount;
      state.expenseList = action.payload.expenseList;
    });
    //Delete
    builder.addCase(deleteExpense.fulfilled, (state, action) => {
      state.amount = action.payload.amount;
      state.expenseList = action.payload.expenseList;
    });
  },
});

const getDataLocal = () => {
  let data = localStorage.getItem('expensesList');
  data = data ? JSON.parse(data) : [];
  return data;
};

const getDataByDateLocal = (month, year) => {
  let data = JSON.parse(localStorage.getItem('expensesList')) || [];
  data = filterArrayByDate(data, month, year);
  return data;
};

const addExpenseLocal = (expense) => {
  const { month, year } = getDateFromExpense(expense);
  let existing = getDataLocal();
  existing.push(expense);
  let calculatedAmount = calculateAmount(existing);
  localStorage.setItem('expensesList', JSON.stringify(existing));
  localStorage.setItem('amount', calculatedAmount);
  let data = getDataByDateLocal(month, year);
  let amount = calculateAmount(data);
  return { expenseList: data, amount };
};

const removeDataLocal = (expense) => {
  const expenseID = expense.id;
  let expenseList = getDataLocal();
  let index = expenseList.findIndex((expense) => expense.id === expenseID);
  expenseList.splice(index, 1);
  let calculatedAmount = calculateAmount(expenseList);
  localStorage.setItem('expensesList', JSON.stringify(expenseList));
  localStorage.setItem('amount', calculatedAmount);
  const { month, year } = getDateFromExpense(expense);
  expenseList = getDataByDateLocal(month, year);
  return { expenseList, amount: calculatedAmount };
};

export const { setFetch, changeFilter } = expenseSlice.actions;
export const expenceReducer = expenseSlice.reducer;
