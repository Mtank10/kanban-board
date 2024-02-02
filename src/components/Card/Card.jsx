import { useState } from 'react'
import './Card.css'
import Chip from '../Chip/Chip'
import { CheckSquare, Clock, MoreHorizontal } from 'react-feather'
import Dropdown from '../Dropdown/Dropdown'
import CardInfo from './CardInfo/CardInfo'
const Card = (props) => {
  const [showDropdown,setShowDropdown] = useState(false);
  const [showModal,setShowModal] = useState(false);
  return (
    <div className="card" draggable
     onDragEnd={()=>props.handleDragEnd(props.card?.id,props.boardId)}
     onDragEnter={()=>props.handleDragEnter(props.card?.id,props.boardId)}
     onClick={()=>setShowModal(!showModal)}
    >
      {showModal && (
          <CardInfo 
          onClose={()=>setShowModal(false)}
          card={props.card}
          boardId={props.boardId}
          updateCard = {props.updateCard}
          />  
      )}
      
        <div className="card_top">
          <div className="card_top_labels">
            {props.card?.labels?.map((label,index)=>(
              <Chip key={index} text={label.text} color={label.color}/>
            ))}
          </div>

          <div className="card_top_more" onClick={()=>setShowDropdown(!showDropdown)}>
             <MoreHorizontal/>
             {showDropdown && (
             <Dropdown
             onClose = {()=>setShowDropdown(false)}
             >
              <div className='card_dropdown'>
             <p onClick={()=>props.removeCard(props.card?.id,props.boardId)}>Delete Card</p>
             </div>
             </Dropdown>
              )}
              </div>
        </div>
        <div className="card_title">
          {props.card?.title}
        </div>
        <div className="card_footer">
          {props.card?.date && 
           <p><Clock/>{props.card?.date}</p>
          }
          {
            props.card?.tasks?.length>0 &&
          <p><CheckSquare/>{props.card?.tasks?.filter(item=>
            item.completed
            ).length}/{props.card?.tasks?.length}</p>
          }
        </div>
    </div>
  )
}

export default Card