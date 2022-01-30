import MainWindow from './components/mainwindow';
import Timeline from './components/timeline';
import Controls from './components/controls';
import {useEffect} from 'react';
import { changePlayPause } from './reducers/playpause';
import { setFullscreen } from './reducers/fullscreen';
import { setMuted, changeVolumeLevel} from './reducers/volume';
import {changeCurrTime} from './reducers/currTime';
import { useDispatch, useSelector } from 'react-redux';
import './App.scss';
import { FullScreen, useFullScreenHandle } from "react-full-screen";

function App() {

  const dispatch = useDispatch();
  const handle = useFullScreenHandle();
  const isFullscreen = useSelector(state => state.fullscreen);

  useEffect(() => {
    !isFullscreen ? handle.enter() : handle.exit();
  }, [isFullscreen])


  const handleKeyDown = e => {
    e.preventDefault();
    switch (e.key) {
      case ' ': 
        dispatch(changePlayPause());
      case 'f':
        dispatch(setFullscreen());
      case 'm':
        dispatch(setMuted());  
      case 'ArrowRight':
        dispatch(changeCurrTime('isForward'));
      case 'ArrowLeft':
        dispatch(changeCurrTime('isBackward'));
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', e => handleKeyDown(e));

    return () => {
      window.removeEventListener('keydown', handleKeyDown);

    }
  },[]);

  return (
    <div className="App">
      <FullScreen handle={handle}>
        <div className="App_top">
          <MainWindow />
        </div>
        <div className="App_bottom">
          <Timeline />
          <Controls />
        </div>
      </FullScreen>
    </div>
  );
}

export default App;
