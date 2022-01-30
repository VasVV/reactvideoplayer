import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isPaused: false,
  };

  export const playPause = createSlice({
      name: 'playPause',
      initialState,
      reducers: {
          changePlayPause: (state) => !state,
      }
  });
  
export const {changePlayPause}  = playPause.actions;

export default playPause.reducer;