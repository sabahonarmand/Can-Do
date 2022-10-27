import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import taskReducer from '../features/tasks/taskSlice';
import goalReducer from '../features/tasks/taskSlice';

//State keeps the entire application in itself
export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: taskReducer,
    goals: goalReducer
  },
});
