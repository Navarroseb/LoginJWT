import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";


export const Registerform = () => {
    const [form, setForm] = useState({
        email: "",
        password: ""
    })

    return (
        <div className="text-center mt-5">
            <div>
                <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    className="input1"
                    value={email}
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
                    value={password}
                    onChange={(e) => setForm({
                        email: form.email,
                        password: e.target.value
                    })
                    }
                />
                <button onClick={handleClick}>Login!</button>

            </div>

        </div>
    );
};
