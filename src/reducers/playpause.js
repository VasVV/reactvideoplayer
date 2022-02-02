import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isPaused: true,
  };

  export const playPause = createSlice({
      name: 'playPause',
      initialState,
      reducers: {
          changePlayPause: (state) => Object.assign(state, {isPaused: !state.isPaused})
      }
  });
  
export const {changePlayPause}  = playPause.actions;

export default playPause.reducer;