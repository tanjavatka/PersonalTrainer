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
    date: Date;         // date & time
    duration: Date;     // minutes
    activity: string;
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


// customers linkki:
// https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers

// trainings linkki:
// https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings