

import React from "react"
import Home from "./Home"
import Form from "./Form"
import EditTodo from "./EditTodo"
import CompletedTodo  from "./CompletedTodo"
import { BrowserRouter as Router, Route, Routes,Navigate} from 'react-router-dom';

function App()
{

  let  today= new Date()
                            
  let newDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();


  var currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
  let tomarrow = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate();

  let next= new Date(today.getFullYear(), today.getMonth(), today.getDate()+7)
  let day=next.getDate()
  let nextWeek = next.getFullYear() + '-' + (next.getMonth() + 1) + '-' + (day<10?("0"+day):day);

  next=new Date((new Date().getTime() + 30*24 * 60 * 60 * 1000));
  let month=next.getMonth()
  let nextMonth = next.getFullYear() + '-' + ((month<10?("0"+month):month) + 1) + '-' + next.getDate();
  
  return (
      
    <Router>
      <Routes>
        <Route path="*" element={<Navigate to ="/default" />}/>
        <Route path="/default" element={<Home />} />
        <Route path="/form" element={<Form newDate={newDate} tomarrow={tomarrow} nextWeek={nextWeek} nextMonth={nextMonth}/>} />
        <Route path="/edittodo/:id" element={<EditTodo newDate={newDate} tomarrow={tomarrow} nextWeek={nextWeek} nextMonth={nextMonth}/>}></Route>
        <Route path="/completedtodo" element={<CompletedTodo/>}/> 
         
      </Routes>
    </Router>
  )
}

export default App
  


