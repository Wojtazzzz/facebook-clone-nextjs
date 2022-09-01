import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isActive: false,
};

export const CreatePostModalSlice = createSlice({
    name: 'createPostModal',
    initialState,
    reducers: {
        openModal: (state) => {
            state.isActive = true;
        },
        closeModal: (state) => {
            state.isActive = false;
        },
    },
});

export const { openModal, closeModal } = CreatePostModalSlice.actions;
export default CreatePostModalSlice.reducer;
