import { useState } from 'react'
import { MoreHorizontal } from 'react-feather';
import './Board.css';
import Card from '../Card/Card';
import Editable from '../Editable/Editable';
import Dropdown from '../Dropdown/Dropdown';
const Board = (props) => {
  const [showDropdown,setShowDropdown] = useState(false);
  return (
    <div className='board'>
        <div className="board_top">
            <p className="board_top_title">{props.board?.title} <span>{`${props.board?.cards?.length}`}</span></p>
            <div className="board_top_more" onClick={()=>setShowDropdown(!showDropdown)}>
             <MoreHorizontal/>
             {showDropdown &&
             <Dropdown
             onClose = {()=>setShowDropdown(false)}
             >
              <div className='board_dropdown'>
             <p onClick={()=>props.removeBoard(props.board?.id)}>Delete Board</p>
             </div>
             </Dropdown>
              }
            </div>
        </div>
        <div className="board_cards custom-scroll">
          {
            props.board?.cards?.map((card)=>(
              <Card key={card?.id} card={card}
              removeCard={props.removeCard} boardId={props.board?.id}
              handleDragEnd = {props.handleDragEnd}
              handleDragEnter = {props.handleDragEnter}
              updateCard = {props.updateCard}
              />
            ))
      }
            <Editable displayClass="board_cards_add" 
            text="Add Card"
            placeholder="Enter Card Title"
            onSubmit={(title)=>props.addCard(title,props.board?.id)}    
        />
        </div>
    </div>
  )
}

export default Board