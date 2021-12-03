import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../container/productSlice';

export default configureStore({
    reducer: {
        product: productReducer
    },
});