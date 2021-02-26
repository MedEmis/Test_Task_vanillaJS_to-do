//rendering of todo list
const render_Todo = (todo_list) => {

	//remove old content
	todo_Holder.innerHTML = ""

	//render new content
	todo_list.forEach(todo => {
		todo_Holder.innerHTML += `
		<div id="${todo.id}" data-status="${todo.status}" class="todo-item">
			<div id="${todo.id}" class="todo-item__title">
				<div class="todo-item__title_checkbox ">
					<label id="${todo.id}" data-type="checkbox" for="check" class="${todo.status === successful ? "checked" : null}"></label>
					<input id="${todo.id}"  data-type="date" value="${todo.date}" type="text" class="todo-item__title_date"></input>
				</div>
				<div id="${todo.id}" class="todo-item__title_buttons">
					<button id="${todo.id}" data-type="edit" class="todo-item__title_buttons__edit"></button>
					<button id="${todo.id}" data-type="remove" class="todo-item__title_buttons__remove"></button>
				</div>
			</div>
			<div  class="todo-item__body ${todo.status === successful ? "done" : null}" id="text-body-${todo.id}">${todo.text}</div>
			<div class="todo-loader todo-loader-${todo.id}" ><div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div></div>
		</div>`
	});

	console.info("%c ---< RE-RENDER >--- ", rendering);

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

			//button listeners
			todo_item.children[0].addEventListener("click", (event) => todo_Header_Handler(event))

			//swipe listeners
			todo_item.children[1].addEventListener("touchstart", touch2Mouse, true);
			todo_item.children[1].addEventListener("touchmove", touch2Mouse, true);
			todo_item.children[1].addEventListener("touchend", touch2Mouse, true);
		})

		new_Todo_Button.addEventListener("click", create_New_Todo)
		extra_Add_Todo.addEventListener("click", create_New_Todo)
	}
	addListeners()
	//end===========================
}
//end=========================

// get data and render of todo list
getData(url)
// //end=======================