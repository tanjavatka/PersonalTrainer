
export type Customer = {
    firstname: string;
    lastname: string;
    streetaddress: string;
    postcode: string;
    city: string;
    email: string;
    phone: string;
    _links: {
        self: {
            href: string;
        },
        customer: {
            href: string;
        },
        trainings: {
            href: string;
        },
    }
}

export type TrainingSession = {
    date: string;         // date & time
    duration: number;     // minutes
    activity: string;
    customer: string;
    _links: {
        self: {
            href: string;
        },
        customer: {
            href: string;
        },
        trainings: {
            href: string;
        },
    }
}

export type CalendarEvent = {
    title: string;
    start: Date;
    end: Date;
}

export type ActivityStatistics = {
    activity: string;
    totalMinutes: number;
}

export type CustomerForm = Omit<Customer, "_links">;
export type TrainingSessionForm = Omit<TrainingSession, "_links">;


// customers linkki:
// https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers

// trainings linkki:
// https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings