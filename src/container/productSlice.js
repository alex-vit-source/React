import { createSlice } from '@reduxjs/toolkit';

export const productSlice = createSlice({
    name: 'product',
    initialState: {
        list: [],
        index: ''
    },
    reducers: {
        loadList: (state, inData) => {

            state.list = [];
            state.list = [...state.list, ...inData.payload];

        },
        delList: (state, key) => {

            let ite = key.payload;
            state.index = ite;


            if (state.list[+ite] === undefined) console.log('item error');
            else {
                console.log('Удалено');
                state.list.splice(+ite, 1);
            }



        }
    },
});

export const { loadList, delList } = productSlice.actions;

export const selectList = state => state.product.list;

export const selectText = state => state.product.text;

export default productSlice.reducer;