import { faPlay, faPause, faVolumeMute, faVolumeUp, faVolumeDown, faExpand, faCompress, faForward, faBackward } from '@fortawesome/free-solid-svg-icons'
import Button from './button';
import { changePlayPause } from '../reducers/playpause';
import {changeCurrTime} from '../reducers/currTime';
import { setFullscreen } from '../reducers/fullscreen';
import { setMuted, changeVolumeLevel } from '../reducers/volume';

export default function Controls() {

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
                    type={changeCurrTime('isBackward')}
                />        
                
                <Button
                    isStatic={true}
                    iconOne={faForward}
                    type={changeCurrTime('isForward')} 
                    />
                
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