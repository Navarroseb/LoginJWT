const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			registrar: (form) => {
				console.log("Hola desde Flux", form)
				var myHeaders = new Headers();
				myHeaders.append("Content-Type", "application/json");

				var raw = JSON.stringify(form);

				var requestOptions = {
					method: "POST",
					headers: myHeaders,
					body: raw,
					redirect: "follow",
				};

				fetch("https://3001-navarroseb-loginjwt-j7ond8sp574.ws-us44.gitpod.io/api/register", requestOptions)
					.then((response) => response.text())
					.then((result) => alert("Registrado con éxito" + result.email))
					.catch((error) => console.log("error", error));

			},
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			syncTokenFromSessionStore: () => {
				const token = sessionStorage.getItem("token");
				console.log("Apllication loaded");
				if (token && token != "" && token != undefined) setStore({ token: token });
			},

			logout: () => {
				sessionStorage.removeItem("token");
				console.log("Peace out!");
				setStore({ token: null });
			},

			login: async (email, password) => {
				const opts = {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						email: email,
						password: password
					})
				};

				try {
					const resp = await fetch("https://3001-4geeksacade-reactflaskh-gtwssatsc1m.ws-us44.gitpod.io/api/token", opts);
					if (resp.status !== 200) {
						alert("Try again");
						return false;
					}

					const data = await resp.json();
					console.log("Message from the backend", data);
					sessionStorage.setItem("token", data.access_token);
					setStore({ token: data.access_token })
					return true;
				} catch (error) {
					console.error("There is an error");
				}
			},

			getMessage: () => {
				const store = getStore();
				const opts = {
					headers: {
						Authorization: "Bearer " + store.token
					}
				}
				// fetching data from the backend
				fetch("https://3001-4geeksacade-reactflaskh-gtwssatsc1m.ws-us44.gitpod.io/api/hello", opts)
					.then(resp => resp.json())
					.then(data => setStore({ message: data.message }))
					.catch(error => console.log("Error loading message from backend", error));
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
