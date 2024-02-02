import { useEffect, useState } from 'react';
import './App.css';
import Board from './components/Board/Board';
import Editable from './components/Editable/Editable';
const App = () => {

  const [target,setTarget] = useState({
    cid:"",
    bid:""
  });
  const [boards,setBoards] = useState(JSON.parse(localStorage.getItem("boards")) ||[]);

  const addCard = (title,bid)=>{
    const card = {
      id:Date.now()+Math.random()*2,
      title,
      labels:[],
      tasks:[],
      desc:"",
      date:"",
    };
    const index = boards.findIndex((board)=>board.id===bid);
    if(index<0) return;

    const newBoards = [...boards];
    newBoards[index].cards.push(card);
    setBoards(newBoards);

  }
  const removeCard = (cid, bid)=>{
    const bindex = boards.findIndex((board)=>board.id===bid);
    if(bindex<0) return;

    const cindex = boards[bindex].cards.findIndex((card)=>card.id===cid);
    if(cindex<0) return;

    const newBoards = [...boards];
    newBoards[bindex].cards.splice(cindex,1);
    setBoards(newBoards);
  }
  const addBoard = (title)=>{
    setBoards([...boards,{
      id:Date.now()+Math.random()*2,
      title,
      cards:[],
    }])
  }
  const removeBoard = (bid)=>{
    const index = boards.findIndex((board)=>board.id===bid);
    if(index<0) return;
    const newBoards = [...boards];
    newBoards.splice(index,1);
    setBoards(newBoards);
  }

  const handleDragEnter = (cid,bid)=>{
    setTarget({
      cid,
      bid
    });
  }
  const handleDragEnd = (cid,bid)=>{
     let s_bIndex,s_cIndex,t_bIndex,t_cIndex;
     s_bIndex = boards.findIndex((board)=>board.id===bid);
     if(s_bIndex<0) return;
     s_cIndex = boards[s_bIndex].cards.findIndex((card)=>card?.id===cid);
     if(s_cIndex<0) return;
     t_bIndex = boards.findIndex((board)=>board.id===target.bid);
     if(t_bIndex<0) return;
     t_cIndex = boards[t_bIndex].cards.findIndex((card)=>card?.id===target.cid);
     if(t_cIndex<0) return;
     const newBoards = [...boards];
     newBoards[s_bIndex].cards.splice(s_cIndex,1);
     newBoards[t_bIndex].cards.splice(t_cIndex,0,boards[s_bIndex].cards[s_cIndex]);
     setBoards(newBoards);

  }

  const updateCard = (cid,bid,card)=>{
    const bindex = boards.findIndex((board)=>board.id===bid);
    if(bindex<0) return;

    const cindex = boards[bindex].cards.findIndex((card)=>card?.id===cid);
    if(cindex<0) return;
    const tempBoards = [...boards];
    tempBoards[bindex].cards[cindex]=card;
    setBoards(tempBoards);
  }

  useEffect(()=>{
     localStorage.setItem("boards",JSON.stringify(boards));
  },[boards])

  return (
    <div className='app'>
      <div className="app_navbar">
        <h2>Kanban Board</h2>
      </div>
      <div className="app_outer">
        <div className="app_boards">
          {boards.map((board)=>(
            <Board key={board.id} board={board} 
            removeBoard={(id)=>removeBoard(id)}
            addCard={addCard}
            removeCard={removeCard}
            handleDragEnter={handleDragEnter}
            handleDragEnd={handleDragEnd}
            updateCard={updateCard}
            />
          ))}
          <div className="app_boards_board">
          <Editable
          displayClass="app_boards_board_add"
          text="Add Board"
          placeholder="Enter board title"
          onSubmit={(value)=>
            addBoard(value)}
          />  
          </div>
        </div>
      </div>

    </div>
  )
}

export default App