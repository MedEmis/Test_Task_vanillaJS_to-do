//for console
const success = ['background: green', 'color: white', 'display: block', 'text-align: center'].join(';');
const failure = ['background: red', 'color: white', 'display: block', 'text-align: center'].join(';');
const rendering = ['background: orange', 'color: black', 'display: block', 'text-align: center'].join(';');
//end============================

//api url < json-placeholder >
const url = 'https://my-json-server.typicode.com/MedEmis/Test_Task_vanillaJS_to-do/todo'
//end============================

//firebase C.R.U.D methods
//firebase data base
const database = firebase.database()

//todo root short-hand
const todo_Root = (id) => database.ref(`/todo/${id}`)

//firebase notifier about changes in database 
const app_notify_About = (event, id) => {

	//listeners from firebase
	const events = {
		value: "value",//working on update
		create: "child_added",
		update: "child_changed",//?not working on update?
		delete: "child_removed",
		moved: "child_moved"
	}

	//triggering any action depends on action type
	database.ref("todo").once(events[event], () => {

		//in case of update
		if (event === "value") {

			//asking about what exactly was changed
			database.ref("todo").child(id).on("value", (update) => {
				console.info(`%c---< FIREBASE UPDATED >---`, success);
				console.table(update.val());
			})
		} else {

			//executing action
			console.info(`%c---< FIREBASE ${events[event].toUpperCase()} >---`, success);
		}
	})
}

const firebase_CREATE = (todo) => {

	app_notify_About("create")

	todo_Root(todo.id).set(todo)
}

const firebase_READ = async () => {

	app_notify_About("update")

	await database.ref("todo").once('value')
		.then((snapshot) => {
			console.log(snapshot.val())
			localStorage.setItem("todo_data", JSON.stringify(snapshot.val().filter(item => item !== null)))
		}).catch((error) => {
			console.error(`%c ${error}`, failure)
		})
}

const firebase_UPDATE = async (todo,) => {

	app_notify_About("value", todo.id)

	//can update old or create new field in object
	await todo_Root(todo.id).update(todo)
}

const firebase_DELETE = async (id) => {

	app_notify_About("delete")

	await todo_Root(id).remove()
}

const loader = document.querySelector(".web-loader")
//switch on loader
loader.style.display = "block"
let isFetching = false
//firebase C.R.U.D methods end============================


//set "app state"
let todo_Storage = JSON.parse(localStorage.getItem("todo_data"))
//end============================

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

//getting data from DB <jsonDB.json> in repository
const getData = async (url) => {
	// will be run at the end code below render function expression
	try {



		//if no data in localStorage...
		if (!JSON.parse(localStorage.getItem("todo_data")) || !JSON.parse(localStorage.getItem("todo_data")).length) {

			// --- for json placeholder --- 
			// //request data from DB
			// const response = await fetch(url);
			// const data = await response.json();
			//end===========================

			//received data => to localStorage
			new Promise((resolve) => {

				// --- for json placeholder --- 
				//resolve(localStorage.setItem("todo_data", JSON.stringify(data)))
				//end===========================

				//getting data from firebase and save in local storage 
				resolve(firebase_READ())

			}).then(() => {


				//anf after render todo list from localStorage
				todo_Storage = JSON.parse(localStorage.getItem("todo_data"))

				console.log("daddada", todo_Storage)

				render_Todo(todo_Storage)

			}).catch(console.log.bind(console));
		}
		//give "state" to render function to show todo list
		todo_Storage && render_Todo(todo_Storage)

		//switch off loader
		loader.style.display = "none"

		console.info("%c---< APP DATA RECEIVED >---", success);

	} catch (error) {

		console.error(`%c ${error}`, failure)

	}
}

//end==========================

//make post to DB 
const post_Todo = async (new_Todo) => {

	try {
		isFetching = true

		//temporary disable accept button
		popup_Accept.disabled = isFetching

		// --- for json placeholder --- 
		// const response = await fetch(url, {
		// 	method: 'POST',
		// 	body: JSON.stringify(new_Todo),
		// 	headers: {
		// 		"Content-type": "application/json; charset=UTF-8"
		// 	}
		// })
		// const result = await response.json();
		//end===========================

		//create request to firebase
		firebase_CREATE(new_Todo)

		isFetching = false

		console.info("%c---< APP TODO POSTED >---", success);

	} catch (error) {
		console.error(`%c ${error}`, failure)

	}
}
//end==========================

//delete post to DB 
const delete_Todo = async (id) => {
	isFetching = true
	try {

		// --- for json placeholder --- 
		// const response = await fetch(`${url}/${id}`, {
		// 	method: 'DELETE',
		// 	headers: {
		// 		'Content-type': 'application/json'
		// 	}
		// });
		// const result = await response.json();
		//end===========================

		firebase_DELETE(id)

		isFetching = false

		console.info(`%c---< APP TODO ${id} DELETED >---`, success);

	} catch (error) {

		console.error(`%c ${error}`, failure)

	}
}
//end==========================

//update post to DB 
const update_Todo = async (id, new_Todo) => {
	isFetching = true
	try {

		// --- for json placeholder --- 
		// const response = await fetch(`${url}/${id}`, {
		// 	method: 'PUT',
		// 	body: new_Todo
		// });
		// const result = await response.json();
		//end===========================

		firebase_UPDATE(new_Todo)

		isFetching = false

		console.info(`%c---< APP TODO ${id} UPDATED with => >---`, success);

	} catch (error) {

		console.error(`%c ${error}`, failure)

	}
}
//end==========================





