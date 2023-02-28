import '../styles/Product.css';
import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Chart from '../components/Chart';
import { ProductData } from '../dummyData';
import { Publish } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import { userRequest } from '../requestMethods';

export default function Product() {
    const location = useLocation();
    const productId = location.pathname.split('/')[2];
    const [pStatus, setPStatus] = useState([]);

    const product = useSelector((state) => state.product.products.find(product => product._id === productId));

    const MONTHS = useMemo(
        () => [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Agu",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ],
        []
    );


    useEffect(() => {
        // hora 2:44:43 -> https://www.youtube.com/watch?v=y66RgYMAgSo&t=8485s
        const getStats = async () => {
            try {
                const res = await userRequest.get('orders/income?pid=' + productId);
                const list = res.data.sort((a, b) => {
                    return a._id - b._id
                })
                list.map(item =>
                    setPStatus(prev => [
                        ...prev,
                        { name: MONTHS[item._id - 1], Sales: item.total }
                    ])
                );
            } catch (error) {
                console.log(error);
            }
        }
        getStats();
    }, [productId, MONTHS]);

    // console.log(pStatus)
    return (
        <div className='product'>
            <div className="productTitleContainer">
                <h1 className="productTitle">Product</h1>
                <Link to="/newproduct">
                    <button className="productAddButton">Create</button>
                </Link>
            </div>
            <div className="productTop">
                <div className="productTopLeft">
                    {/* it should be "pStatus" instead of "ProductData" but I did not change because there was no data in "pStatus" */}
                    <Chart data={ProductData} dataKey='Sales' title='Sales Performance' />
                </div>
                <div className="productTopRight">
                    <div className="productInfoTop">
                        <img src={product.img} alt="" className="productInfoImg" />
                        <span className="productName">{product.title}</span>
                    </div>
                    <div className="productInfoBottom">
                        <div className="productInfoItem">
                            <span className="productInfoKey">id:</span>
                            <span className="productInfoValue">{product._id}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Sales:</span>
                            <span className="productInfoValue">5123</span>
                        </div>
                        {/* <div className="productInfoItem">
                            <span className="productInfoKey">active:</span>
                            <span className="productInfoValue">123</span>
                        </div> */}
                        <div className="productInfoItem">
                            <span className="productInfoKey">in stock:</span>
                            <span className="productInfoValue">{product.inStock}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="productBottom">
                <form className="productForm">
                    <div className="productFormLeft">
                        <label>Product Name</label>
                        <input type="text" placeholder={product.title} />
                        <label>Description</label>
                        <input type="text" placeholder={product.desc} />
                        <label>Price</label>
                        <input type="text" placeholder={product.price} />
                        <label>In Stock</label>
                        <select name="inStock" id="inStock">
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                        {/* <label>Active</label>
                        <select name="active" id="active">
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select> */}
                    </div>
                    <div className="productFormRight">
                        <div className="productUpload">
                            <img src={product.img} alt="" className="productUploadImg" />
                            <label for="file" className='productFormRightIcon'>
                                <Publish />
                            </label>
                            <input type="file" id='file' style={{ display: "none" }} />
                        </div>
                        <button className="productButton">Update</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
