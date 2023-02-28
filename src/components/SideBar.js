import "../styles/SideBar.css";
import '../app.css'
import {
  LineStyle,
  Timeline,
  TrendingUp,

  ShoppingBasket,
  PermIdentity,
  Storefront,
  AttachMoney,
  LocalShipping,
  // MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
  MailOutline,
} from "@material-ui/icons";
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { deleteData_user } from '../redux/userRedux';
import { useNavigate } from 'react-router-dom';

export default function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleLongOut = () => {
    dispatch(deleteData_user());
    navigate('/login');// we return to the login page
  }
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to='/' className="link">
              {/* en li an tes estaba "active" */}
              <li className="sidebarListItem ">
                <LineStyle className="sidebarIcon" />
                Home
              </li>
            </Link>
            <Link to='/analitics' className="link">
              <li className="sidebarListItem">
                <Timeline className="sidebarIcon" />
                Analytics
              </li>
            </Link>

            {/* <li className="sidebarListItem">
              <TrendingUp className="sidebarIcon" />
              Sales
            </li> */}
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link to='/users' className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Users
              </li>
            </Link>
            <Link to='/products' className="link">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                Products
              </li>
            </Link>
            <Link to='/orders' className="link">
              <li className="sidebarListItem">
                <ShoppingBasket className="sidebarIcon" />
                Orders
              </li>
            </Link>
            <Link to='/delivery' className="link">
              <li className="sidebarListItem">
                <LocalShipping className="sidebarIcon" />
                Delivery
              </li>
            </Link>

          </ul>
        </div>
        {/* <div className="sidebarMenu">
          <h3 className="sidebarTitle">Notifications</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <MailOutline className="sidebarIcon" />
              Mail
            </li>
            <li className="sidebarListItem">
              <DynamicFeed className="sidebarIcon" />
              Feedback
            </li>
            <li className="sidebarListItem">
              <ChatBubbleOutline className="sidebarIcon" />
              Messages
            </li>
          </ul>
        </div> */}
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Staff</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <WorkOutline className="sidebarIcon" />
              Manage
            </li>
            <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Analytics
            </li>
            <li className="sidebarListItem">
              <Report className="sidebarIcon" />
              Reports
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">User</h3>
          <ul className="sidebarList">
            <li onClick={handleLongOut} className="sidebarListItem">
              <MailOutline className="sidebarIcon" />
              Logout
            </li>

          </ul>
        </div>
      </div>
    </div>
  );
}