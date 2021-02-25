//rendering of todo list
const render_Todo = (todo_list) => {

	todo_Holder.innerHTML = ""
	todo_list.forEach(todo => {
		todo_Holder.innerHTML += `
		<div id="${todo.id}" data-status="${todo.status}" class="todo-item">
			<div class="todo-item__title">
				<div class="todo-item__title_checkbox ">
					<label id="${todo.id}" data-type="checkbox" for="check" class="${todo.status === successful ? "checked" : null}"></label>
					<input id="${todo.id}"  data-type="date" value="${todo.date}" type="text" class="todo-item__title_date"></input>
				</div>
				<div class="todo-item__title_buttons">
					<button id="${todo.id}" data-type="edit" class="todo-item__title_buttons__edit"></button>
					<button id="${todo.id}" data-type="remove" class="todo-item__title_buttons__remove"></button>
				</div>
			</div>
			<div class="todo-item__body ${todo.status === successful ? "done" : null}" id="text-body-${todo.id}">${todo.text}</div>
			<small class="todo-item__body_edit-tip">double click to edit</small>
		 </div>`
	});
	console.log("rerender")


	//updating stats
	const rendered_todo_List = document.querySelectorAll(".todo-item")
	const countItems = (list, type) => Array.from(list).filter(item => item.dataset.status === type).length
	stats_Scope.innerText = Array.from(rendered_todo_List).length
	stats_Active.innerText = countItems(rendered_todo_List, active)
	stats_Successful.innerText = countItems(rendered_todo_List, successful)
	//end==========================

	//adding event listeners to each todo 
	const addListeners = () => {
		rendered_todo_List.forEach(todo_item => {
			todo_item.children[0].addEventListener("click", (event) => todo_Header_Handler(event))
			todo_item.children[1].addEventListener("dblclick", (event) => todo_Body_Handler(event.target))
		})
		new_todo_button.addEventListener("click", create_New_Todo)
		extra_add_todo.addEventListener("click", create_New_Todo)
	}
	addListeners()
	//end===========================
}
//end=========================


//render of todo list
render_Todo(todo_Storage)
//end=======================