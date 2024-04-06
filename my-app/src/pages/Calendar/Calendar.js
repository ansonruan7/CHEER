import * as React from 'react';
import dayjs from 'dayjs';
import Badge from '@mui/material/Badge';
import '../../index.css'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';

//initial date is todays date
const date = new Date();
const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
const formattedDate = date.toLocaleDateString('en-US', options).split('/').join('-');
//initial value for calendar
const initialValue = dayjs(formattedDate);

function ServerDay(props) {
  const { highlightedDays = [], day, outsideCurrentMonth, onDateClick, ...other } = props;

  const isSelected =
    !props.outsideCurrentMonth && highlightedDays.indexOf(props.day.date()) >= 0;

  const handleClick = () => {
    onDateClick(props.day);
  };

  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      badgeContent={isSelected ? '⭐' : undefined}
    >
      <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} onClick={handleClick} />
    </Badge>
  );
}

export default function Calendar() {
  const [user, setUser] = React.useState();
  const [userType, setUserType] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [highlightedDays, setHighlightedDays] = React.useState([]);
  const [information, setInformation] = React.useState('');
  const [events, setEvents] = React.useState([]);
  const [eventInfo, setEventInfo] = React.useState([]);
  const [selectedChild, setSelectedChild] = React.useState('');
  const [children, setChildren] = React.useState([]);
  //event creation
  const [eventDescription, setEventDescription] = React.useState('');
  const [eventName, setEventName] = React.useState('');
  const [eventStartTime, setEventStartTime] = React.useState('');
  const [eventEndTime, setEventEndTime] = React.useState('');
  const [eventDate, setEventDate] = React.useState('');
  const [eventCapacity, setEventCapacity] = React.useState('');
  const checkAuthenticated = async () =>{
    try{
      const res = await fetch ('/api/users/verify', {
        method: "POST",
        headers: {jwt_token: localStorage.token}
      });
      const parseRes = await res.json();
      setUser(parseRes.email);
      setUserType(parseRes.type);
      if (parseRes.type === "Parent"){
        getChildren(parseRes.email);
        //event to get user children and get monthly events of current date
        getMonthlyEvents(initialValue.format('YYYY-MM'));
        getEvents(initialValue.format('YYYY-MM-DD')).then(setEvents);
      } else if (parseRes.type === "Private"){
        getChildEvents(parseRes.email, initialValue.format('YYYY-MM'));
      }
    }catch(err){
      console.log(err);
    }
  }

  React.useEffect(() =>{
    checkAuthenticated();
  },[]);
    const handleSelectedChildChange = (event, eventID) =>{
      let selected = event.target.value;
      let selectedOption = event.target.options[event.target.selectedIndex];
      let email = selectedOption.getAttribute('email');
      console.log('select email: ' + email);
      setSelectedChild(selected);
      signUp(selected, email , eventID);
    }
      //handles 'Confirm Sign Up' buttons
  const signUp = async (selected, email, eventID) =>{
    if(selected=== ''){
      alert("Select who will be attending!");
    }else{
      try {
      const response = await fetch('/api/attendees/create', { 
        method: 'POST', 
        body: JSON.stringify({ email:email, parent_email:user, eventID:eventID }),
        headers: {'Content-Type': 'application/json'}
        });
        if (!response.ok) {
          throw new Error('Request failed');
        }
      } catch (error) {
        console.error('Error:', error);
        return null; // Handle the error gracefully
      }
      alert("Successfully signed up!");
     }  
  }


  const fetchHighlightedDays = (daysToHighlight) => {
    setIsLoading(true);
    setTimeout(() => {
      setHighlightedDays(daysToHighlight);
      setIsLoading(false);
    }, 500);
  };

  //function to retrieve events for the selected month
  async function getMonthlyEvents(date){
    try {
      const response = await fetch(`/api/events/monthly`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({date:date})
      });
      if (!response.ok) {
        throw new Error('Request failed');
      }
      const data = await response.json();
      //once data is received, assign a badge to every day with an event
      const datesToHighlight = [];
      for (const d of data){
        const date = dayjs(d.date).format('DD');
        datesToHighlight.push(parseInt(date));
      }
      fetchHighlightedDays(datesToHighlight);
    } catch (error) {
      console.error('Error:', error);
      return null; // Handle the error gracefully
    }
  };

  //gets events on specific day
  async function getEvents(date){
    try {
      const response = await fetch(`/api/events/day`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({date:date})
      });
      if (!response.ok) {
        throw new Error('Request failed');
      }
      const data = await response.json();
      //once data is received, display events with sign up buttons
      const info = [];
      for (const d of data){
        const i = <li style={{listStyle: 'none'}} key = {data.eventID}>{d.event_name}</li>;
        const button = <button className='bg-[#6a5870] p-2 text-white font-semibold rounded-lg' onClick={() => handleButtonClick(d)}>Read More</button>
        info.push(i);
        info.push(button);
      }
      return info;
    } catch (error) {
      console.error('Error:', error);
      return null; // Handle the error gracefully
    }
  }
