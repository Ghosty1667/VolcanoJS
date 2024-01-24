import { useState } from "react";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { postLogin, postRegister } from "../data/VolcanoesAPI";



export default function LoginField() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    let navigate = useNavigate();

    const handleEvent = (event) => {
        event.preventDefault();
        if (email !== "" && password !== "") {
            postLogin(email, password).then(res => {
                res.status === 200 ? res.json().then(res => {
                    localStorage.setItem("token", res.token)
                    console.log(localStorage.getItem("token"))
                    navigate(`/`)
                }) : res.json().then(res => setError(res.message))
            })
        }
        else {
            setError("Please enter a username and password")
        }
    }


    return (
        <div>
            <Form onSubmit={handleEvent}>
                <FormGroup>
                    <Label for="email"> Email </Label>
                    <Input name="search" type="search" id="email" value={email} onChange={e => setEmail(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Label for="password"> Password </Label>
                    <Input name="search" type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
                </FormGroup>
                <span> <p>{error}</p></span>
                <Button type="submit">Submit</Button>
            </Form>

        </div>
    );


}
export function RegisterField() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [verificationPassword, setVerificationPassword] = useState("")

    let navigate = useNavigate();


    const handleEvent = (event) => {
        event.preventDefault();
        if (email !== "" && password !== "") {
            if (verificationPassword === password) {
                postRegister(email, password).then(res => {
                    res.status === 201 ? res.json().then(() => {
                        postLogin(email, password)
                            .then(res => res.json())
                            .then(res => localStorage.setItem("token", res.token))
                        navigate(`/`)
                    }).catch((err) => setError(err.message))
                        : res.json().then(res => setError(res.message))
                })
            }
            else {
                setError("Passwords don't match")
            }
        }
        else {
            setError("Please enter a username and password")
        }
    }

    return (
        <div>
            <Form onSubmit={handleEvent}>
                <FormGroup>
                    <Label for="email"> Email </Label>
                    <Input name="search" type="search" id="email" value={email} onChange={e => setEmail(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Label for="password"> Password </Label>
                    <Input name="search" type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Label for="password"> Confirm Password </Label>
                    <Input name="search" type="password" id="password2" value={verificationPassword} onChange={e => setVerificationPassword(e.target.value)} />
                </FormGroup>
                <span> <p>{error}</p></span>
                <Button type="submit" >Submit</Button>
            </Form>

        </div >
    );

}

