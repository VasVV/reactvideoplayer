import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isFullscreen: false
  };

  export const fullscreen = createSlice({
      name: 'fullscreen',
      initialState,
      reducers: {
          setFullscreen: (state) => !state
        }
      }
  );
  
export const {setFullscreen}  = fullscreen.actions;

export default fullscreen.reducer;