import React, { useState, useEffect } from 'react';
import './selected-day.sass';
function SelectedDay(props) {
    const [selectedDay, setSelectedDay] = useState({ day: '', month: '', year: '', name: '', toDoList: [] })
    const [business, setBusiness] = useState('');
    useEffect(() => {
        if (props.selectedDay.year !== '' && props.selectedDay.month !== '' && props.selectedDay.day !== '') {
            getDay(props.selectedDay.day, props.selectedDay.month, props.selectedDay.year, props.userLogin);
        }
    }, [props.selectedDay.day, props.selectedDay.month, props.selectedDay.year, props.userLogin, props.selectedDay.toDoList]);
    async function getDay(day, month, year, userLogin) {
        const body = { day, month, year, userLogin: userLogin };
        console.log('posted:', body);
        fetch('http://localhost:4000/get-day', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(body)
        })
            .then(response => response.json())
            .then(res => setSelectedDay({ day: res.day, month: res.month, year: res.year, name: res.name, toDoList: res.toDoList }));
    }
    async function addToList(day, month, year, business, login) {
        if (business === '') {
            props.setShowMessage({ text: 'Input should not be empty', show: true })
        } else {
            const body = { day, month, year, business: business, login: login };
            console.log('posted:', body);
            fetch('http://localhost:4000/addToList', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(body)
            })
                .then(response => response.json())
                .then(res => console.log(res));
        }
    }
    async function removeFromList(day, month, year, index, login) {
        const body = { day, month, year, index, login };
        console.log('posted:', body);
        fetch('http://localhost:4000/removeFromList', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(body)
        })
            .then(response => response.json())
            .then(res => console.log(res));
    }
    return (
        <div className='selected-day-panel'>
            <div className='panel-header'>
                <p>Your login: {props.userLogin}</p>
                <button onClick={() => { props.setIsAuthicated(false); props.setUserLogin('') }}>Log out</button>
            </div>
            {selectedDay.day !== '' && selectedDay.month !== '' && selectedDay.year !== '' ?
                <div className='selected-day-info'>
                    <p>{selectedDay.day} {selectedDay.month} {selectedDay.year}</p>
                    <div className='selected-day-info-todolist'>
                        {selectedDay.toDoList.length > 0 ? <>
                            {selectedDay.toDoList.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <p>{index + 1}.{`${item}    `} <button onClick={() => {
                                            removeFromList(selectedDay.day, selectedDay.month, selectedDay.year, index, props.userLogin);
                                            setTimeout(() => {
                                                getDay(props.selectedDay.day, props.selectedDay.month, props.selectedDay.year, props.userLogin);
                                                props.setRerenderCalendar(true);
                                            }, 500);
                                        }}>X</button> </p>
                                    </div>
                                )
                            })}
                            <input value={business} onChange={(e) => { setBusiness(e.target.value) }}></input>
                            <button onClick={() => {
                                addToList(selectedDay.day, selectedDay.month, selectedDay.year, business, props.userLogin);
                                setTimeout(() => {
                                    getDay(props.selectedDay.day, props.selectedDay.month, props.selectedDay.year, props.userLogin);
                                    props.setRerenderCalendar(true);
                                }, 500);
                                setBusiness('');
                            }
                            }>+</button>
                        </> : <>
                            <p>To do list is empty</p>
                            <input value={business} onChange={(e) => { setBusiness(e.target.value) }}></input>
                            <button onClick={() => {
                                addToList(selectedDay.day, selectedDay.month, selectedDay.year, business, props.userLogin);
                                setTimeout(() => {
                                    getDay(props.selectedDay.day, props.selectedDay.month, props.selectedDay.year, props.userLogin);
                                    props.setRerenderCalendar(true);
                                }, 500);
                                setBusiness('');
                            }
                            }>+</button>
                        </>}
                    </div>
                </div>
                : <></>}
        </div>
    );
}

export default SelectedDay;