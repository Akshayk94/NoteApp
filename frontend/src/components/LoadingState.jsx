import { Spinner } from "react-bootstrap";

function LoadingState({text="Loading..."}){
    return(
        <div className="text-center py-5">
            <Spinner animation="border" variant="primary"></Spinner>
            <p className="mt-2 text-muted">{text}</p>
        </div>
    );
}
export default LoadingState;