import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { IPost } from '@utils/types';

type IState =
    | {
          isActive: true;
          post: IPost;
      }
    | {
          isActive: false;
          post: undefined;
      };

const initialState: IState = {
    isActive: false,
    post: undefined,
};

export const UpdatePostModalSlice = createSlice({
    name: 'updatePostModal',
    initialState,
    reducers: {
        openModal: (state, action: PayloadAction<IPost>) => {
            // state.isActive = true;
            // state.post = action.payload;

            return {
                isActive: true,
                post: action.payload,
            };
        },

        closeModal: (state) => {
            // state.isActive = false;
            // state.post = undefined;

            return {
                isActive: false,
                post: undefined,
            };
        },
    },
});

export const { openModal, closeModal } = UpdatePostModalSlice.actions;
export default UpdatePostModalSlice.reducer;
