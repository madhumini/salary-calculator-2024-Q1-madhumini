import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Earning {
  type: string;
  amount: number;
  epf: boolean;
}

interface Deduction {
  type: string;
  amount: number;
}

interface SalaryState {
  basicSalary: number;
  earnings: Earning[];
  deductions: Deduction[];
}

const initialState: SalaryState = {
  basicSalary: 0,
  earnings: [],
  deductions: [],
};

const salarySlice = createSlice({
  name: "salary",
  initialState,
  reducers: {
    setBasicSalary(state, action: PayloadAction<number>) {
      state.basicSalary = action.payload;
    },
    addEarning(
      state,
      action: PayloadAction<{ index: number; earning: Earning }>
    ) {
      const { index, earning } = action.payload;
      state.earnings[index] = earning;
    },
    removeEarning(state, action: PayloadAction<number>) {
      state.earnings.splice(action.payload, 1);
    },
    addDeduction(
      state,
      action: PayloadAction<{ index: number; deduction: Deduction }>
    ) {
      const { index, deduction } = action.payload;
      state.deductions[index] = deduction;

    },
    removeDeduction(state, action: PayloadAction<number>) {
      state.deductions.splice(action.payload, 1);
    },
    resetForm(state) {
      state.earnings = [];
      state.deductions = [];
      state.basicSalary = 0;
    },
  },
});

export const {
  setBasicSalary,
  addEarning,
  addDeduction,
  resetForm,
  removeDeduction,
  removeEarning,
} = salarySlice.actions;
export default salarySlice.reducer;
