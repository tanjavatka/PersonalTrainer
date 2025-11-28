import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

function Trainings() {
    const [trainings, setTrainings] = useState([]);

    useEffect(() => {
        fetch("https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings")
            .then(response => response.json())
            .then(data => setTrainings(data._embedded.trainings))
    }, []);

    console.log(trainings);

    const columns: GridColDef[] = [
        { field: "activity", width: 200, headerName: "Activity" },
        { field: "date", width: 200, headerName: "Date" },
        { field: "duration", headerName: "Duration" },
        { field: "customer", width: 200, headerName: "Customer" },

    ]

    return (
        <div>
            <DataGrid
                rows={trainings}
                columns={columns}
                getRowId={(row) => row._links.self.href}
            />
        </div>
    )
}

export default Trainings;