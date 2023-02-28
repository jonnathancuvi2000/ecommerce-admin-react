import SideBar from "./components/SideBar";
import Topbar from "./components/Topbar";
import './app.css'
import Home from "./screens/Home";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import UserList from "./screens/UserList";
import User from "./screens/User";
import NewUser from "./screens/NewUser";
import ProductList from "./screens/ProductList";
import Product from "./screens/Product";
import NewProduct from "./screens/NewProduct";
import Login from "./screens/Login";
import { useSelector } from 'react-redux';
import Register from "./screens/Register";
import Analitics from "./screens/Analitics";
import OrdersList from "./screens/OrdersList";
import DeliveryList from "./screens/DeliveryList";
// import { useState } from "react";

function App() {
  // const [isAdmin, setIsAdmin] = useState(false);
  // we can chack if there is a user logeon
  const user = useSelector((state) => state.user.currentUser);
  // const user_info = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser;
  // if (user_info) {
  //   const admin = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.isAdmin;
  //   setIsAdmin(admin);
  // }
  return (
    <Router>
      {user && <> <Topbar /> </>}
      <div className="container">
        {user && <> <SideBar /> </>}
        <Routes>
          <Route exact path="/" element={
            user
              ? <Home />
              : <Login />} />
          <Route exact path="/analitics" element={
            user
              ? <Analitics />
              : <Login />} />
          <Route exact path="/orders" element={
            user
              ? <OrdersList />
              : <Login />} />
          <Route exact path="/delivery" element={
            user
              ? <DeliveryList />
              : <Login />} />
          <Route exact path="/users" element={
            user
              ? <UserList />
              : <Login />} />
          <Route exact path="/user/:userId" element={
            user
              ? <User />
              : <Login />} />
          <Route exact path="/newUser" element={
            user
              ? <NewUser />
              : <Login />} />
          <Route exact path="/products" element={
            user
              ? <ProductList />
              : <Login />} />
          <Route exact path="/product/:productId" element={
            user
              ? <Product />
              : <Login />} />
          <Route exact path="/newproduct" element={
            user
              ? <NewProduct />
              : <Login />} />
          <Route path='/login' element={
            user
              ? <Navigate to='/' />
              : <Login />
          } />
          <Route path='/register' element={
            user
              ? <Navigate to='/' />
              : <Register />
          } />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
