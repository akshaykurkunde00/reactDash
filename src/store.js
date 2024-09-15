import { configureStore } from '@reduxjs/toolkit';
import widgetsReducer from './slice/widgetSlice';

const store = configureStore({
  reducer: {
    widgets: widgetsReducer
  }
});

export default store;
