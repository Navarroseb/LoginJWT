import React, { Component, useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

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
					/>
					<input
						type="password"
						id="password"
						placeholder="Create a new password"
						className="input2"
					/>
					<button type="submit">Register!</button>
				</form>
			</div>
		</div>
	);
};
