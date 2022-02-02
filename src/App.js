import MainWindow from './components/mainwindow';
import Timeline from './components/timeline';
import Controls from './components/controls';
import {useEffect, useState} from 'react';
import { changePlayPause } from './reducers/playpause';
import { setFullscreen } from './reducers/fullscreen';
import { setMuted, changeVolumeLevel} from './reducers/volume';
import {setForward, setBackward} from './reducers/currTime';
import { useDispatch, useSelector } from 'react-redux';
import './App.scss';
import { FullScreen, useFullScreenHandle } from "react-full-screen";

function App() {

  const dispatch = useDispatch();
  const handle = useFullScreenHandle();
  const isFullscreen = useSelector(state => state.fullscreen.isFullscreen);
  const isPaused = useSelector(state => state.playPause.isPaused);
  const [hideControls, setHideControls] = useState(false);

  useEffect(() => {
    !isFullscreen ? handle.enter() : handle.exit();
  }, [isFullscreen])

  useEffect(() => {
    if (!isPaused) {
      console.log('playing...')
      setTimeout(() => {
        setHideControls(true);
      }, 3000)
    } else if (isPaused) {
      console.log('paused!')
      setHideControls(false);
    }
  }, [isPaused])


  const handleKeyDown = e => {

    switch (e.key) {

      case ' ': 
        e.preventDefault();
        dispatch(changePlayPause());
        break;
      case 'f':
        dispatch(setFullscreen());
        break;
      case 'm':
        dispatch(setMuted()); 
        break; 
      case 'ArrowRight':
        dispatch(setForward());
        break;
      case 'ArrowLeft':
        dispatch(setBackward());
        break;
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
        <div className={hideControls? 'App_bottom_hidden' : "App_bottom" } onMouseOver={() => setHideControls(false)} onMouseOut={!isPaused ? () => setHideControls(true) : ''}>
          <Timeline />
          <Controls />
        </div>
      </FullScreen>
    </div>
  );
}

export default App;
