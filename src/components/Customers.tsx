import { DataGrid, type GridColDef, type GridRenderCellParams } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { deleteCustomer, getCustomers } from "../customerApi";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditCustomer from "./EditCustomer";
import AddCustomer from "./AddCustomer";
import AddTraining from "./AddTraining";
import type { TrainingSessionForm } from "../types";
import { saveTraining } from "../trainingApi";

function Customers() {

    const [customers, setCustomers] = useState([]);

    // useEffect(() => {
    //     fetch("https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers")
    //         .then(response => response.json())
    //         .then(data => setCustomers(data._embedded.customers))
    // }, []);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = () => {
        getCustomers()
            .then(data => setCustomers(data._embedded.customers))
            .catch(err => console.error(err))
    }

    const handleDelete = (url: string) => {
        if (window.confirm("Are you sure you want to delete this customer?")) {
            deleteCustomer(url)
                .then(() => fetchCustomers())
                .catch(err => console.error(err))
        }
    }

    const handleSaveTraining = (training: TrainingSessionForm) => {
        return saveTraining(training)
            .then(() => {
                alert("Training added successfully!")
            })
            .catch(err => console.error(err))
    };

    console.log(customers);

    const columns: GridColDef[] = [
        {
            headerName: "Actions",
            width: 230,
            sortable: false,
            filterable: false,
            field: '_links.self.href',
            renderCell: (params: GridRenderCellParams) => {
                return (
                    <>
                        <IconButton
                            size="small"
                            sx={{ m: 1 }}
                            onClick={() => handleDelete(params.id as string)}
                        >
                            <DeleteIcon />
                        </IconButton>
                        <EditCustomer
                            customerRow={params.row}
                            fetchCustomers={fetchCustomers}
                        />
                        <AddTraining
                            handleSaveTraining={handleSaveTraining}
                            customerUrl={params.row._links.self.href}
                        />
                    </>
                );
            }
        },

        { field: "firstname", headerName: "First name" },
        { field: "lastname", headerName: "Last name" },
        { field: "email", width: 180, headerName: "Email" },
        { field: "phone", width: 160, headerName: "Phone" },
        { field: "streetaddress", width: 170, headerName: "Address" },
        { field: "postcode", headerName: "Postcode" },
        { field: "city", headerName: "City" },
    ];

    return (
        <>
            <div style={{ height: 700, margin: 'auto', textAlign: 'right' }}>
                <AddCustomer fetchCustomers={fetchCustomers} />
                <DataGrid
                    rows={customers}
                    columns={columns}
                    getRowId={(row) => row._links.self.href}
                    showToolbar
                    sx={{
                        boxShadow: 2,
                    }}
                />
            </div >
        </>
    )
}

export default Customers;


// style={{ height: 400, width: '90%', margin: 'auto' }}