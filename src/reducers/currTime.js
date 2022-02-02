import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentTime: 0,
    duration: 0,
    changed: false,
    isForwardBackward: false,
    isForward: false,
    isBackward: false
  };

  export const currTime = createSlice({
      name: 'currTime',
      initialState,
      reducers: {
      setCurrentTime: (state, action) => Object.assign(state, { currentTime: Number(action.payload) }),
      setCurrentTimeChanged: (state, action) => Object.assign(state, { currentTime: Number(action.payload), changed: !state.changed }),
      setDuration: (state, action) => Object.assign(state, { duration: Number(action.payload) }),
      setForward: (state) => Object.assign(state, {currentTime: state.currentTime + 5, changed: !state.changed, isForwardBackward: !state.isForwardBackward, isForward: !state.isForward}),
      setBackward: (state) => Object.assign(state, {currentTime: state.currentTime - 5, changed: !state.changed, isForwardBackward: !state.isForwardBackward, isBackward: !state.isBackward}),
      }  
  });
  
export const {setForward, setBackward, setCurrentTime, setDuration, setCurrentTimeChanged}  = currTime.actions;

export default currTime.reducer;