import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";


export function Registerform() {
    const { store, actions } = useContext(Context)
    const [form, setForm] = useState({
        email: '',
        password: ''
    })
    useEffect(() => {
        console.log(form)
    }, [form])

    return (
        <div className="text-center mt-5">
            <div>
                <h1>Registro</h1>
                <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    className="input1"
                    onChange={(e) => setForm({
                        email: e.target.value,
                        password: form.password
                    })
                    }
                />
                <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    className="input2"
                    onChange={(e) => setForm({
                        email: form.email,
                        password: e.target.value
                    })
                    }
                />
                <button onClick={() => { actions.registrar(form) }} >Registrar!</button>

            </div>

        </div>
    );
};
