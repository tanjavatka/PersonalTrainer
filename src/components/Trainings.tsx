import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

function Trainings() {
    const [trainings, setTrainings] = useState([]);

    useEffect(() => {
        fetch("https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings")
            .then(response => response.json())
            .then(data => setTrainings(data._embedded.trainings))
    }, []);

    console.log(trainings);

    const formatDate = (dateString: string) => {
        return dayjs(dateString).format("DD.MM.YYYY HH:mm");
    };

    const columns: GridColDef[] = [
        { field: "activity", width: 200, headerName: "Activity" },
        { field: "date", width: 200, headerName: "Date", valueFormatter: ({ value }) => formatDate(value) },
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