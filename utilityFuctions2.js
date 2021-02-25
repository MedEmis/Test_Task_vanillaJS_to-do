//update/rerender todo listStyle: 
const update_ToDo = (id, newText, newDate, newStatus) => {
	let todo = todo_Storage.find(todo => todo && todo.id === +id)
	newText ? todo.text = newText : null
	newDate ? todo.date = format_Date(newDate) : null
	newStatus ? todo.status = newStatus : null
	//set timeout to let animation work before rerender
	localStorage.setItem("todo_data", JSON.stringify(todo_Storage.filter(item => item !== ",")))
	setTimeout(() => render_Todo(todo_Storage), 200);
}
//end=========================

//remove todo
const remove_ToDo = (event) => {
	const id = +event.target.id
	todo_Storage = [
		...todo_Storage.filter(todo => todo.id !== id)
	]
	const removed = document.getElementById(`${id}`)
	removed.style.left = "-150%"
	localStorage.setItem("todo_data", JSON.stringify(todo_Storage.filter(item => item !== ",")))
	setTimeout(() => render_Todo(todo_Storage), 500);

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