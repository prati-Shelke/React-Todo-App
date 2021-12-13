import React from 'react'
import api from './api/todos'
import {RiDeleteBin5Line} from 'react-icons/ri';

function CompletedTodo({todos,setTodos}) {

    // const [todos,setTodos]=useState([]);

    // useEffect(() => {

    //     const fetchTodos = async() => {
    //         const response = await api.get('/todos')
    //         setTodos(response.data)
    //     }
    //     fetchTodos()
    // },[todos.status])

    // console.log(todos)
    const Done = (todos.filter(todo => todo.status === "done"))
    //console.log(Done)
    const handleDelete = async (id) => {
        try {
                let result =window.confirm("Do you want to delete the task?")
                if(result)
                    {
                        await api.delete(`/todos/${id}`);
                        const todosList = todos.filter(todo => todo.id !== id);
                        setTodos(todosList);
                       
                    }
                
        
        } catch (err) {
          console.log(`Error: ${err.message}`);
        }
      }
   
   
    return (
        
        <div>
            <div className="dropdown">
                <button className="dropbtn">Completed List</button>
                    <div className="dropdown-content">
                        {Done.map((completedlist)=>
                            <div key={completedlist.id}>
                            <p>{completedlist.title}  {completedlist.details}  {completedlist.date} &nbsp;&nbsp;
                            <RiDeleteBin5Line size={20} style={{color:"red"}} onClick={()=>handleDelete(completedlist.id)}/>
                            </p>
                          </div>
                        )} 
                    </div>
            </div>
        </div>
    )
}

export default CompletedTodo
