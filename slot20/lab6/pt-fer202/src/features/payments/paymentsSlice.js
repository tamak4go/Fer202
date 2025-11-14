import { createAsyncThunk, createSlice, createSelector } from '@reduxjs/toolkit';
import { createPayment as createPaymentApi, getPayments } from '../../services/api';

export const fetchPayments = createAsyncThunk(
  'payments/fetchPayments',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getPayments();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Không thể tải danh sách thanh toán');
    }
  }
);

export const createPayment = createAsyncThunk(
  'payments/createPayment',
  async (paymentData, { rejectWithValue }) => {
    try {
      const response = await createPaymentApi(paymentData);
      return response.data;
    } catch (error) {
      if (error.response?.status === 402) {
        return rejectWithValue('Tài khoản không đủ tiền');
      }
      return rejectWithValue(error.response?.data || 'Không thể tạo thanh toán');
    }
  }
);

const initialState = {
  list: [],
  isLoading: false,
  error: null,
};

const paymentsSlice = createSlice({
  name: 'payments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPayments.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPayments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(fetchPayments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(createPayment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createPayment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list.push(action.payload);
      })
      .addCase(createPayment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const selectPaymentsState = (state) => state.payments;
export const selectPayments = (state) => state.payments.list;
export const selectPaymentsLoading = (state) => state.payments.isLoading;
export const selectPaymentsError = (state) => state.payments.error;

export const selectSuccessfulPayments = createSelector(
  [selectPayments],
  (payments) => payments.filter((payment) => payment.status === 'SUCCESS')
);

export default paymentsSlice.reducer;

