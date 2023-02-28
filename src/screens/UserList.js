import '../styles/UserList.css';
import React, { useEffect, useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { DeleteOutline } from '@material-ui/icons';
import { UserRows } from '../dummyData';
import { Link } from "react-router-dom";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { userRequest } from '../requestMethods';
import { Person } from "@material-ui/icons";
import { getUsers } from '../redux/apiCalls';
import { useDispatch, useSelector } from 'react-redux';


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
                backgroundColor: "#2a2d3e",
                borderRadius: "5px"
            },
            '& .MuiTypography-root': {
                color: "white",
            },
        }
    })
);
export default function UserList() {

    const classes = useStyles();
    const [data, setData] = useState(UserRows);
    const dispatch = useDispatch();
    const usersAll = useSelector((state) => state.users.users);

    const handleDelete = (id) => {
        setData(data.filter((item) => item.id !== id));
    }

    useEffect(() => {
        getUsers(dispatch)
    }, [dispatch])

    const columns = [
        { field: '_id', headerName: 'ID', width: 90 },
        {
            field: 'user', headerName: 'Name', width: 200, renderCell: (params) => {
                return (
                    <div className='userListUser'>
                        {params.row.image 
                        ? <img className='userListImg' src={params.row.image} alt="" />
                        : <div className='userIcon'><Person/></div>
                        }
                        {params.row.name+"  "+params.row.lastname}

                    </div>
                )
            }
        },
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'username', headerName: 'User Name', width: 160 },
        { field: 'status', headerName: 'Status', width: 120,renderCell: (params) => {
            return (
                <div>
                    active
                </div>
            )
        } },
        {
            field: 'action', headerName: 'Action', width: 150, renderCell: (params) => {
                return (
                    // the <> is same like <div>
                    <>
                        <Link to={'/user/' + params.row._id}>
                            <button className='userListEdit'>Edit</button>
                        </Link>
                        <DeleteOutline className='userListDelete' onClick={() => handleDelete(params.row.id)} />
                    </>
                )
            }
        },
    ];

    return (
        <div className='userList'>
            <DataGrid
                className={classes.root}
                disableSelectionOnClick
                rows={usersAll ? usersAll : data} // I add this because it takes a time to get teh data from the data base, and trows an error until get the data 
                columns={columns}
                getRowId={(row) => row._id}
                pageSize={8}
                rowsPerPageOptions={[5]}
                checkboxSelection
            />
        </div>
    )
}
