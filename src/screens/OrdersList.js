import '../styles/OrdersList.css';

import { DataGrid } from '@material-ui/data-grid';
import React, { useEffect, useState } from 'react'
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from 'react-redux';
import { userRequest } from '../requestMethods';

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

export default function OrdersList() {
    const classes = useStyles();
    const [orders,setOrders] = useState([])

    useEffect(() => {
        const getOrders = async () => {
            try {
                const res = await  userRequest.get("/orders");
                setOrders(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        getOrders()
    }, [])


    const columns = [
        { field: '_id', headerName: 'ID', width: 220 },
        { field: 'userId', headerName: 'User Id', width: 160 },
        { field: 'address', headerName: 'Address', width: 200 },
        { field: 'amount', headerName: 'Amount', width: 160 },
        { field: 'status', headerName: 'status', width: 160 },

    ];
    return (
        <div className='productList'>
            {/* <div className="title">Orders</div> */}
            <DataGrid
                className={classes.root}
                disableSelectionOnClick
                rows={orders}
                columns={columns}
                getRowId={(row) => row._id}
                pageSize={8}
                rowsPerPageOptions={[5]}
                checkboxSelection
            />
        </div>
    )
}
