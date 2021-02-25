//update/rerender todo listStyle: 
const update_ToDo = (id, newText, newDate, newStatus) => {
	let todo = todo_Storage.find(todo => todo && todo.id === +id)
	newText ? todo.text = newText : null
	newDate ? todo.date = format_Date(newDate) : null
	newStatus ? todo.status = newStatus : null

	const loader = document.querySelector(`.todo-loader-${id}`)

	//switch on loader
	loader.style.display = "block"

	new Promise((resolve) => {
		resolve(update_Todo(id, todo))
	}).then(() => {
		//set timeout to let animation work before rerender
		localStorage.setItem("todo_data", JSON.stringify(todo_Storage.filter(item => item !== ",")))

		setTimeout(() => render_Todo(todo_Storage), 200);
		//switch off loader
		loader.style.display = "none"
	});

}
//end=========================

//remove todo
const remove_ToDo = (event) => {

	console.log("event----------", +event.target.id)

	//ивент таргет id  нужно поменять на номер строкой

	const id = +event.target.id

	const loader = document.querySelector(`.todo-loader-${id}`)

	//switch on loader
	loader.style.display = "block"

	new Promise((resolve) => {
		resolve(delete_Todo(id))
	}).then(() => {
		//remove from "state"
		todo_Storage = [
			...todo_Storage.filter(todo => todo.id !== id)
		]
		//chosing deleted element
		const removed = document.getElementById(`${id}`)
		//shift it left
		removed.style.left = "-150%"
		//remove from localStorage
		localStorage.setItem("todo_data", JSON.stringify(todo_Storage.filter(item => item !== ",")))

		//switch off loader
		loader.style.display = "none"

		setTimeout(() => render_Todo(todo_Storage), 500);
	});
}
//end=========================

//change date
const change_Date = (event) => {
	const old_Date = event.target.value//in case if user will change his mind
	event.target.type = "date"
	event.target.addEventListener("change", (event) => update_ToDo(event.target.id, null, event.target.value, null))
	event.target.addEventListener("focusout", (event) => {//back to previous date
		event.target.type = "text"
		event.target.value = old_Date
	})
}
//end=========================