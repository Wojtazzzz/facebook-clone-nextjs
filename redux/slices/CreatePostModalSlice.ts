import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isModalActive: false,
};

export const CreatePostModalSlice = createSlice({
    name: 'createPostModal',
    initialState,
    reducers: {
        showModal: (state) => {
            state.isModalActive = true;
        },
        hideModal: (state) => {
            state.isModalActive = false;
        },
    },
});

export const { showModal, hideModal } = CreatePostModalSlice.actions;
export default CreatePostModalSlice.reducer;
