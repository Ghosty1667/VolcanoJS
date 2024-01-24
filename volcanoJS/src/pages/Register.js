import React from "react";
import { RegisterField } from "../compenents/elements/LoginField";
import { Card, CardTitle, CardText, CardFooter, CardHeader, CardBody } from "reactstrap";

export default function RegisterPage() {
    return (
        <div className="centre">
            <Card>
                <CardHeader tag="h2">
                    Volcano Data
                </CardHeader>
                <CardBody>
                    <CardTitle tag="h5">
                        Register
                    </CardTitle>
                    <CardText>
                        <RegisterField />
                    </CardText>
                </CardBody>
                <CardFooter>
                    Volcanoes of the world  | <a href="/">Back</a>
                </CardFooter>
            </Card>
        </div>
    );
}
