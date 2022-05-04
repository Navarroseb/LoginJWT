import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";


export const Login = () => {
    const { store, actions } = useContext(Context);
    const { email, setEmail } = useState();
    const { password, setPassword } = useState();

    const handleClick = () => {

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        };

        fetch('https://3000-4geeksacade-reactflaskh-gtwssatsc1m.ws-us43.gitpod.io/api/token', options)
            .then(resp => {
                if (resp.status === 200) return resp.json();
                else alert("Try again")
            })
            .then()
            .catch(error => {
                console.error("There was an error!!", error);
            })

    }


    /* handleSubmit = e => {
        e.preventDefault();

        const data = {
            email: this.email,
            password: this.password
        }
    }; */

    return (
        <div className="text-center mt-5">
            <div>
                <form /* onSubmit={this.handleSubmit} */>
                    <input
                        type="email"
                        id="email"
                        placeholder="Email"
                        className="input1"
                        value={email}
                        onChange={() => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        id="password"
                        placeholder="Create a new password"
                        className="input2"
                        value={password}
                        onChange={() => setPassword(e.target.value)}
                    />
                    <button onClick={handleClick} type="submit">Register!</button>
                </form>
            </div>
        </div>
    );
};
