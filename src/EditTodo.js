import React, { useState ,useEffect} from 'react'
import { useParams } from 'react-router'
import api from './api/todos'
import { Button } from 'react-bootstrap'
import { useNavigate} from 'react-router';
//import todos from './api/todos'

function Edittodo(props) {
 
    let navigate = useNavigate();

    const {id}=useParams()
    const [todos,setTodos]=useState([])
    const [Edittitle,setEditTitle] = useState("")
    const [Editdetails,setEditDetails] = useState("")
    const [Editdate , setEditDate] = useState("")

    useEffect(() => {

        const fetchTodos = async() => {
            const response = await api.get('/todos')
            setTodos(response.data)
        }
        fetchTodos()
    },[])

    const todo = todos.find(todo => (todo.id).toString() === id);

    
    useEffect(() => {
        if (todo) {
            setEditTitle(todo.title);
            setEditDetails(todo.details);
            setEditDate(todo.date) 
        }
    }, [todo])

  
    //To edit the tasks
    const handleEdit = async (id,sortPosition) => {
        
        const updatedTodo = { id, title: Edittitle,details:Editdetails,date:Editdate,status:"not done",sortPosition};
        try {
          const response = await api.put(`/todos/${id}`, updatedTodo);
          setTodos(todos.map(todo => todo.id === id ? { ...response.data } : todo));
        } catch (err) {
          console.log(`Error: ${err.message}`);
        }
        navigate(-1)
      }

    return (
        <div>
           <form >
            <div className="body">
                <div className="form">
                    <div className="row">
                        <div className="col-md-2">
                            <label>Title:</label>
                        </div>
                        
                        <div className="col-md-9">
                            <input type="text" name="title" value={Edittitle} onChange={(e) => setEditTitle(e.target.value)} required className="form-control"/>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-2">
                            <label>Details:</label>
                        </div>
                    
                        <div className="col-md-9">
                            <textarea name="details"  value={Editdetails} onChange={(e) => setEditDetails(e.target.value)} className="form-control"/>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-2">
                            <label>Date:</label>
                        </div>
                    
                        <div className="col-md-9 date">
                            <input type="date" name="date" value={Editdate} onChange={(e) => setEditDate(e.target.value)} className="form-control"/>
                           
                            <select value={Editdate} onChange={(e) => setEditDate(e.target.value)}  className="selectBox form-control">
                                    <option value="" >Select date </option>
                                    <option value={props.newDate}  >today </option>
                                    <option value={props.tomarrow} >tomarrow </option>
                                    <option value={props.nextWeek}>next week</option>
                                    <option value={props.nextMonth}>next month</option>
                            </select>
     
                        </div>
                    </div>

                    <div className="inputbox text-center">
                        <Button variant="success" onClick={()=> handleEdit(todo.id,todo.sortPosition)}> Update </Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                
                        <Button variant="danger" onClick={()=> navigate(-1)}>Cancel</Button>{' '}
                    </div>
                    
                   

                </div>
            </div>
            </form>
        </div>
    )
}

export default Edittodo
