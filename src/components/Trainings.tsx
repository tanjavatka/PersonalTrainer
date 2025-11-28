import { DataGrid, type GridColDef } from "@mui/x-data-grid";

function Trainings() {

    const columns: GridColDef[] = [
        { field: "activity", width: 200, headerName: "Activity" },
        { field: "date", width: 200, headerName: "Date" },
        { field: "duration", headerName: "Duration" },
        { field: "customer", width: 200, headerName: "Customer" },

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

export default Trainings;