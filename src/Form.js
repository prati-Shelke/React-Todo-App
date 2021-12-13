import {React , useState,useEffect} from 'react'
import { Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './home.css'
import api from './api/todos'
import { useNavigate} from 'react-router';

//import  from './Home'

 
function Form(props)
{
    
    let navigate = useNavigate();


    const [todos,setTodos]=useState([]);
    const [title,setTitle] = useState("")
    const [details,setDetails] = useState("")
    const [date , setDate] = useState("")
   
    
    useEffect(() => {

        const fetchTodos = async() => {
            const response = await api.get('/todos')
            setTodos(response.data)
        }
        fetchTodos()
    },[])

 

    const handleSubmit = async(e) =>
    {
        e.preventDefault()
        let id = todos.length ? todos[todos.length - 1].id +1: 1;
        let sortPosition = todos.length ? todos[todos.length - 1].sortPosition +1: 1;
        //console.log(todos.length)
        const newPost = {id , title: title , details:details , date:date , status:"not done" , sortPosition}
        try {
            const response =await api.post('/todos' , newPost)
            const allTodos = [...todos, response.data];
            //console.log(todos.title)
            setTodos(allTodos);
            setTitle('');
            setDetails('');
            setDate('')
          } catch (err) {
            console.log(`Error: ${err.message}`)
          }
          navigate(-1)
    }
    
    // let  today= new Date()
    // let newDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  
  
    // var currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    // let tomarrow = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate();

    // let next= new Date(today.getFullYear(), today.getMonth(), today.getDate()+7)
    // let day=next.getDate()
    // let nextWeek = next.getFullYear() + '-' + (next.getMonth() + 1) + '-' + (day<10?("0"+day):day);
 
    //  next=new Date((new Date().getTime() + 30*24 * 60 * 60 * 1000));
    // let month=next.getMonth()
    // let nextMonth = next.getFullYear() + '-' + ((month<10?("0"+month):month) + 1) + '-' + next.getDate();

    

    return (    
            <form >
            <div className="body">
                <div className="form">
                    <div className="row">
                        <div className="col-md-2">
                            <label>Title:</label>
                        </div>
                        
                        <div className="col-md-9">
                            <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} required className="form-control"/>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-2">
                            <label>Details:</label>
                        </div>
                    
                        <div className="col-md-9">
                            <textarea name="details"  value={details} onChange={(e) => setDetails(e.target.value)} className="form-control"/>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-2">
                            <label>Date:</label>
                        </div>
                    
                        <div className="col-md-9 date">
                            <input type="date" name="date" value={date} onChange={(e) => setDate(e.target.value)} className="form-control"/>
                          
                            <select value={date} onChange={(e) => setDate(e.target.value)}  className="selectBox form-control">
                                    <option value="" >Select date </option>
                                    <option value={props.newDate}  >today </option>
                                    <option value={props.tomarrow} >tomarrow </option>
                                    <option value={props.nextWeek}>next week</option>
                                    <option value={props.nextMonth}>next month</option>
                            </select>
                        </div>
                        
                    </div>

                    <div className="inputbox text-center">
                        <Button variant="success" onClick={handleSubmit}> Save </Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                
                        <Button variant="danger" onClick={()=> navigate(-1)}>Cancel</Button>{' '}
                    </div>
                    
                   

                </div>
            </div>
            </form>
        )
}

export default Form


