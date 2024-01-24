import React from "react";
import LoginField from "../compenents/elements/LoginField";
import { Card, CardTitle, CardText, CardFooter, CardHeader, CardBody } from "reactstrap";


export default function LoginPage() {
  return (
    <div className="centre">
      <Card>
        <CardHeader tag="h2">
          Volcano Data
        </CardHeader>
        <CardBody>
          <CardTitle tag="h5">
            Login
          </CardTitle>
          <CardText>
            <LoginField />
          </CardText>
        </CardBody>
        <CardFooter>
          Volcanoes of the world | <a href="/">Back</a>
        </CardFooter>
      </Card>
    </div>
  );
}
