
import Alert from "react-bootstrap/Alert";


export const ValidationAlert = ({ text }) => {

    return (
      <Alert
        className="bg-dark"
        variant="dark"
      >
        {text}
      </Alert>
    );
};
