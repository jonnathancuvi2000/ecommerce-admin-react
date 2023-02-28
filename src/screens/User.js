import '../styles/User.css';
import React, { useEffect, useState } from 'react';
import { Publish, CalendarToday, LocationSearching, MailOutline, PermIdentity, PhoneAndroid } from '@material-ui/icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Person } from "@material-ui/icons";
import { useDispatch, useSelector } from 'react-redux';
import { updagteUser } from '../redux/apiCalls';
// firebase
import { getStorage, ref, uploadBytesResumable, uploadBytes, getDownloadURL } from "firebase/storage";
import app from '../../src/firebase'



export default function User() {
    const location = useLocation();
    const userId = location.pathname.split('/')[2];
    const user = useSelector((state) => state.users.users.find(user => user._id === userId));
    const [userInfo, setUserInfo] = useState(null)
    const [file, setFile] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [previewImg, setPreviewImg] = useState()


    useEffect(() => {
        if (!file) {
            setPreviewImg(undefined)
            return
        }
        const objectUrl = URL.createObjectURL(file)
        setPreviewImg(objectUrl)
        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [file])



    const handleChange = (e) => {
        const value = e.target.value
        if (e.target.name === "name-lastname") {
            const name = value.split(' ')[0];
            const lastname = value.split(' ')[1];
            setUserInfo({
                ...userInfo,
                "name": name,
                "lastname": lastname
            })
        } else {
            setUserInfo({
                ...userInfo,
                [e.target.name]: value
            })
        }
    }

    const handleClik = (e) => {
        e.preventDefault();
        // only the user select a new image, it will save in FIREBASE storage
        if (file) {
            // this is he way how we get de image -> e.target.files[0]
            const fileName = new Date().getTime() + file.name; // we do this because in that way we do no have the sama name in the file, that is, "the name file will be unique"

            const storage = getStorage(app);
            const storageRef = ref(storage, `images/${fileName}`);
            // 'file' comes from the Blob or File API
            uploadBytes(storageRef, file).then((snapshot) => {
                console.log('File Upload!' + snapshot);
            }, (err) => {
                console.log(err)
            })
                .then(async () => {
                    const downloadURL = await getDownloadURL(storageRef); // getDownloadURL(ref(storage, 'images/stars.jpg'))
                    // console.log("File available t -> "+downloadURL)
                    const userSave = { ...userInfo, image: downloadURL, '_id': userId };
                    console.log("*****************************************88")
                    console.log(userSave)
                    // we send the data to teh database in node
                    try {
                        updagteUser(dispatch, userSave);
                        navigate('/users');
                    } catch (error) {
                        console.log(error)
                    }
                }).catch(err => {
                    console.log('there is an errro when your try to take de URL image! ' + err)
                });
        } else {
            const userSave = { ...userInfo, '_id': userId };
            try {
                updagteUser(dispatch, userSave);
                navigate('/users');
            } catch (error) {
                console.log(error)
            }
        }


    }

    return (
        <div className='user'>
            <div className="userTitleContainer">
                <h1 className="userTitle">Edit User</h1>
                <Link to="/newUser">
                    <button className="userAddButton">Create</button>
                </Link>
            </div>
            <div className="userContainer">
                <div className="userShow">
                    <div className="userShowTop">
                        {user.image
                            ? <img src={user.image} alt="" className="userShowImg" />
                            : <Person />
                        }
                        <div className="userShowTopTitle">
                            <span className="userShowUsername">{user.name + " " + user.lastname}</span>
                            <span className="userShowUserTitle">Software Engginer</span>
                        </div>
                    </div>
                    <div className="userShowBottom">
                        <span className="userShowTitle">Account Details</span>
                        <div className="userShowInfo">
                            <PermIdentity className='userShowIcon' />
                            <span className="userShowInfoTitle">{user.username}</span>
                        </div>
                        <div className="userShowInfo">
                            <CalendarToday className='userShowIcon' />
                            <span className="userShowInfoTitle">{user.dateBirth ? user.dateBirth : "*******"}</span>
                        </div>
                        <span className="userShowTitle">Contact Details</span>
                        <div className="userShowInfo">
                            <PhoneAndroid className='userShowIcon' />
                            <span className="userShowInfoTitle">{user.phone ? user.phone : "00000000"}</span>
                        </div>
                        <div className="userShowInfo">
                            <MailOutline className='userShowIcon' />
                            <span className="userShowInfoTitle">{user.email}</span>
                        </div>
                        <div className="userShowInfo">
                            <LocationSearching className='userShowIcon' />
                            <span className="userShowInfoTitle">{user.address ? user.address : "*******"}</span>
                        </div>
                    </div>
                </div>
                <div className="userUpdate">
                    <span className="userUpdateTitle">Edit</span>
                    <form className="userUpdateForm">
                        <div className="userUpdateLeft">
                            <div className="userUpdateItem">
                                <label>Username</label>
                                <input type="text" placeholder={user.username} className='userUpdateInput' name='username' onChange={(e) => handleChange(e)} />
                            </div>
                            <div className="userUpdateItem">
                                <label>Full Name</label>
                                <input type="text" placeholder={user.name + " " + user.lastname} className='userUpdateInput' name='name-lastname' onChange={(e) => handleChange(e)} />
                            </div>
                            <div className="userUpdateItem">
                                <label>Email</label>
                                <input type="text" placeholder={user.email} className='userUpdateInput' name='email' onChange={(e) => handleChange(e)} />
                            </div>
                            <div className="userUpdateItem">
                                <label>Phone</label>
                                <input type="text" placeholder={user.phone} className='userUpdateInput' name='phone' onChange={(e) => handleChange(e)} />
                            </div>
                            <div className="userUpdateItem">
                                <label>Address</label>
                                <input type="text" placeholder={user.address} className='userUpdateInput' name='address' onChange={(e) => handleChange(e)} />
                            </div>
                        </div>
                        <div className="userUpdateRight">
                            <div className="userUpdateUpload">
                                {user.image
                                    ? file
                                        ? <img className='userUpdateImg' src={previewImg} alt="" />
                                        : <img className='userUpdateImg' src={user.image} alt="" />
                                    : file
                                        ? <img className='userUpdateImg' src={previewImg} alt="" />
                                        : <div className="imageUser">
                                            <Person />
                                        </div>

                                }
                                <label htmlFor="file" className='userUpdateIcon'> <Publish /></label>
                                <input type="file" id='file' style={{ display: 'none' }} onChange={(e) => setFile(e.target.files[0])} />
                            </div>
                            <button onClick={handleClik} className="userUpdateButton">Update</button>
                        </div>
                    </form>
                </div>
            </div >
        </div >
    )
}
