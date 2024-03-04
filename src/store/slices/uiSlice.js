import { createSlice } from '@reduxjs/toolkit';

const currentMonth = new Date().getMonth() + 1;
const currentYear = new Date().getFullYear();

const initialState = {
  dark: false,
  currentMonth,
  currentYear,
  authenticated: true,
  printMode: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    changeDark(state) {
      state.dark = !state.dark;
    },
    setUser(state, action) {
      const { payload = true } = action;
      state.authenticated = payload;
    },
    printOn(state) {
      state.printMode = true;
      state.dark = false;
    },
    printOff(state) {
      state.printMode = false;
    },
  },
});

export const { changeDark, setUser, printOn, printOff } = uiSlice.actions;
export const uiReducer = uiSlice.reducer;
