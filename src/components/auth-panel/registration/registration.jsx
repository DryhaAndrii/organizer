import React, { useState } from 'react';

function Registration(props) {
    const [userInfo, setUserInfo] = useState({ login: '', password: '', confirmPassword: '' });
    async function register() {
        if (userInfo.login !== "" && userInfo.password !== "" && userInfo.confirmPassword !== "") {
            if (userInfo.password === userInfo.confirmPassword) {
                console.log('posted');
                fetch('http://localhost:4000/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(userInfo)
                })
                    .then(response => response.json())
                    .then(res => props.setShowMessage({ text: res.text, show: true }));
            } else {
                props.setShowMessage({ text: 'Password and confirm password are not equal', show: true })
            }
        } else {
            props.setShowMessage({ text: 'Not all inputs are filled', show: true })
        }

    }
    return (
        <div className='register panel'>
            <h1>Registration</h1>
            <input onChange={(e) => { setUserInfo({ ...userInfo, login: e.target.value }) }} value={userInfo.login} type="text" placeholder='Your login' />
            <input onChange={(e) => { setUserInfo({ ...userInfo, password: e.target.value }) }} value={userInfo.password} type="text" placeholder='Your password' />
            <input onChange={(e) => { setUserInfo({ ...userInfo, confirmPassword: e.target.value }) }} value={userInfo.confirmPassword} type="text" placeholder='Confirm password' />
            <button onClick={() => { register() }}>Register</button>
            <button onClick={() => { props.setIsLoginPage(true) }}>Back to Log in</button>
        </div>
    );
}

export default Registration;