import React, { useState } from 'react';

const ClockInOut = () => {
    const [message, setMessage] = useState('');
    const [clockInTime, setClockInTime] = useState('');
    const [clockOutTime, setClockOutTime] = useState('');
    const [totalWorkTimeInSeconds, setTotalWorkTimeInSeconds] = useState(0);

    const buttonStyle = {
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
        margin: '5px',
        backgroundColor: 'rgb(73 129 132)',
        color: 'white',
        border: 'none',
        outline: 'none'
    };

    const resetButtonStyle = {
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
        margin: '5px',
        backgroundColor: 'rgb(238 128 126)',
        color: 'white',
        border: 'none',
        outline: 'none'
    };

    const containerStyle = {
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif'
    };

    const headerStyle = {
        fontWeight: 'bold',
        fontSize: '24px'
    };

    const messageStyle = {
        color: 'red'
    };

    const getCurrentTimeInSeconds = () => {
        return Math.floor(Date.now() / 1000);
    };

    const handleClockIn = () => {
        const currentTimeInSeconds = getCurrentTimeInSeconds();
        setClockInTime(currentTimeInSeconds);
        setTotalWorkTimeInSeconds(0); // Reset total work time to 0 when clocking in
    };

    const handleClockOut = () => {
        const currentTimeInSeconds = getCurrentTimeInSeconds();
        setClockOutTime(currentTimeInSeconds);

        // Calculate total work time only if clock in time is set
        if (clockInTime) {
            const workTimeInSeconds = currentTimeInSeconds - clockInTime;
            setTotalWorkTimeInSeconds(workTimeInSeconds > 0 ? workTimeInSeconds : 0); // Ensure total work time is non-negative
        }
    };

    const handleReset = () => {
        setClockInTime('');
        setClockOutTime('');
        setTotalWorkTimeInSeconds(0);
        setMessage('');
    };

    const formatTime = (timeInSeconds) => {
        const hours = Math.floor(timeInSeconds / 3600);
        const minutes = Math.floor((timeInSeconds % 3600) / 60);
        const seconds = timeInSeconds % 60;
        return `${hours}h ${minutes}m ${seconds}s`;
    };

    return (
        <div className="max-w-[800px] w-full mx-auto text-center flex flex-col justify-center p-6">
            <h1 className="mt-4 font-extrabold text-4xl">Clock In/Out</h1>
            <div className="max-w-[800px] w-full mx-auto text-center flex flex-col justify-center p-6">
                <button onClick={handleClockIn} style={buttonStyle}>Clock In</button>
                <button onClick={handleClockOut} style={buttonStyle}>Clock Out</button>
                <button onClick={handleReset} style={resetButtonStyle}>Reset</button>
                <p className="mt-4">Clock In Time: {clockInTime ? new Date(clockInTime * 1000).toLocaleString() : ''}</p>
                <p className="mt-4">Clock Out Time: {clockOutTime ? new Date(clockOutTime * 1000).toLocaleString() : ''}</p>
                <p className="mt-4">Total Work Time: {formatTime(totalWorkTimeInSeconds)}</p>
            </div>
            <p style={messageStyle}>{message}</p>
        </div>
    );
};

export default ClockInOut;

// import React, { useState } from 'react';

// const ClockInOut = () => {
//     const [message, setMessage] = useState('');
//     const [clockInTime, setClockInTime] = useState('');
//     const [clockOutTime, setClockOutTime] = useState('');
//     const [totalWorkTime, setTotalWorkTime] = useState('');

//     const buttonStyle = {
//         padding: '5px 10px',
//         borderRadius: '5px',
//         cursor: 'pointer'
//     };

//     const clockInButtonStyle = {
//         ...buttonStyle,
//         marginRight: '10px',
//         backgroundColor: '#4CAF50',
//         color: 'white'
//     };

//     const clockOutButtonStyle = {
//         ...buttonStyle,
//         marginRight: '10px',
//         backgroundColor: '#f44336',
//         color: 'white'
//     };

//     const messageStyle = {
//         color: 'red'
//     };

//     const handleClockIn = async () => {
//         const token = localStorage.getItem('token');
//         if (!token) {
//             setMessage('Error: No token found');
//             return;
//         }

//         try {
//             const response = await fetch('/api/users/clock-in', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'jwt_token': token
//                 },
//                 body: JSON.stringify({ email: localStorage.getItem('email') })
//             });
//             const data = await response.json();
//             setMessage(data.message);

//             // Update clock-in time
//             if (data.currentTime) {
//                 setClockInTime(new Date(data.currentTime * 1000).toLocaleString());
//             }
//         } catch (error) {
//             setMessage('Error: Failed to clock in');
//         }
//     };

//     const handleClockOut = async () => {
//         const token = localStorage.getItem('token');
//         if (!token) {
//             setMessage('Error: No token found');
//             return;
//         }

//         try {
//             const response = await fetch('/api/users/clock-out', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'jwt_token': token
//                 },
//                 body: JSON.stringify({ email: localStorage.getItem('email') })
//             });
//             const data = await response.json();
//             setMessage(data.message);

//             // Update clock-out time and total work time
//             if (data.currentTime && data.workTime) {
//                 setClockOutTime(new Date(data.currentTime * 1000).toLocaleString());
//                 setTotalWorkTime(data.workTime);
//             }
//         } catch (error) {
//             setMessage('Error: Failed to clock out');
//         }
//     };

//     return (
//         <div style={{ textAlign: 'center' }}>
//             <h2>Clock In/Out</h2>
//             <div>
//                 <button onClick={handleClockIn} style={clockInButtonStyle}>Clock In</button>
//                 <button onClick={handleClockOut} style={clockOutButtonStyle}>Clock Out</button>
//             </div>
//             <div>
//                 <p>Clock In Time: {clockInTime}</p>
//                 <p>Clock Out Time: {clockOutTime}</p>
//                 <p>Total Work Time: {totalWorkTime} seconds</p>
//             </div>
//             <p style={messageStyle}>{message}</p>
//         </div>
//     );
// };

// export default ClockInOut;