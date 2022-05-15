import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface NavState {
    isActive: boolean;
}

const initialState: NavState = {
    isActive: false,
};

export const NavSlice = createSlice({
    name: 'nav',
    initialState,
    reducers: {
        toggleActive: (state, action: PayloadAction<boolean>) => {
            state.isActive = action.payload;
        },
    },
});

export const { toggleActive } = NavSlice.actions;
export default NavSlice.reducer;
