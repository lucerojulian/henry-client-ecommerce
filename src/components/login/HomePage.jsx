import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";

function HomePage() {
  const user = useSelector((state) => state.authentication.user);

  return (
    <div>
      <Alert>
        Hi {user.data.name}!<p>Se ha logueado Correctamente</p>
      </Alert>
      <p>
        <Link to="/loginpage">Logout</Link>
      </p>
    </div>
  );
}

export { HomePage };
