import '../styles/NewProduct.css'
import React, { useState } from 'react'
import { getStorage, ref, uploadBytesResumable, uploadBytes, getDownloadURL } from "firebase/storage";
import app from '../../src/firebase'
import { addProduct } from '../redux/apiCalls';
import { useDispatch } from 'react-redux';
export default function NewProduct() {
    const [inputs, setInputs] = useState({});
    const [file, setFile] = useState(null);
    const [cat, setCat] = useState([]);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        // the both down are do the same ting
        // setInputs(previo => { return { ...previo, [e.target.name]: e.target.value } });
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    }
    const handleCat = (e) => {
        // whit thsi we saparate the data by "comma => ," and add it to cat 
        setCat(e.target.value.split(','));
    }

    // console.log(inputs);
    // console.log(cat);
    // console.log(file)

    const handleClik = (e) => {
        e.preventDefault();
        // this is he way how we get de image -> e.target.files[0]
        const fileName = new Date().getTime() + file.name; // we do this because in that way we do no have the sama name in the file, that is, "the name file will be unique"
        // console.log(fileName);
        // Create a root reference
        // Create a root reference
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
                const product = { ...inputs, img: downloadURL, categories: cat };
                // we send the data to teh database in node
                addProduct(dispatch, product);
            }).catch(err => {
                console.log('there is an errro when your try to take de URL image! ' + err)
            });

    }

    return (
        <div className='newProduct'>
            <h1 className="addProductTitle">New Product</h1>
            <form className="addProductForm">
                <div className="addProductItem">
                    <label>Image</label>
                    <input type="file" id="file" onChange={(e) => setFile(e.target.files[0])} />
                </div>
                <div className="addProductItem">
                    <label>Title</label>
                    <input className='input-text' name='title' type="text" placeholder="Apple Airpods" onChange={handleChange} />
                </div>
                <div className="addProductItem">
                    <label>Description</label>
                    <input className='input-text' name='desc' type="text" placeholder="description...." onChange={handleChange} />
                </div>
                <div className="addProductItem">
                    <label>Price</label>
                    <input className='input-text' name='price' type="text" placeholder="100" onChange={handleChange} />
                </div>
                <div className="addProductItem">
                    <label>Categories</label>
                    <input className='input-text' type="text" placeholder="jaens, skirts" onChange={handleCat} />
                </div>
                <div className="addProductItem">
                    <label>Stock</label>
                    <select name='inStock' onChange={handleChange}>
                        <option value="true">true</option>
                        <option value="false">false</option>
                    </select>
                </div>
                {/* <div className="addProductItem">
                    <label>Active</label>
                    <select name="active" id="active">
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </div> */}
                <button onClick={handleClik} className="addProductButton">Create</button>
            </form>
        </div>
    )
}
