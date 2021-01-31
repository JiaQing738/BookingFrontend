
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { NOTIFICATION_OPTIONS } from '../../Common/Constant';
import { authenticate } from '../../Actions/AuthenticationActions';
import AWN from "awesome-notifications";
import './Login.css';

let notifier = new AWN(NOTIFICATION_OPTIONS)

export default function Login({ setToken }) {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const handleSubmit = async (event)=> {
        event.preventDefault();
        if(username === "" || username === undefined)
        {
            notifier.warning('Username can not be empty');
        }
        else if(password === "" || password === undefined)
        {
            notifier.warning('Password can not be empty');
        }
        else
        {
            const token = await authenticate({
                user_id:username,
                password
            });
            if(token.error)
            {
                notifier.warning(token.error);
            }
            else
            {
                setToken(token);
            }
        }
    }

    return(
        <div className="login-panel">
            <div className="login-content">
                <label className="header-label">Login</label>
                <form className="login-form" onSubmit={handleSubmit}>
                    <table className="login-table">
                        <colgroup>
                            <col width="50%"/>
                            <col width="50%"/>
                        </colgroup>
                        <tbody>
                            <tr>
                                <td><label>Username</label></td>
                                <td><input type="text" className="login-field" onChange={e => setUserName(e.target.value)} /></td>
                            </tr>
                            <tr>
                                <td><label>Password</label></td>
                                <td><input type="password" className="login-field" onChange={e => setPassword(e.target.value)} /></td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="login-footer">
                        <button type="submit" className="login-submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};