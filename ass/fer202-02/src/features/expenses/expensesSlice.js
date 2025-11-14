import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getExpensesByUserId, addExpense, updateExpense, deleteExpense } from '../../services/api';

// Async thunks
export const fetchExpenses = createAsyncThunk(
  'expenses/fetchExpenses',
  async (userId) => {
    const response = await getExpensesByUserId(userId);
    return response;
  }
);

export const createExpense = createAsyncThunk(
  'expenses/createExpense',
  async (expense) => {
    const response = await addExpense(expense);
    return response;
  }
);

export const modifyExpense = createAsyncThunk(
  'expenses/modifyExpense',
  async ({ id, data }) => {
    const response = await updateExpense(id, data);
    return response;
  }
);

export const removeExpense = createAsyncThunk(
  'expenses/removeExpense',
  async (id) => {
    await deleteExpense(id);
    return id;
  }
);

const initialState = {
  items: [],
  filteredItems: [],
  loading: false,
  error: null,
  filterCategory: '',
};

const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    setFilterCategory: (state, action) => {
      state.filterCategory = action.payload;
      if (action.payload === '') {
        state.filteredItems = state.items;
      } else {
        state.filteredItems = state.items.filter(
          (expense) => expense.category === action.payload
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch expenses
      .addCase(fetchExpenses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.filteredItems = action.payload;
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Create expense
      .addCase(createExpense.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.filteredItems = state.filterCategory === '' 
          ? state.items 
          : state.items.filter(e => e.category === state.filterCategory);
      })
      // Update expense
      .addCase(modifyExpense.fulfilled, (state, action) => {
        const index = state.items.findIndex(e => e.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        state.filteredItems = state.filterCategory === '' 
          ? state.items 
          : state.items.filter(e => e.category === state.filterCategory);
      })
      // Delete expense
      .addCase(removeExpense.fulfilled, (state, action) => {
        state.items = state.items.filter(e => e.id !== action.payload);
        state.filteredItems = state.items.filter(
          e => state.filterCategory === '' || e.category === state.filterCategory
        );
      });
  },
});

export const { setFilterCategory } = expensesSlice.actions;
export default expensesSlice.reducer;