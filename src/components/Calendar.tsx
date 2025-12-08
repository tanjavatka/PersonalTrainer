import { useEffect, useState } from "react";
import { Calendar as BigCalendar, dateFnsLocalizer, type View } from "react-big-calendar";
import { format } from "date-fns/format";
import { parse } from "date-fns/parse";
import { startOfWeek } from "date-fns/startOfWeek";
import { getDay } from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { getTrainingsWithCustomers } from "../trainingApi";
import { fi as fiLocale } from "date-fns/locale";
import type { CalendarEvent, TrainingSession } from "../types";


const locales = { fi: fiLocale };

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }), // Maanantai
    getDay,
    locales,
});

export default function Calendar() {
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [date, setDate] = useState(new Date());
    const [view, setView] = useState<View>("month");

    useEffect(() => {
        const fetchTrainings = async () => {
            try {
                const data: TrainingSession[] = await getTrainingsWithCustomers();

                const trainingEvents: CalendarEvent[] = data.map(t => {
                    const start = new Date(t.date);
                    const end = new Date(start.getTime() + t.duration * 60000); // duration minuutteina
                    const customerName = t.customer
                        ? `${t.customer.firstname} ${t.customer.lastname}`
                        : "Unknown";


                    return {
                        title: `${t.activity} / ${customerName}`,
                        start,
                        end,
                    };
                });

                setEvents(trainingEvents);
            } catch (err) {
                console.error("Error fetching trainings:", err);
            }
        };

        fetchTrainings();
    }, []);


    const eventTimeRangeFormat = ({ start, end }: { start: Date; end: Date }) => {
        const formatDate = (d: Date) =>
            `${d.getDate().toString().padStart(2, "0")}.${(d.getMonth() + 1)
                .toString()
                .padStart(2, "0")}.${d.getFullYear()} ${d.getHours().toString().padStart(2, "0")}:${d
                    .getMinutes()
                    .toString()
                    .padStart(2, "0")}`;
        return `${formatDate(start)} - ${formatDate(end)}`;
    };


    return (
        <div style={{ height: "80vh", width: "100%", padding: "20px" }}>
            <BigCalendar
                localizer={localizer}
                events={events}
                date={date}
                view={view}
                onNavigate={(newDate) => setDate(newDate)}
                onView={(newView) => setView(newView)}
                startAccessor="start"
                endAccessor="end"
                titleAccessor="title"
                style={{ height: "100%" }}
                dayLayoutAlgorithm="no-overlap"
                eventPropGetter={() => ({ style: { backgroundColor: "#57baf0ff", color: "white" } })}
                // Näytetään tapahtumien aika custom-formatilla
                tooltipAccessor={(event: any) => eventTimeRangeFormat(event)}
            />
        </div>
    );
}
