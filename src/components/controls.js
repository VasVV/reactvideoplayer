import { faPlay, faPause, faVolumeMute, faVolumeUp, faVolumeDown, faExpand, faCompress, faForward, faBackward } from '@fortawesome/free-solid-svg-icons'
import Button from './button';
import { changePlayPause } from '../reducers/playpause';
import {setForward, setBackward} from '../reducers/currTime';
import { setFullscreen } from '../reducers/fullscreen';
import { setMuted, changeVolumeLevel } from '../reducers/volume';
import {useSelector} from 'react-redux';

export default function Controls() {

    const duration = new Date(useSelector(state => state.currTime.duration) * 1000).toISOString().substr(14, 5)
    
    const currTime =  new Date(useSelector(state => state.currTime.currentTime) * 1000).toISOString().substr(14, 5)

    return (
        <div className="controls">
            <div className="controls__left">
                <Button 
                    isStatic={false}
                    type={changePlayPause()}
                    iconOne={faPause}
                    iconTwo={faPlay}
                />
                <Button 
                    isStatic={false}
                    type={setMuted()}
                    secondType={changeVolumeLevel()}
                    iconOne={faVolumeMute}
                    iconTwo={faVolumeUp}
                />
               
                <Button 
                    isStatic={true}
                    iconOne={faBackward}
                    type={setBackward()}
                />        
                
                <Button
                    isStatic={true}
                    iconOne={faForward}
                    type={setForward()} 
                    />
                    <div style={{color: 'white', padding: '5px', margin: '0 5px'}}>
                        {`${currTime}/${duration}`}
                    </div>
                
            </div>
            <div className="controls__right">
                <Button 
                    isStatic={false}
                    type={setFullscreen()}
                    iconOne={faExpand}
                    iconTwo={faCompress}
                />
            </div>
        </div>
    )
}