//get events of private user
async function getChildEvents(email, date){
  try {
    const response = await fetch(`/api/events/private`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email:email, date:date})
    });
    if (!response.ok) {
      throw new Error('Request failed');
    }
    const data = await response.json();
    //once data is received, assign a badge to every day with an event
    const datesToHighlight = [];
    for (const d of data){
      const date = dayjs(d.date).format('DD');
      datesToHighlight.push(parseInt(date));
    }
    fetchHighlightedDays(datesToHighlight);
  } catch (error) {
    console.error('Error:', error);
    return null; // Handle the error gracefully
  }
};

  //get specific event info
  async function getEventInfo(eventID){
    try {
      const response = await fetch(`/api/events/event`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({eventID:eventID})
      });
      if (!response.ok) {
        throw new Error('Request failed');
      }
      const data = await response.json();
      //once data is received, display events with sign up buttons
      const info = [];
      const desc = <li style={{listStyle: 'none'}}>Description: {data.description}</li>;
      const start = <li style={{listStyle: 'none'}}>Start Time: {data.start_time} pm</li>;
      const end = <li style={{listStyle: 'none'}}>End Time: {data.end_time} pm</li>;
      const button = <button className='bg-[#6a5870] p-2 text-white font-semibold rounded-lg' onClick={() => handleSignUp(data)}>Sign Up!</button>
      info.push(desc);
      info.push(start);
      info.push(end);
      //only push if user is not child
      if (userType!=="Private"){
        info.push(button);
      }
      return info;
    } catch (error) {
      console.error('Error:', error);
      return null; // Handle the error gracefully
    }
  }

    //handles 'Create Event' button click
    const createEvent = async () =>{
    try {
      const response = await fetch('/api/events/create', { 
        method: 'POST', 
        body: JSON.stringify({ description: eventDescription, name:eventName, start_time:eventStartTime, end_time: eventEndTime, date:eventDate, capacity:eventCapacity }),
        headers: {'Content-Type': 'application/json'}
      });
      if (!response.ok) {
        throw new Error('Request failed');
      }
    } catch (error) {
      console.error('Error:', error);
      return null; // Handle the error gracefully
    }
  }

  //get children of logged in parent
  async function getChildren(email){
    try {
      const response = await fetch(`/api/attendees/children`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({parent_email:email})
      });
      if (!response.ok) {
        throw new Error('Request failed');
      }
      const data = await response.json();
      //once data is received, display children as select options
      const info = [];
      for (const child of data){
        info.push(child);
      }
      setChildren(info);
    } catch (error) {
      console.error('Error:', error);
      return null; // Handle the error gracefully
    }
  }

  //handles 'Read More' button click
  const handleButtonClick = async (event) =>{
    //set title, remove rest of events from screen
    setInformation(event.event_name);
    setEvents(null);
    const info = await getEventInfo(event.eventID);
    setEventInfo(info);
  }
  //handles 'Sign Up' button click
  const handleSignUp = async (event) =>{
    //set title, remove rest of events from screen
    setInformation(event.event_name);
    setEvents(null);
    //add questions for sign up
    const info = [];
    const q1 = <li style={{listStyle: 'none'}}>Click a Child from the Drop-Down to Sign Them Up:</li>;
    const select1 = <select onChange={(e)=>handleSelectedChildChange(e, event.eventID)}>
      {children.map((child, index) => (
                <option key={index} value={child.username} email={child.email}>{child.username}</option>
            ))}
    </select>
    info.push(q1);
    info.push(select1);
    info.push(<br></br>);
    setEventInfo(info);
    }


  const handleDateClick = async (date) => {
    // change text info on date click
    setInformation(`Events on ${date.format('YYYY-MM-DD')}`);
    const events = await getEvents(date.format('YYYY-MM-DD'));
    if(Array.isArray(events)){
      if (events.length!=0){
        setEvents(events);
      }
    }
    if(events != null){
      setEvents(events);
    }else{
      setEvents(['No events!'])
    }
    setEventInfo(null);
  };

  const handleMonthChange = (date) => {
    setIsLoading(true);
    setHighlightedDays([]);
    if (userType === "Private"){
      getChildEvents(user, dayjs(date.$d).format('YYYY-MM'));
    }else{
      getMonthlyEvents(dayjs(date.$d).format('YYYY-MM'));
    }
   
  };

  return (
    <div className='grid grid-cols-2 items-center justify-center h-screen'>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className='bg-white rounded-xl shadow-lg m-auto scale-150'> {/* Adjust the width and height as needed */}
          <DateCalendar
            defaultValue={initialValue}
            loading={isLoading}
            onMonthChange={handleMonthChange}
            onYearChange={handleMonthChange}
            renderLoading={() => <DayCalendarSkeleton />}
            slots={{
              day: ServerDay,
            }}
            slotProps={{
              day: {
                highlightedDays,
                onDateClick: handleDateClick,
              }
            }}
          />
        </div>
        
   {user === 'admin@gmail.com' && (
          <div className='event-creation'>
          <h1>Create Event</h1>
          <input type="text" placeholder='Event Name' className="my-2 rounded-lg p-2 mx-2" onChange={(e) => setEventName(e.target.value)}/>
          <input type="text" placeholder='Description' className="my-2 rounded-lg p-2 mx-2" onChange={(e) => setEventDescription(e.target.value)}/>
          <input type="text" placeholder='Start Time' className="my-2 rounded-lg p-2 mx-2" onChange={(e) => setEventStartTime(e.target.value)}/>
          <input type="text" placeholder='End Time' className="my-2 rounded-lg p-2 mx-2" onChange={(e) => setEventEndTime(e.target.value)}/>
          <input type="text" placeholder='Date (YYY-MM-DD)' className="my-2 rounded-lg p-2 mx-2" onChange={(e) => setEventDate(e.target.value)}/>
          <input type="text" placeholder='Capacity' className="my-2 rounded-lg p-2 mx-2" onChange={(e) => setEventCapacity(e.target.value)}/>
          <button onClick={createEvent}>
            Create Event
          </button>
        </div>
        )}
        <div className={`rounded-lg bg-[#FFA500] p-auto py-4 drop-shadow-xl m-12 text-center justify-center items-center w-[75%] ${!information ? 'hidden' : ''}`}>
          <h2 className='font-extrabold text-2xl py-2' >{information}</h2>
          <ul>
          {events && events.map((event, index) => (
            <li className='font-semibold text-lg py-2' key={index} style={{listStyle: 'none'}}>{event}</li>
          ))}
          {eventInfo && eventInfo.map((event, index) => (
            <li className='font-semibold text-lg py-2' key={index} style={{listStyle: 'none'}}>{event}</li>
          ))}
        </ul>
        </div>
      </LocalizationProvider>
    </div>
  );
}