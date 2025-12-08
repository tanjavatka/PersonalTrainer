import { DataGrid, type GridColDef, type GridRenderCellParams } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteTraining, getTrainingsWithCustomers } from "../trainingApi";
import type { TrainingSession } from "../types";


type TrainingWithCustomer = TrainingSession & {
    customer?: {
        firstname: string;
        lastname: string;
    };
};

function Trainings() {
    const [trainings, setTrainings] = useState<TrainingWithCustomer[]>([]);

    // useEffect(() => {
    //     fetch("https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings")
    //         .then(response => response.json())
    //         .then(data => setTrainings(data._embedded.trainings))
    // }, []);



    // const formatDate = (dateString: string) => {
    //     return dayjs(dateString).format("DD.MM.YYYY HH:mm");
    // };

    useEffect(() => {
        fetchTrainings();
    }, []);

    console.log(trainings);

    const fetchTrainings = async () => {
        try {
            const data = await getTrainingsWithCustomers();
            console.log("TRAININGS WITH CUSTOMERS:", data);
            setTrainings(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = (url: string) => {
        if (window.confirm("Are you sure you want to delete this training?")) {
            deleteTraining(url)
                .then(() => fetchTrainings())
                .catch(error => console.error(error))
        }
    }

    const columns: GridColDef[] = [
        {
            field: 'actions', width: 100,
            headerName: "Actions",
            sortable: false,
            filterable: false,
            //field: '_links.self.href',
            renderCell: (params: GridRenderCellParams) =>
                <IconButton
                    size="small"
                    onClick={() => handleDelete(params.id as string)}
                >
                    <DeleteIcon />
                </IconButton>
        },
        { field: "activity", width: 200, headerName: "Activity" },
        {
            field: "date",
            width: 200,
            headerName: "Date",
            type: "dateTime",
            //valueFormatter: ({ value }) => formatDate(value)
            valueFormatter: (value) => {
                //hh = 12-tuntinen kello, HH = 24-tuntinen, mm = minuutit, a = AM/PM
                return value ? dayjs(value as string).format('DD.MM.YYYY HH:mm') : '';
            }
        },
        { field: "duration", headerName: "Duration" },
        {
            field: "customer",
            width: 200,
            headerName: "Customer",
            renderCell: (params) => {
                const customer = (params.row as any).customer;
                return customer
                    ? `${customer.firstname} ${customer.lastname}`
                    : "";
            }
        },

    ]

    return (

        <div style={{ height: 700, width: '95%', margin: 'auto' }}>
            <DataGrid
                rows={trainings}
                columns={columns}
                getRowId={row => row.id}
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