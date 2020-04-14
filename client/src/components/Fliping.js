import React, {Fragment, useState} from 'react';

import "../styles/Fliping.sass"


const Fliping = ({first, second}) => {
    const [side, setSide] = useState("front");

    return (
        <Fragment>
            <button className="btn_link" onClick={() => setSide("front")}>{first.title}</button>
            <button className="btn_link" onClick={() => setSide("back")}>{second.title}</button>

            <div className="flip-box">
                <div className={`flip-box-inner ${side === "back" ? "rotate" : ""}`}>
                    <div className={`flip-box-front`}>
                        {first.component}
                    </div>
                    <div className={`flip-box-back`}>
                        {second.component}
                    </div>
                </div>
            </div>
        </Fragment>
    );
};


export default Fliping
