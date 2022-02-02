import sample from '../media/sample.mp4';
import { useEffect, useRef, useState, useMemo } from 'react';
import { useSelector, useDispatch} from 'react-redux'
import { setCurrentTime, setDuration } from '../reducers/currTime';
import { changePlayPause } from '../reducers/playpause';
import Overlay from './overlay';
import { faPlay, faPause, faVolumeMute, faVolumeUp, faVolumeDown, faExpand, faCompress, faForward, faBackward } from '@fortawesome/free-solid-svg-icons'

export default function MainWindow() {

    const isPaused = useSelector((state) => state.playPause.isPaused)
    const dispatch = useDispatch();
    const isMuted = useSelector(state => state.volume.isMuted);
    const volumeLevel = useSelector(state => state.volume.volumeLevel);
    const currentTimeChanged = useSelector(state => state.currTime.changed);
    const isForwardBackward = useSelector(state => state.currTime.isForwardBackward);
    const isForward = useSelector(state => state.currTime.isForward);
    const isBackward = useSelector(state => state.currTime.isBackward);
    const newTime = useSelector(state => state.currTime.currentTime);
    const videoRef = useRef(null);
    const [loaded, setLoaded] = useState(false);
    const [btn, setBtn] = useState(null);
    const [show, setShow] = useState(false);
    

    useEffect(() => {
        videoRef.current.currentTime = newTime
    }, [currentTimeChanged]);


    useEffect(() => {
        console.log('forward')
        console.log(faForward)
         setBtn(faForward) 
        }, [isForward])

    useEffect(() => { setBtn(faBackward)}, [isBackward])

    useEffect(() => {
         !isPaused ? videoRef.current.play() : videoRef.current.pause();
         setShow(!show);
         isPaused ? setBtn(faPause) : setBtn(faPlay);
    }, [isPaused])

    useEffect(() => {
        isMuted ? videoRef.current.volume = 0 : videoRef.current.volume = volumeLevel;
        isMuted ? setBtn(faVolumeMute) : setBtn(faVolumeUp);
    }, [isMuted])

    useEffect(() => {
        console.log('currvolume', videoRef.current.volume );
        console.log('newvol', volumeLevel)
        if (videoRef.current.volume === volumeLevel) {
            setBtn(null);
            return;
        }
        videoRef.current.volume < volumeLevel ? setBtn(faVolumeUp) : setBtn(faVolumeDown);
        if (volumeLevel === 0) {
            setBtn(faVolumeMute);
        }
        videoRef.current.volume = volumeLevel;
    }, [volumeLevel])

    useEffect(() => {
        if (videoRef.current.duration){
            dispatch(setDuration(videoRef.current.duration))
        }
        videoRef.current?.addEventListener('timeupdate', () => dispatch(setCurrentTime(videoRef.current?.currentTime)));
    }, [loaded])

    useEffect(() => {
        videoRef.current.addEventListener('click', () =>  dispatch(changePlayPause()));
        return () => {
            videoRef.current.removeEventListener('click',  dispatch(changePlayPause()));
        }
    },[])

 
    return (
        <div className="main-window">
           <Overlay btn={btn} toggler={show} />
            <video loop volume='1' controls='' src={sample} type="video/mp4" ref={videoRef} onLoadedData={() => setLoaded(true)}/>
        </div>
    )
}