import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isFullscreen: false
  };

  export const fullscreen = createSlice({
      name: 'fullscreen',
      initialState,
      reducers: {
          setFullscreen: (state) => Object.assign(state, {isFullscreen: !state.isFullscreen})
        }
      }
  );
  
export const {setFullscreen}  = fullscreen.actions;

export default fullscreen.reducer;