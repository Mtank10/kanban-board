import './Chip.css'
import { X } from 'react-feather'

const Chip = (props) => {
  return (
    <div className='chip' style={{backgroundColor:props.color}}>
        {props.text}
        {props.close 
        && 
        (<X  onClick={()=>props.onClose?props.onClose():""}/>)
      }
    </div>
  )
}

export default Chip