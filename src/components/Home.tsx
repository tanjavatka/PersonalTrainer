import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';


export default function Home() {
    return (
        <Card sx={{ Width: 275, mx: "auto", backgroundColor: "#f5f5f5", mt: 5, boxShadow: 3, padding: 3 }}>
            <CardContent sx={{ textAlign: "center" }}>
                <h1> Welcome to Personal Trainer App </h1>
                <p> Easily manage your customers, trainings and calendar. </p>
            </CardContent>
        </Card>

    );
}