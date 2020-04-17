import React, {useRef, useState} from 'react'
import Terminal from 'react-console-emulator'
import ReactJson from 'react-json-view';
import AnimateHeight from "react-animate-height";

import {apiCall} from "../actions/apiRequests";
import vhTOpx from "../helpers/vhTOpx";

import "../styles/Console.sass"


const Console = () => {
    const [isOpen, setVisibility] = useState(false);
    const terminal = useRef(null);

    const height = vhTOpx(60);

    const commands = {
        SELECT: {
            description: 'Get data from DB',
            fn: (...args) => {
                const query = `SELECT ${args.join(' ')}`;

                apiCall("get", `custom_request?query=${query}`)
                    .then(res => {
                        terminal.current.pushToStdout(
                            <ReactJson
                                theme="summerfruit"
                                collapsed={2}
                                style={{backgroundColor: "transparent"}}
                                src={res}
                                collapseStringsAfterLength={30}
                                displayObjectSize={false}
                                displayDataTypes={false}
                                enableClipboard={false}/>
                        )
                    })
                    .catch(err => terminal.current.pushToStdout(err));

                return 'Sending, please wait...'
            }
        },
        TABLES: {
            description: 'Show all DB tables',
            fn: () => [
                    'meteo_stations',
                    'meteo_grounds',
                    'meteo_poles',
                    'employees',
                    'devices',
                    'indicators',
                    'meteo_posts',
                    'transport',
            ].map((it, i) => <p key={i}>{it}</p>)
        }
    };

    return (
        <div className={`console_wrapper`}>
            <button
                className={`console_btn ${isOpen ? "visible" : ""}`}
                onClick={() => setVisibility(!isOpen)}>
                Terminal
            </button>

            <AnimateHeight
                height={isOpen ? height : 0}
                className="wrapper_height"
                duration={300}
            >

                <Terminal
                    welcomeMessage="Enter `help` to see available commands, for example `SELECT * FROM meteo_stations`"
                    autoFocus
                    className="console"
                    style={{height: `${height}px`}}
                    ref={terminal}
                    commands={commands}
                    errorText="Command not found, type help to see available commands"
                />
            </AnimateHeight>
        </div>
    )
};

export default Console
