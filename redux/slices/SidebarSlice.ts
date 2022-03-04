import { createSlice } from '@reduxjs/toolkit';

interface SidebarState {
	isActive: boolean;
}

const initialState: SidebarState = {
	isActive: false,
};

export const SidebarSlice = createSlice({
	name: 'sidebar',
	initialState,
	reducers: {
		toggleActive: state => {
			state.isActive = !state.isActive;
		},
	},
});

export const { toggleActive } = SidebarSlice.actions;
export default SidebarSlice.reducer;
