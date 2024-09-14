import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user';

export const store = configureStore({
    reducer: {
        users: userReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
