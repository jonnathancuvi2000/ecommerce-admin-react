import '../styles/DeliveryList.css';

import { DataGrid } from '@material-ui/data-grid';
import React, { useEffect, useState } from 'react'
import { createStyles, makeStyles } from "@material-ui/core/styles";
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

export default function DeliveryList() {
    const classes = useStyles();
    const [buys,setBuys] = useState([])

    useEffect(() => {
        const getOrders = async () => {
            try {
                const res = await  userRequest.get("/buys");
                setBuys(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        getOrders()
    }, [])


    const columns = [
        { field: '_id', headerName: 'ID', width: 160 },
        { field: 'userId', headerName: 'User Id', width: 160 },
        { field: 'paymet', headerName: 'Paymet', width: 160 },
        { field: 'totalPrice', headerName: 'Total Price', width: 160, renderCell: (params) => {
            return (
                <div >
                    {params.row.cartInfo.totalPrice}
                </div>
            )
        } },
        { field: 'shippingInfo', headerName: 'Shipping Info', width: 220, renderCell: (params) => {
            return (
                <div >
                    {params.row.shippingInfo.address+", "+params.row.shippingInfo.city+", "+params.row.shippingInfo.country}
                </div>
            )
        } },

    ];
    return (
        <div className='productList'>
            {/* <div className="title">Orders</div> */}
            <DataGrid
                className={classes.root}
                disableSelectionOnClick
                rows={buys}
                columns={columns}
                getRowId={(row) => row._id}
                pageSize={8}
                rowsPerPageOptions={[5]}
                checkboxSelection
            />
        </div>
    )
}
