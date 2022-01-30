import { configureStore } from '@reduxjs/toolkit';
import playPauseReducer from './reducers/playpause';
import currTimeReducer from './reducers/currTime';
import fullscreenReducer from './reducers/fullscreen';
import volumeReducer from './reducers/volume';

export const store = configureStore({
  reducer: {
      playPause: playPauseReducer,
      currTime: currTimeReducer,
      fullscreen: fullscreenReducer,
      volume: volumeReducer,
  },
})