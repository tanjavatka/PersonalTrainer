import { useRouteError } from "react-router";

function Error() {
    const error = useRouteError() as { data?: string };
    console.log(error);

    return (
        <>
            <h2> Page not found </h2>
            <p> {error.data} </p>
        </>
    )
}

export default Error;