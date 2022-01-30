import sample from '../media/sample.mp4';
import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch} from 'react-redux'
import { setCurrentTime, setDuration } from '../reducers/currTime';
import { changePlayPause } from '../reducers/playpause';

export default function MainWindow() {

    const isPaused = useSelector((state) => state.playPause)
    const forward = useSelector((state) => state.currTime.isForward);
    const backward = useSelector((state) => state.currTime.isBackward);
    const dispatch = useDispatch();
    const isMuted = useSelector(state => state.volume.isMuted);
    const volumeLevel = useSelector(state => state.volume.volumeLevel);
    const currentTimeChanged = useSelector(state => state.currTime.changed);
    const newTime = useSelector(state => state.currTime.currentTime);
    const videoRef = useRef(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {

        videoRef.current.currentTime = newTime
    }, [currentTimeChanged]);
    
    useEffect(() => {
        let currTime = videoRef.current.currentTime + 5.0;
        videoRef.current.currentTime = currTime;
    }, [forward]);

    useEffect(() => {
        let currTime = videoRef.current.currentTime - 5.0;
        videoRef.current.currentTime = currTime;
    }, [backward]);

    
    useEffect(() => {
         !isPaused ? videoRef.current.play() : videoRef.current.pause();
    }, [isPaused])

    useEffect(() => {
        isMuted ? videoRef.current.volume = 0 : videoRef.current.volume = volumeLevel;
    }, [isMuted])

    useEffect(() => {
        videoRef.current.volume = volumeLevel;
    }, [volumeLevel])

    useEffect(() => {
        if (videoRef.current.duration){
            dispatch(setDuration(videoRef.current.duration))
        }
        videoRef.current?.addEventListener('timeupdate', () => dispatch(setCurrentTime(videoRef.current?.currentTime)));
    }, [loaded])

    useEffect(() => {
        videoRef.current?.addEventListener('click', () =>  dispatch(changePlayPause()));
        return () => {
            videoRef.current?.removeEventListener('click',  dispatch(changePlayPause()));
        }
    },[])

    return (
        <div className="main-window">
            <video loop autoPlay controls='' src={sample} type="video/mp4" ref={videoRef} onLoadedData={() => setLoaded(true)}/>
        </div>
    )
}