import React, {useState} from 'react';

import "../styles/StartPage.sass";

const StartPage = ({login}) =>{
    const [pass, setPass] = useState("");

    return (
        <div>
            <input type="text" onChange={e =>setPass(e.target.value)}/>

            <button onClick={() =>{login(pass);setPass("");}}>Send</button>
        </div>
    )
};

export default StartPage;
