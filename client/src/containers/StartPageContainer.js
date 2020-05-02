import React, {useState} from 'react';
import {connect} from 'react-redux';
import {login} from "../actions/apiRequests"


const StartPage = ({login}) =>{
    const [pass, setPass] = useState("qwer1234");

    const handleLogin = (e) =>{
        e.preventDefault();

        if (pass.trim()){
            login(pass);
            setPass("");
        }
    };

    return (
        <div className="start_page">
            <div className="login">
                <div className="logo_wrap">
                    <p className="description">Enter DB password</p>

                    <img src="/icons/glob.svg" alt="glob"/>
                </div>

                <form className="form" onSubmit={handleLogin}>
                    <input
                        className="input"
                        type="password"
                        value={pass}
                        onChange={e =>setPass(e.target.value)}
                    />

                    <button
                        className="login_btn"
                        type="submit"
                    />
                </form>
            </div>
        </div>
    )
};

const mapStateToProps = () => {return {}};

const mapDispatchToProps = (dispatch) => {
    return {
        login: pass => dispatch(login(pass))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(StartPage);
