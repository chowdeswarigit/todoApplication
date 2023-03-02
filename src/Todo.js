import { useReducer, useState } from "react";
// import { uuid } from "uuidv4";
// import { uuid } from "uuidv4";
const initialState = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) :[]

const todoProcess  = (state,action) =>{
    switch(action.type){
        case "add":
        const addtodos =  [
                ...state,
                action.payload
            ]
            localStorage.setItem("todos", JSON.stringify(addtodos))
        return addtodos
        case "remove":
            const remaingTodos  = state.filter((item)=> item.id !== action.payload)
            localStorage.setItem("todos",JSON.stringify(remaingTodos))
            console.log(remaingTodos)
            return remaingTodos
        
        case "completed":
            const modifiedTodos = state.map((item)=>{
                if(item.id===action.payload){
                    return {...item,completed:true}
                }
                return item
            })
            localStorage.setItem("todos", JSON.stringify(modifiedTodos))
            return modifiedTodos
        case "edit" : 
        const upadatedTodos = state.map((item)=>{
            if(item.id===action.payload.id){
                return {...action.payload,completed:false}
            }
            return item
        })
        localStorage.setItem("todos", JSON.stringify(upadatedTodos))
        return upadatedTodos

        case "deleteAll":
            localStorage.setItem("todos", JSON.stringify([]))
            return []
        default:
            return state
    }
}

const Todo  = () =>{
    const [todos,dispatch] = useReducer(todoProcess ,initialState)

    const [formData, setFormData] = useState({})
   
    const [action,setAction ] = useState("add")
    const [undo,undoAction] = useState(false)
    const[undoItem, setUndoItem] = useState({})
 
const handleInputs = (event) =>{
    setFormData({
        ...formData,
        [event.target.name]:event.target.value
        
    })
}
const handleSubmit  = (event) =>{
    event.preventDefault()
    if(action==="add"){
        console.log(formData.id)
    const data = {...formData ,id:3,completed:false}

        dispatch({type:"add",payload:data})
    }
    else{
        dispatch({type:"edit",payload:formData})
        setAction("add")
    }
    
}
const deleteTodo = (id) =>{
console.log(id)
const itemtoDelete = todos.find((item)=> item.id===id)
setUndoItem(itemtoDelete)
undoAction(true)
dispatch({type:"remove",payload:id})
}
const editTods = (id) =>{
console.log(id)
const findItem = todos.find((item)=> item.id === id) 
console.log(findItem)
setAction('edit')
setFormData(findItem)
}

const undoTodoItem = () =>{
    console.log(undoItem)
}
    return(
        <div >
            {todos.length}
            <h1>{action === "add" ? "Add todo" : "Edit Todo"}</h1>
            <div>
            <form onSubmit={handleSubmit}>
                <div style={{margin:"9px"}}>
                    <label>Title:</label>
                    <input type="text" onChange={handleInputs} name = "title" className="formcontrol"  value={formData.title} />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea  className="formcontrol" name="desc" value={formData.desc}  onChange={handleInputs}></textarea>
                </div>
                <div>
                     <input type="submit" value= {action==="add" ? "Add Todo" : "Update Todo"} />
                </div>
             </form>
            

            </div>
            <div>
                <h1>Todo Itmes</h1>
                {todos.length > 0 ? <div>
                    {
                        todos.map((item,index)=> <div className= {item.completed ? "tblock completed" :"tblock not-completed"} style={{border: "2px solid red"}}  key ={index}>
                            <h3>{item.title}</h3>
                            <p>{item.desc}</p>
                            <button onClick={ ()=> deleteTodo(item.id)}><i className="fa fa-trash" ></i></button>
                            <button onClick={()=>editTods(item.id)} disabled = {item.completed ? true:false}><i className="fa fa-pencil"></i></button>
                            <hr/>
                          <button onClick={() => dispatch({type:"completed" ,payload:item.id})} disabled = {item.completed ? true:false}>{item.completed ? "completed" : "Mark as Complted"}</button>
                          
                        </div>

                        )
                    }
                    <hr>
                    </hr>
                    <button onClick={()=>dispatch({type:"deleteAll"})} style={{backgroundColor:"#540047",color:"#ffffff",opacity:"0.7"}}>Delete All</button>
                   
                   {
                    undo ? <button onClick={undoTodoItem} >undo</button> : null
                   }
                </div> : "No items Found"}
                {
                    undo ? <button onClick={undoTodoItem} >undo</button> : null
                   }
            </div>
        </div>
    )
}
export default Todo