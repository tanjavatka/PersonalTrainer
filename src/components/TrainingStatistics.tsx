import { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import type { ActivityStatistics } from "../types";
import { getTrainings } from "../trainingApi";
import { groupBy, sumBy } from "lodash";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
    Legend,
} from "recharts";



function TrainingStatistics() {
    const [stats, setStats] = useState<ActivityStatistics[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getTrainings();
                const rawTrainings = data._embedded.trainings;

                // Ryhmitys activityn mukaan
                const grouped = groupBy(rawTrainings, (t) => t.activity || "Unknown");

                const stats: ActivityStatistics[] = Object.keys(grouped).map((activity) => ({
                    activity,
                    totalMinutes: sumBy(grouped[activity], "duration"),
                }));

                setStats(stats);
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, []);

    return (
        <Paper>
            <Typography>
                Training Statistics
            </Typography>

            <div style={{ width: "100%", height: 400 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={stats}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="activity" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="totalMinutes" name="Duration (min)" fill="#57baf0ff" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </Paper>
    )
};

export default TrainingStatistics;