import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

function Customers() {

    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        fetch("https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers")
            .then(response => response.json())
            .then(data => setCustomers(data._embedded.customers))
    }, []);

    console.log(customers);

    const columns: GridColDef[] = [
        { field: "firstname", width: 130, headerName: "First name" },
        { field: "lastname", width: 130, headerName: "Last name" },
        { field: "email", width: 200, headerName: "Email" },
        { field: "phone", width: 150, headerName: "Phone" },
        { field: "streetaddress", width: 200, headerName: "Address" },
        { field: "postcode", width: 100, headerName: "Postcode" },
        { field: "city", width: 120, headerName: "City" },
    ]

    return (
        <div style={{ height: 600, width: '95%', margin: 'auto' }}>
            <DataGrid
                rows={customers}
                columns={columns}
                getRowId={(row) => row._links.self.href}
            />
        </div>
    )
}

export default Customers;


// style={{ height: 400, width: '90%', margin: 'auto' }}