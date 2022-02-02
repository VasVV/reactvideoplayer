import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {useEffect, useState } from 'react';
export default function Overlay({btn}) {

    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(true);
        setTimeout(() => {
            setShow(false);
        }, 2000)
    }, [btn])
     
    return (
        <>
        {show && <div className="overlay">
            <FontAwesomeIcon icon={btn} />
        </div>}
        
        </>
    )
}