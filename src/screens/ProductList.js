import '../styles/ProductList.css';
import React, { useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { DeleteOutline } from '@material-ui/icons';
// import { ProductRows } from '../dummyData';
import { Link } from "react-router-dom";
import { deleteProduct, getProducts } from '../redux/apiCalls';
import { useDispatch, useSelector } from 'react-redux';
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            '& div[tabindex]': {
                color: "white",

            },
            '& .MuiButtonBase-root': {
                color: "white",

            },
            '& .MuiDataGrid-columnHeaderWrapper': {
                // color: "white",
                backgroundColor: "#2a2d3e",
                borderRadius: "5px"
            },
            '& .MuiTypography-root': {
                color: "white",
            },
        }
    })
);

export default function ProductList() {
    const classes = useStyles();
    // const [data, setData] = useState(ProductRows);
    const dispatch = useDispatch();
    const products = useSelector((state) => state.product.products);
    console.log(products);

    useEffect(() => {
        getProducts(dispatch);
    }, [dispatch])

    const handleDelete = (id) => {
        // setData(data.filter((item) => item.id !== id));
        deleteProduct(dispatch, id);
    }

    const columns = [
        { field: '_id', headerName: 'ID', width: 220 },
        {
            field: 'product', headerName: 'Product', width: 200, renderCell: (params) => {
                return (
                    <div className='productListItem'>
                        <img className='productListImg' src={params.row.img} alt="" />
                        {params.row.title}
                    </div>
                )
            }
        },
        { field: 'inStock', headerName: 'Stock', width: 200 },
        // { field: 'status', headerName: 'Status', width: 120 },
        { field: 'price', headerName: 'Price', width: 160 },
        {
            field: 'action', headerName: 'Action', width: 150, renderCell: (params) => {
                return (
                    // the <> is same like <div>
                    <>
                        <Link to={'/product/' + params.row._id}>
                            <button className='productListEdit'>Edit</button>
                        </Link>
                        <DeleteOutline className='productListDelete' onClick={() => handleDelete(params.row._id)} />
                    </>
                )
            }
        },
    ];
    return (
        <div className='productList'>
            <DataGrid
                className={classes.root}
                disableSelectionOnClick
                rows={products}
                columns={columns}
                getRowId={(row) => row._id}
                pageSize={8}
                rowsPerPageOptions={[5]}
                checkboxSelection
            />
        </div>
    )
}

