import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isMuted: false,
    volumeLevel: 1
  };

  export const volume = createSlice({
      name: 'volume',
      initialState,
      reducers: {
          changeVolumeLevel: (state, action) => Object.assign(state, { volumeLevel: Number(action.payload) }),
          setMuted: (state) =>  Object.assign(state, { isMuted: !state.isMuted })
      }
  });
  
export const { changeVolumeLevel, setMuted, volumeLevelUp, volumeLevelDown}  = volume.actions;

export default volume.reducer;