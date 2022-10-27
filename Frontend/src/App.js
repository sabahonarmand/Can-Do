import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import CreateTask from './pages/CreateTask';
import TodayTasks from './pages/TodayTasks';
import WeekTasks from './pages/WeekTasks';
import AllTasks from './pages/AllTasks';
import Waiting from './components/Waiting';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { register, reset } from './features/auth/authSlice';
import { useEffect, useState } from 'react';
import moment from 'moment';
import SetGoals from './pages/SetGoals';
import TaskChart from './pages/TaskChart';
import AllGoals from './pages/AllGoals';
import NotFound from './pages/NotFound';
function App() {
  const [today, setToday] = useState("");
  const [date, setDate] = useState("");
  const [startDay, setStartDay] = useState("");
  const [lastDay, setLastDay] = useState("");
  const [startDayOfWeek, setStartDayOfWeek] = useState("");
  const [lastDayOfWeek, setLastDayOfWeek] = useState("");
  const getDay = (dateFormat) => {
    // split date in non-digit chaarcters
    let [d, m, y] = dateFormat.split(/\D/);

    //put them in Date method
    const date = new Date(y, m - 1, d)
    //and return weekday in long format
    const weekday = date.toLocaleString("default", { weekday: "long" })

    return weekday
  };
  const getWeek = (day, date) => {
    switch (day) {
      case "Saturday":
        setStartDay(date);
        setLastDay(date + 6);
        break;
      case "Sunday":
        setStartDay(date - 1);
        setLastDay(date + 5);
        break;
      case "Monday":
        setStartDay(date - 2);
        setLastDay(date + 4);
        break;
      case "Tuesday":
        setStartDay(date - 3);
        setLastDay(date + 3);
        break;
      case "Wednesday":
        setStartDay(date - 4);
        setLastDay(date + 2);
        break;
      case "Thursday":
        setStartDay(date - 5);
        setLastDay(date + 1);
        break;
      case "Friday":
        setStartDay(date - 6);
        setLastDay(date);
        break;
      default:
        break;
    }
  }
  var todayDate = moment();
  useEffect(() => {
    const td = new Date(todayDate).toLocaleDateString('fr-FR');
    const temp = getDay(td);
    setToday(temp);
    setDate(todayDate.format('MMM Do YYYY'));
    const d = todayDate.format('DD');
    const m = todayDate.format('MMM');
    const y = todayDate.format('YYYY');
    const dInt = parseInt(d);
    getWeek(temp, dInt);
    const a = startDay.toString();
    const b = lastDay.toString();
    console.log(a, "a", b, "b");
    setStartDayOfWeek(a + " " + m + " " + y);
    setLastDayOfWeek(b + " " + m + " " + y);
    console.log(startDayOfWeek, y, "dayyyy");
  }, [todayDate, date]);
  return (
    <>
      <Router>
        <div>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/CreateTask' element={<CreateTask />} />
            <Route path='/TodayTasks' element={<TodayTasks
              day={today} date={date} />} />
            <Route path='/WeekTasks' element={<WeekTasks
              startDayOfWeek={startDayOfWeek} lastDayOfWeek={lastDayOfWeek}
              startDay={startDay} lastDay={lastDay} />} />
            <Route path='/AllTasks' element={<AllTasks />} />
            <Route path='/SetGoals' element={<SetGoals />} />
            <Route path='/Waiting' element={<Waiting />} />
            <Route path='/AllGoals' element={<AllGoals />} />
            <Route path='/*' element={<NotFound />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
