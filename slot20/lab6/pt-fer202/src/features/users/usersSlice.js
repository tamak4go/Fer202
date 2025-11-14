import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers, updateUser as updateUserApi } from '../../services/api';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUsers();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Không thể tải danh sách người dùng');
    }
  }
);

export const updateUserStatus = createAsyncThunk(
  'users/updateUserStatus',
  async ({ userId, status }, { rejectWithValue }) => {
    try {
      const response = await updateUserApi(userId, { status });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Không thể cập nhật trạng thái người dùng');
    }
  }
);

const initialState = {
  list: [],
  isLoading: false,
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    toggleAdminStatus: (state, action) => {
      const user = state.list.find((item) => item.id === action.payload);
      if (user) {
        user.role = user.role === 'admin' ? 'student' : 'admin';
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(updateUserStatus.fulfilled, (state, action) => {
        const updatedUser = action.payload;
        const index = state.list.findIndex((user) => user.id === updatedUser.id);
        if (index !== -1) {
          state.list[index] = updatedUser;
        }
      })
      .addCase(updateUserStatus.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      });
  },
});

export const { toggleAdminStatus } = usersSlice.actions;

export const selectUsersState = (state) => state.users;
export const selectUsers = (state) => state.users.list;
export const selectUsersLoading = (state) => state.users.isLoading;
export const selectUsersError = (state) => state.users.error;

export default usersSlice.reducer;

