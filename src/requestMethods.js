import axios from "axios";
// import { useSelector } from 'react-redux';
// local URL -> 'http://localhost:5000/api/'
const BASE_URL = 'https://ecommerce-api-node.onrender.com/api/'
let TOKEN = '';
if (localStorage.getItem("persist:root") !== null) {
    const user_info = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser;
    if (user_info) {
        TOKEN = user_info.accessToken;
    }
    console.log("Localstorage is NOOOOOOOOOOT EMPTY")

}else{
    console.log("Localstorage is EMPTY")
}

// // we get the acces toke, whe the user login
// // console.log(JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken);
console.log(TOKEN);

export const publicRequest = axios.create({
    baseURL: BASE_URL,
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: { token: `Berear ${TOKEN}` } // there was a mistake because there is "header" instead "headers"
});

export const userRequestPut = axios.create({
    baseURL: BASE_URL,
    headers: { token: `Berear ${TOKEN}` }
});