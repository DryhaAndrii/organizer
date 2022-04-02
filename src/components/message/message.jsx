import React, { useEffect, useState } from 'react';
import './message.sass'
function Message(props) {
    const [className, setClassName] = useState('message hide');
    useEffect(() => {
        setTimeout(()=>{
            setClassName('message show');
        }, 10);
        return ()=>{
            setClassName('message hide');
        }
    }, []);
    return (
        <>
            {
                props.showMessage.show ?
                    <div className={className}>
                        <p>{props.showMessage.text}</p>
                        <button onClick={() => { props.setShowMessage({ text: '', show: false }) }}>OK</button>
                    </div>

                    :
                    <></>
            }
        </>
    )
}

export default Message;