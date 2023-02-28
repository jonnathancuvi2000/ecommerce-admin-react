import '../styles/DropdownItem.css'
import {  ExitToApp } from "@material-ui/icons";



export default function DropdownItem(props) {
    return (
        <li className="dropdawonItem" onClick={props.click}>
            <div className='items'>
                <ExitToApp className='icon-exit'/>
                {/* <img src={props.img} /> */}
                <a >{props.text}</a>
            </div>
        </li >
    )
}