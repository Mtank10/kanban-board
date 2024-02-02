import { useEffect, useState } from 'react'
import Modal from '../../Modal/modal'
import './CardInfo.css'
import { Calendar, CheckSquare, List, Tag, Trash, Type } from 'react-feather'
import Editable from '../../Editable/Editable'
import Chip from '../../Chip/Chip'
const CardInfo = (props) => {
  const colors=[
    "#a8193d",
    "#4fcc25",
    "#1ebffa",
    "#8da377",
    "#9975bd",
    "#cf61a1",
    "#240959"
  ]
  const [activeColor,setActiveColor] = useState("");



  const [values,setValues] = useState({...props.card})

  const calculatePercent=()=>{
    if(values.tasks?.length === 0) return "0"
    const completed = values.tasks?.filter(item=>
        item.completed)?.length;

        return (completed/values.tasks?.length)*100+""
  };

  useEffect(()=>{
     props.updateCard(props.card?.id,props.boardId,values)    
  },[values])

  const addLabels=(value,color)=>{
    const index = values.labels?.findIndex((item)=>item.text===value);
    if(index>-1)return;
    const labels = {
      text:value,
      color
    };
    setValues({...values,labels:[...values.labels,labels]})
    setActiveColor("");
  }

  const removeLabel=(text)=>{
    const tempLabels = values.labels?.filter((item)=>item.text!==text);
    setValues({...values,labels:tempLabels});
  }
   const addTask = (value)=>{
    const task={
      title:value,
      completed:false
    }
    setValues({...values,tasks:[...values.tasks,task]})
   }
   const removeTask=(id)=>{
     const index = values.tasks?.findIndex((item)=>item.id===id);
     if(index<0) return;
     const tempTasks=values.tasks?.splice(index,1);
     setValues({...values,tasks:tempTasks})
   }
   
   const updateTask = (id,completed)=>{
     const index = values.tasks?.findIndex((item)=>item.id===id);
     if(index<0) return;
     const tempTasks=[...values.tasks];
     tempTasks[index].completed=completed;
     setValues({...values,tasks:tempTasks})
   }

  return (
        <Modal onClose={()=>props.onClose()}>
            <div className="cardinfo">
                <div className="cardinfo_box">
                    <div className="cardinfo_box_title">
                      <Type/>
                      Title No 1
                    </div>
                    <div className='cardinfo_box_body'>
                    <Editable
                    text={values.title}
                    default={values.title}
                    placeholder="Enter title"
                    buttonText="Set Title"
                    onSubmit={(text)=>setValues({...values,title:text})}
                    />
                    </div>
                </div>
                <div className="cardinfo_box">
                    <div className="cardinfo_box_title">
                      <List/>
                       Description
                    </div>
                    <div className='cardinfo_box_body'>
                    <Editable
                    text={values.desc}
                    default={values.desc}
                    placeholder="Enter Description"
                    buttonText="Add Description"
                    onSubmit={(text)=>setValues({...values,desc:text})}
                    />
                    </div>
                </div>
                <div className="cardinfo_box">
                    <div className="cardinfo_box_title">
                      <Calendar/>
                      Date
                    </div>
                    <div className='cardinfo_box_body'>
                    <input type='date' 
                    defaultValue={values.date ? new Date(values.date).toISOString().substr(0.10):""}
                    onChange={(event)=>{
                      setValues({...values,date:event.target.value})
                    }}
                    />  
                    </div>
                </div>
                <div className="cardinfo_box">
                    <div className="cardinfo_box_title">
                      <Tag/>
                      Labels
                    </div>
                    <div className="cardInfo_box_labels">
                        {
                            values.labels?.map((label,index)=>(
                                <Chip
                                close
                                onClose = {()=>removeLabel(label.text)}
                                key={label.text+index} 
                                text={label.text} 
                                color={label.color}          
                                />
                            ))
                        }
                    </div>
                    <div className='cardinfo_box_color'>
                      {
                        colors.map((color,index)=>(
                          <li key={index} style={{backgroundColor:color}} 
                          className={activeColor===color?"active":""}
                          onClick={()=>setActiveColor(color)}
                          >

                          </li>
                        ))
                      }
                    </div>
                    <div className='cardinfo_box_body'>
                    <Editable
                    text={"Add label"}
                    placeholder="Enter label"
                    buttonText="AddLabel"
                     onSubmit={(text)=>addLabels(text,activeColor)}
                    />
                    </div>
                </div>
                <div className="cardinfo_box">
                    <div className="cardinfo_box_title">
                        <CheckSquare/>
                        Task
                    </div>
                    <div className='cardinfo_box_progress-bar'>
                      <div className={`cardinfo_box_progress`}
                       style={{width:calculatePercent()+"%",
                      backgroundColor:calculatePercent()=="100"?
                      "limegreen":""}
                      }
                      />
                    </div>
                    <div className="cardinfo_box_list">
                        {values.tasks?.map((task)=>(
                           <div key={task.id} className="cardinfo_task">
                           <input 
                           type="checkbox"
                           defaultChecked={task.completed}
                           onChange={(event)=>updateTask(task.id,event.target.checked)}
                           />
                           <p>{task.text}</p>
                           <Trash
                           onClick={()=>removeTask(task.id)}
                           />
                       </div>    
                        ))}
                        
                    </div>

                    <div className="cardinfo_box_body">
                        <Editable
                        text={"Add new task"}
                        placeholder="Enter task"
                        buttonText="Add Task"
                        onSubmit={(text)=>addTask(text)}
                        />
                    </div>
                </div>
            </div>
        </Modal>
  )
}

export default CardInfo