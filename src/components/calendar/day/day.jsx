import React, { useEffect } from "react";
import './day.sass';

function Day(props) {
    useEffect(() => {
        const todayDate = new Date();
        let monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        let todaysMonthName = monthNames[todayDate.getMonth()];
        let todaysDay = todayDate.getDate();
        if (props.day === todaysDay && props.month === todaysMonthName) {
            props.setSelectedDay({ day: props.day, month: props.month, year: props.year, toDoList: props.toDo })
        }
    }, [props.day, props.month])
    function getStyles() {
        if (props.day === props.selectedDay.day && props.month === props.selectedDay.month) {
            return { boxShadow: '0px 0px 17px 3px black' }
        }
    }
    return (
        <div style={getStyles()} onClick={() => { props.setSelectedDay({ day: props.day, month: props.month, year: props.year, toDoList: props.toDo }) }} className={props.currentDate.month === props.month ? 'day' : 'day grey'}>
            <p>
                {props.day}
            </p>

            {props.toDo.length > 0 ? <p>!</p> : ''}
        </div>
    );
}

export default Day;