import { DataGrid, type GridColDef } from "@mui/x-data-grid";

function Customers() {

    const columns: GridColDef[] = [
        { field: "firstname", width: 150, headerName: "First name" },
        { field: "lastname", width: 150, headerName: "Last name" },
        { field: "email", width: 150, headerName: "Email" },
        { field: "phone", width: 150, headerName: "Phone" },
        { field: "address", width: 150, headerName: "Address" },
        { field: "postcode", width: 150, headerName: "Postcode" },
        { field: "city", width: 150, headerName: "City" },
    ]

    return (
        <div>
            <DataGrid
                //rows={}
                columns={columns}
            //getRowId={(row) => row.id}
            />
        </div>
    )
}

export default Customers;


// style={{ height: 400, width: '90%', margin: 'auto' }}