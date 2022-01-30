import {useSelector, useDispatch} from 'react-redux';
import {setCurrentTimeChanged} from '../reducers/currTime';

export default function Timeline() {

    const dispatch = useDispatch();
    const currTime = useSelector(state => state.currTime.currentTime);
    const duration = useSelector(state => state.currTime.duration);
    return (
        <div className="timeline">
            <input 
                className="timeline__line" 
                type='range'
                min='0'
                max={duration}
                step='any'
                value={currTime}
                onChange={(e) => dispatch(setCurrentTimeChanged(e.target.value)) }
                  />
        </div>
    )
}