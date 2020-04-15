import React from 'react';

const Arrow = ({isDisabled = true}) =>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 54 54"
        width="70px"
        height="70px"
        className={isDisabled ? "disabled" : ""}>
        <g>
            <g>
                <g>
                    <path fill={isDisabled ? "#ffe2ec" : "#f50057"}
                          d="M27,53L27,53C12.641,53,1,41.359,1,27v0C1,12.641,12.641,1,27,1h0c14.359,0,26,11.641,26,26v0 C53,41.359,41.359,53,27,53z"/>
                </g>
                <path fill="#FFFFFF"
                      d="M22.294,40c-0.256,0-0.512-0.098-0.707-0.293c-0.391-0.391-0.391-1.023,0-1.414L32.88,27 L21.587,15.707c-0.391-0.391-0.391-1.023,0-1.414s1.023-0.391,1.414,0l11.498,11.498c0.667,0.667,0.667,1.751,0,2.418   L23.001,39.707C22.806,39.902,22.55,40,22.294,40z"/>
            </g>
        </g>
    </svg>;

export default Arrow
