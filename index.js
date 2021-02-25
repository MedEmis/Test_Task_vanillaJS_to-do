//for console
const success = ['background: green', 'color: white', 'display: block', 'text-align: center'].join(';');
const failure = ['background: red', 'color: white', 'display: block', 'text-align: center'].join(';');
//end============================

//api url < json-placeholder >
const url = 'https://my-json-server.typicode.com/MedEmis/Test_Task_vanillaJS_to-do/todo'
//end============================

const loader = document.querySelector(".web-loader")

//set "app state"
let todo_Storage = JSON.parse(localStorage.getItem("todo_data"))
//end============================

//getting data from DB <jsonDB.json> in repository
const getData = async (url) => {
	// will be run at the end code below render function expression
	try {
		//switch on loader
		loader.style.display = "block"

		//if no data in localStorage...
		if (!JSON.parse(localStorage.getItem("todo_data")) || !JSON.parse(localStorage.getItem("todo_data")).length) {
			//request data from DB
			const response = await fetch(url);
			const data = await response.json();

			//received data => to localStorage
			new Promise((resolve) => {
				resolve(localStorage.setItem("todo_data", JSON.stringify(data)))
			}).then(() => {
				//adn after render todo list from localStorage
				todo_Storage = JSON.parse(localStorage.getItem("todo_data"))
				render_Todo(todo_Storage)
			});
		}
		//give "state" to render function to show todo list
		todo_Storage && render_Todo(todo_Storage)

		//switch off loader
		loader.style.display = "none"

		console.info("%c ---< DATA RECEIVED >---", success);
	} catch (error) {
		console.error(`%c ${error}`, failure)
	}
}
//end==========================

//make post to DB 
const post_Todo = async (new_Todo) => {

	try {
		const response = await fetch(url, {
			method: 'POST',
			body: JSON.stringify(new_Todo),
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			}
		})
		const result = await response.json();
		console.info("%c ---< TODO POSTED >---", success);
	} catch (error) {
		console.error(`%c ${error}`, failure)
	}
}
//end==========================

//delete post to DB 
const delete_Todo = async (id) => {

	try {
		const response = await fetch(`${url}/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-type': 'application/json'
			}
		});
		const result = await response.json();
		console.info(`%c ---< TODO ${id} DELETED >---`, success);
	} catch (error) {
		console.error(`%c ${error}`, failure)
	}
}
//end==========================

//update post to DB 
const update_Todo = async (id, new_Todo) => {

	try {
		const response = await fetch(`${url}/${id}`, {
			method: 'PUT',
			body: new_Todo
		});
		const result = await response.json();
		console.info(`"%c ---< TODO ${id} UPDATED with  \/ >---`, success);
		console.log(new_Todo)
	} catch (error) {
		console.error(`%c ${error}`, failure)
	}
}
//end==========================

//todo status types
const scope = "scope"
const active = "active"
const successful = "successful"
//end========================

//header stats dashboard
const stats_Scope = document.getElementById("stats-scope")
const stats_Active = document.getElementById("stats-active")
const stats_Successful = document.getElementById("stats-succesful")
//end=======================

//getting some page elements
const todo_Wrapper = document.getElementById("todo-wrapper")
const todo_Holder = document.getElementById("todo-holder")
const new_Todo_Button = document.getElementById("new-todo")
const extra_Add_Todo = document.getElementById("extra-add-todo")
const popup = document.getElementById("new-popup")
const popup_Accept = document.getElementById("add-accept")
const popup_Decline = document.getElementById("add-decline")
const popup_Input = document.getElementById("popup-input")
const popup_Textarea = document.getElementById("popup-textarea")
const popup_Tip = document.getElementById("popup-tip")
//==========================



