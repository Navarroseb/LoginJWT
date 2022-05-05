import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";


export const Login = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    console.log("This is your token", store.token);
    const handleClick = () => {
        actions.login(email, password)
    };

    if (store.token && store.token != "" && store.token != undefined) history.push("/");


    return (
        <div className="text-center mt-5">
            {store.token && store.token != "" && store.token != undefined ?
                ("You are logged in with this token" + store.token) : (
                    <div>
                        <input
                            type="email"
                            id="email"
                            placeholder="Email"
                            className="input1"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            id="password"
                            placeholder="Password"
                            className="input2"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button onClick={handleClick}>Login!</button>

                    </div>
                )}
        </div>
    );
};
