import React,{ useState } from 'react'
import axios from 'axios'
import EditTask from './EditTask'

const TaskItem = (props) =>{

    const [toggle,setToggle] = useState(false)

    const { id,title,status ,removeItem, editItem } = props

    const handleToggle = () =>{
        const result = !toggle
        setToggle(result)
    }

    const handleRemove = () =>{
        // console.log('handle remove', id)
        const confirmRemove = window.confirm('Are you sure?')
        if(confirmRemove){
            axios.delete(`http://localhost:3033/api/tasks/${id}`)
                .then((response)=>{
                    const result = response.data
                    // console.log(result)
                    removeItem(result.id)
                })
                .catch((err)=>{
                    alert(err.message)
                })
        }
    }

   

    return(
        <div>
            {
                toggle ? (
                    <div>
                        <EditTask 
                            id={id}
                            title={title}
                            status={status}
                            editItem={editItem}
                            handleToggle={handleToggle}
                        />
                        <button onClick={handleToggle}> cancel </button>
                    </div>
                ):(
                    <div>
                        <h3>{ title }</h3>
                        <button onClick={handleToggle}>edit</button>
                        <button onClick={handleRemove}>remove</button>
                    </div>
                )
            }
            
        </div>
    )

}

export default TaskItem

/* when u clear the db goto tasks-fs folder and then goto data.json then delete all things present
where and put []

*/