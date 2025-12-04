import { DataGrid, type GridColDef, type GridRenderCellParams } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteTraining, getTrainings } from "../trainingapi";


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

    // useEffect(() => {
    //     fetchTrainings();
    // }, []);

    const fetchTrainings = () => {
        getTrainings()
            .then(data => setTrainings(data._embedded.trainings))
            .catch(err => console.error(err))
    }

    const handleDelete = (url: string) => {
        if (window.confirm("Are you sure?")) {
            deleteTraining(url)
                .then(() => fetchTrainings())
                .catch(error => console.error(error))
        }
    }

    const columns: GridColDef[] = [
        {
            //field: 'actions', width: 100,
            headerName: "Actions",
            sortable: false,
            filterable: false,
            field: '_links.self.href',
            renderCell: (params: GridRenderCellParams) =>
                <IconButton size="small" onClick={() => handleDelete(params.row.id as string)}>
                    <DeleteIcon />
                </IconButton>
        },
        { field: "activity", width: 200, headerName: "Activity" },
        { field: "date", width: 200, headerName: "Date", valueFormatter: ({ value }) => formatDate(value) },
        { field: "duration", headerName: "Duration" },
        { field: "customer", width: 200, headerName: "Customer" },

    ]

    return (

        <div style={{ height: 600, width: '95%', margin: 'auto' }}>
            <DataGrid
                rows={trainings}
                columns={columns}
                getRowId={row => row._links.self.href}
                autoPageSize
                rowSelection={false}
            />
        </div>

    )
}

export default Trainings;


// tulosta csv nappula ohjeet
// https://mui.com/x/react-data-grid/column-visibility/
// https://mui.com/x/react-data-grid/export/
// https://mui.com/x/react-data-grid/components/export/