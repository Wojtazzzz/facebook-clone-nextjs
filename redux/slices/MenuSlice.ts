import { createSlice } from '@reduxjs/toolkit';

interface MenuState {
    isActive: boolean;
}

const initialState: MenuState = {
    isActive: false,
};

export const MenuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        toggleActive: (state) => {
            state.isActive = !state.isActive;
        },
    },
});

export const { toggleActive } = MenuSlice.actions;
export default MenuSlice.reducer;
