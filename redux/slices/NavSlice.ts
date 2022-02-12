import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CounterState {
    isActive: boolean
}

const initialState: CounterState = {
    isActive: false
}

export const NavSlice = createSlice({
    name: 'nav',
    initialState,
    reducers: {
        toggleActive: (state, action: PayloadAction<boolean>) => {
            state.isActive = action.payload;
        }
    }
})

export const { toggleActive } = NavSlice.actions;
export default NavSlice.reducer;