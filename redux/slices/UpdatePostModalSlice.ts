import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { IPostToUpdate } from '@utils/types';

type IState =
    | {
          isActive: true;
          post: IPostToUpdate;
      }
    | {
          isActive: false;
          post: undefined;
      };

const initialState = {
    isActive: false,
    post: undefined,
} as IState;

export const UpdatePostModalSlice = createSlice({
    name: 'updatePostModal',
    initialState,
    reducers: {
        openModal: (state, action: PayloadAction<IPostToUpdate>) => {
            state.isActive = true;
            state.post = action.payload;
        },

        closeModal: (state) => {
            state.isActive = false;
            state.post = undefined;
        },
    },
});

export const { openModal, closeModal } = UpdatePostModalSlice.actions;
export default UpdatePostModalSlice.reducer;
