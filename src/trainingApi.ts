import type { TrainingSessionForm } from "./types";

export function getTrainings() {
    return fetch(import.meta.env.VITE_API_URL + '/trainings')
        .then(response => {
            if (!response.ok)
                throw new Error("Error when fetching trainings: " + response.statusText);

            return response.json();
        })
}

export const getTrainingsWithCustomers = async () => {
    return fetch(import.meta.env.VITE_API_URL + "/gettrainings", {
        method: "GET",
        headers: { "content-type": "application/json" },
    })
        .then(response => {
            if (!response.ok)
                throw new Error("Error when adding a new training");

            return response.json();
        })
};

export function deleteTraining(url: string) {
    return fetch(import.meta.env.VITE_API_URL + '/trainings/' + url,
        { method: "DELETE" })
        .then(response => {
            if (!response.ok)
                throw new Error("Error when deleting training: " + response.statusText);

            response.json();
        })
}

export function saveTraining(newTraining: TrainingSessionForm) {
    return fetch(import.meta.env.VITE_API_URL + "/trainings", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(newTraining)
    })
        .then(response => {
            if (!response.ok)
                throw new Error("Error when adding a new training");

            return response.json();
        })
}
