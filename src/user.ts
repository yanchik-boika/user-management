import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
}
interface UserState {
    users: User[];
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    users: [],
    loading: false,
    error: null,
};

// Fetch users from JSONPlaceholder
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    return response.data;
});

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.users = action.payload;
                state.loading = false;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Something went wrong';
            });
    },
});

export default userSlice.reducer;
