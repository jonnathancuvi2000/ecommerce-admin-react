import React, { useEffect, useRef, useState } from 'react';
import '../styles/Topbar.css';
import { NotificationsNone, Language, Settings } from '@material-ui/icons';
import { useDispatch } from "react-redux";
import { deleteData_user } from '../redux/userRedux';
import { useNavigate } from 'react-router-dom';
import { Person } from "@material-ui/icons";
import DropdownItem from './DropdownItem';
// images 
// import user from '../img/user.png';
// import edit from '../img/edit.png';
// import settings from '../img/settings.png';
// import help from '../img/question.png';
import logout from '../img/log-out.png';
import { useSelector } from 'react-redux';


export default function Topbar() {
  const user = useSelector((state) => state.user.currentUser);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let menuRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(false);
      }

    }
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    }
  });

  // const handleClick = () => {
  //   dispatch(deleteData_user());
  //   navigate('/login');// we return to the login page
  // }

  const handleLongOut = () => {
    console.log('LongOut');
    dispatch(deleteData_user());
    navigate('/login');// we return to the login page
  }

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">AdminPanel</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBag">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBag">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>
          {/* <img onClick={handleClick} src="https://img.freepik.com/free-photo/happiness-wellbeing-confidence-concept-cheerful-attractive-african-american-woman-curly-haircut-cross-arms-chest-self-assured-powerful-pose-smiling-determined-wear-yellow-sweater_176420-35063.jpg?w=900&t=st=1668707055~exp=1668707655~hmac=2771af6697c7e479e528c7052692b3b2c74710ff70352ef40c470b95b72a768f" alt="" className="topAvatar" /> */}
          <div className="menu-container" ref={menuRef}>
            <div className="menu-trigger" onClick={() => { setOpen(!open) }}>
              <div className="icon-ui">
                <Person />
              </div>
            </div>
            <div className={`dropdwon-nemu ${open ? 'active' : 'inactive'}`}>
              <div className="menu-title">
                <h3 className='dropdwon-username'>{user.name} </h3>
                <h5 className='dropdwon-email'>{user.email} </h5>
              </div>
              <ul>
                <DropdownItem img={logout} text={"Logout"} click={handleLongOut} />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}
