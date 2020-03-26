import React from 'react';

class ScheduleCell extends React.Component{
    // state = {
    //     toDos: [{
    //         description: 'do X',
    //         date: '3-25',
    //         starttime: '13:30',
    //         endtime: '15:00'
    //     }, {
    //         description: 'do Y',
    //         date: '3-26',
    //         starttime: '11:30',
    //         endtime: '13:30'
    //     }]
    // };

    renderToDo = () => {
        let toDos = []
        this.props.user.project_cards.forEach(project_card => {
            project_card.to_dos.forEach(to_do => toDos.push(to_do))
        })
        const months31 = [1,3,5,7,8,10,12];
        const months30 = [4,6,9,11];
        const currentMonth = parseInt(this.props.date.split('-')[0]);
        const currentDay = parseInt(this.props.date.split('-')[1]);
        return toDos.map(toDo => {
            let toDoMonth = parseInt(toDo.date.split('-')[0]);
            let toDoDay = parseInt(toDo.date.split('-')[1]);
            if (toDoDay < 3 && this.props.d > 0){
                if (months31.includes(currentMonth) && currentDay > 29){
                    const prevMonth = toDoMonth - 1;
                    toDoMonth = prevMonth;
                    const fakeDay = 31 + toDoDay;
                    toDoDay = fakeDay;
                } else if (months30.includes(currentMonth) && currentDay > 28){
                    const prevMonth = toDoMonth - 1;
                    toDoMonth = prevMonth;
                    const fakeDay = 30 + toDoDay;
                    toDoDay = fakeDay;
                } else if (currentMonth === 2 && currentDay > 26){
                    const prevMonth = toDoMonth - 1;
                    toDoMonth = prevMonth;
                    const fakeDay = 28 + toDoDay;
                    toDoDay = fakeDay;
                };
            };
            const startHour = parseInt(toDo.starttime.split(':')[0]);
            const startMinute = parseInt(toDo.starttime.split(':')[1]);
            const endHour = parseInt(toDo.endtime.split(':')[0]);
            const endMinute = parseInt(toDo.endtime.split(':')[1]);
            if (toDoMonth === currentMonth && toDoDay === currentDay + this.props.d){
                if (startMinute === 0 && endMinute === 0){
                    if (this.props.h >= startHour && this.props.h < endHour){
                        return toDo.description
                    };
                } else if (startMinute === 30 && endMinute === 0){
                    if (this.props.h < endHour){
                        if (this.props.h > startHour){
                            return toDo.description
                        } else if (this.props.h === startHour && this.props.m === 30){
                            return toDo.description
                        };
                    };
                } else if (startMinute === 0 && endMinute === 30){
                    if (this.props.h >= startHour){
                        if (this.props.h < endHour){
                            return toDo.description
                        } else if (this.props.h === endHour && this.props.m === 0){
                            return toDo.description
                        };
                    };
                } else if (startMinute === 30 && endMinute === 30){
                    if (this.props.h > startHour && this.props.h < endHour){
                        return toDo.description
                    } else if (this.props.h === startHour && this.props.m === 30){
                        return toDo.description
                    } else if (this.props.h === endHour && this.props.m === 0){
                        return toDo.description
                    };
                };
            };
        });
    };

    render(){
        const hour = parseInt(this.props.time.split(':')[0]);
        const minute = parseInt(this.props.time.split(':')[1]);
        return (
            <div className='schedule-cell'>
                {this.props.h === hour && minute - this.props.m >= 0 && minute - this.props.m < 30 && this.props.d === 0 ?
                <div id='current-time'>Now: {this.renderToDo()}</div> : <div className='sched-todo'>{this.renderToDo()}</div>}
            </div>
        )
    }
}

export default ScheduleCell