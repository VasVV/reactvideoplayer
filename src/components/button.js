import { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector, useDispatch } from 'react-redux'
import { changeVolumeLevel } from '../reducers/volume';

export default function Button({iconOne, iconTwo, isStatic, type, secondType}) {

    const [handler, setHandler] = useState(false);
    const dispatch = useDispatch();
    const isPaused = useSelector(state => state.playPause);
    const isFullscreen = useSelector(state => state.fullscreen.isFullscreen);
    const isMuted = useSelector(state => state.volume.isMuted);
    const volumeLevel = useSelector(state => state.volume.volumeLevel)
    const [showVolume, setShowVolume] = useState(false);

    const volumeRef = useRef(volumeLevel);

    const handle = () => {
        dispatch(type);
    }

    useEffect(() => {
        if (type?.type === 'playPause/changePlayPause') {
            setHandler(!handler);
        }
    }, [isPaused])

    useEffect(() => {
        if (type?.type === 'fullscreen/setFullscreen') {
            setHandler(!handler);
        }
    }, [isFullscreen])

    useEffect(() => {
        if (type?.type === 'volume/setMuted') {
            setHandler(!handler);
        }
    }, [isMuted])

    useEffect(() => {
        volumeLevel === 0 && type?.type === 'volume/setMuted' ? setHandler(false) : setHandler(true)
    },[volumeLevel])

    return (
        <div className="button-container">
            <button 
                onClick={() => handle()}
                onMouseEnter={() => setShowVolume(true)}
                >
                { !isStatic ? !handler ? <FontAwesomeIcon icon ={iconOne} /> : <FontAwesomeIcon icon ={iconTwo} /> : <FontAwesomeIcon icon ={iconOne} /> }
            </button>    
            { showVolume && secondType && secondType?.type === 'volume/changeVolumeLevel' && <input 
                className="volume-level" 
                type='range' 
                min='0' 
                max='1' 
                step='any' 
                ref={volumeRef}
                onChange={ () => dispatch(changeVolumeLevel(volumeRef.current.value)) }  /> } 
         </div>
        )
}