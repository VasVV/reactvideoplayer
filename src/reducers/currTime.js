import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isForward: 0,
    isBackward: 0,
    currentTime: 0,
    duration: 0,
    changed: false
  };

  export const currTime = createSlice({
      name: 'currTime',
      initialState,
      reducers: {
        
      setCurrentTime: (state, action) => Object.assign(state, { currentTime: Number(action.payload) }),
      setCurrentTimeChanged: (state, action) => Object.assign(state, { currentTime: Number(action.payload), changed: !state.changed }),
      setDuration: (state, action) => Object.assign(state, { duration: Number(action.payload) }),

      changeCurrTime: (state, action) => {
              if (action.payload === 'isForward') {
              state.isForward++;
          } else {
              state.isBackward++;
          }
        }
      },
      
  });
  
export const {changeCurrTime, setCurrentTime, setDuration, setCurrentTimeChanged}  = currTime.actions;

export default currTime.reducer;