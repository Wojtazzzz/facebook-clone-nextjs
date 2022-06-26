import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isModalActive: false,
};

export const CreatePostModalSlice = createSlice({
    name: 'createPostModal',
    initialState,
    reducers: {
        openModal: (state) => {
            state.isModalActive = true;
        },
        closeModal: (state) => {
            state.isModalActive = false;
        },
    },
});

export const { openModal, closeModal } = CreatePostModalSlice.actions;
export default CreatePostModalSlice.reducer;
