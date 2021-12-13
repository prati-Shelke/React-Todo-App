import React,{ Fragment, useState, useEffect} from 'react'
import todoimg from "./todoimg.jpg"
import './home.css'
import {useNavigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import api from './api/todos'
import {RiDeleteBin5Line} from 'react-icons/ri';
import {AiFillCheckCircle} from 'react-icons/ai'
import {FaEdit} from 'react-icons/fa'
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import CompletedTodo from './CompletedTodo';
//import Form1 from './Form1'




function Home()
 {
      
    let navigate = useNavigate();
    
    const [todos,setTodos]=useState([]);
    let nDone =[]
    nDone  = (todos.filter(todo => todo.status === "not done"))
    console.log(todos)   
   
    
    // const [nDone,setnDone] = useState([])
    //const [lstodos,setlsTodos]=useState(JSON.parse(localStorage.getItem('todos')));


    //To get the records
    useEffect(() => {
        const fetchTodos = async() => {
            const response = await api.get('/todos?_sort=sortPosition&_order=asc')
            setTodos(response.data)
           
            // localStorage.setItem('todos', JSON.stringify(allTodos));
         }
        fetchTodos()
    },[])

    
   

    //To delete the records
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

      const handleComplete = async (id,e) => {
        e.preventDefault()
        const response = await api.patch(`/todos/${id}`, {status:"done",sortPosition:0});
        setTodos(todos.map(todo => todo.id === id ? { ...response.data } : todo));
      }

      const patchtodos =  async(nDone) => 
      {
    //todos.map(async(todo) => await api.delete(`/todos/${todo.id}`))
         let i=1;
            for(let j=0;j<nDone.length;j++)
                {
                        todos.map(async(todo) => 
                        {   if(todo.id === nDone[j].id)
                            {
                                await api.patch(`/todos/${todo.id}`,{sortPosition:i++})
                            }
                        })
                }
          
        }
      
        
      const handleDragEnd = async(e) => {
          
          if(!e.destination) return
          let temptodos = [...nDone]
          let [selectedRow] = temptodos.splice(e.source.index,1)
          temptodos.splice(e.destination.index, 0 , selectedRow)
          nDone = temptodos
        //  console.log(nDone)
        //   const Done = (todos.filter(todo => todo.status === "done"))
        //   let newtodo = [...nDone , ...Done]
           patchtodos(nDone)
    }
    

    return (
               
               <div>
                   
                    {todos.length ? 
                        (
                            <>
                                <h2 style={{margin:'40px 600px'}}>  Todo App </h2>
                                <div className="tabDisplay ">
                                
                                    <DragDropContext onDragEnd={handleDragEnd}>
                                    <table className="table table-striped ">
                                        <thead>
                                            <tr>
                                            <th scope="col">id</th>
                                            <th scope="col">Title</th>
                                            <th scope="col">details</th>
                                            <th scope="col">date</th>
                                        
                                            </tr>
                                        </thead>
                                        
                                        <Droppable droppableId="droppable-1">
                                            {
                                                (provided) => (
                                                    <tbody ref={provided.innerRef} {...provided.droppableProps}  className="table-secondary">
                                                        {nDone.map((todo,index) =>   
                                                        <Fragment key={todo.id}> 
                                                            <Draggable draggableId={todo.id + ''} index={index} key={todo.id}>
                                                                {
                                                                    (provided) => (
                                                                        <tr {...provided.draggableProps} ref={provided.innerRef} {...provided.dragHandleProps}>
                                                                            <th scope="row">{index+1}</th>
                                                                            <td>{todo.title}</td>
                                                                            <td>{todo.details}</td>
                                                                            <td>{todo.date}</td>
                                                                            <td className="icons"> 
                                                                                <RiDeleteBin5Line size={20} style={{color:"red"}} onClick={()=>handleDelete(todo.id)}/> &nbsp;
                                                                                <AiFillCheckCircle size={20} style={{color:"green"}} onClick={(e)=>handleComplete(todo.id,e)} /> &nbsp;
                                                                                <FaEdit size={20} style={{color:"purple"}} onClick={()=>navigate(`/edittodo/${todo.id}`)}/>

                                                                            {/* using link  */}
                                                                                {/* <Link to={`/edittodo/${todo.id}`}>
                                                                                    <FaEdit size={20} style={{color:"purple"}}/>
                                                                                </Link> */}

                                                                            </td>

                                                                        </tr>
                                                                    )
                                                                }
                                                            </Draggable>
                                                            
                                                        </Fragment>)}    
                                                        {provided.placeholder}
                                                     </tbody> 
                                                )
                                               
                                            }
                                        </Droppable>
                                    </table>
                                    </DragDropContext>
                                    <button type="button" className="btn" onClick={()=>navigate('/form')}>Add</button>
                                    <CompletedTodo todos={todos} setTodos={setTodos}/>
                                </div>
                            </>
                        ) :
                        (
                            <div className="container">
                                <h1> Todo App </h1>
                                <img src={todoimg} alt="not found"></img>
                                <h2> A fresh start</h2>
                                <p>Anything to add?</p>
                                
                                <button type="button" onClick={()=> navigate('/form')}>Add Note</button>
                            </div>
                        )
                    }
                   
                </div>
       )
   
 }

export default Home
