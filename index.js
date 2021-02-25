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
const todo_wrapper = document.getElementById("todo-wrapper")
const todo_Holder = document.getElementById("todo-holder")
const new_todo_button = document.getElementById("new-todo")
const extra_add_todo = document.getElementById("extra-add-todo")
const popup = document.getElementById("new-popup")
const popup_accept = document.getElementById("add-accept")
const popup_decline = document.getElementById("add-decline")
const popup_input = document.getElementById("popup-input")
const popup_textarea = document.getElementById("popup-textarea")
const popup_tip = document.getElementById("popup-tip")
//==========================

//todo storage
let data_todo = [
	{
		id: 1,
		date: "24 feb 2021",
		text: "Make proper layout",
		status: successful
	},
	{
		id: 2,
		date: "24 feb 2021",
		text: "Add pleasant style",
		status: successful
	},
	{
		id: 3,
		date: "24 feb 2021",
		text: "Bind html with js",
		status: successful
	},
	{
		id: 4,
		date: "24 feb 2021",
		text: "Write some logic",
		status: successful
	},
	{
		id: 5,
		date: "24 feb 2021",
		text: "Fix bugs",
		status: successful
	},
	{
		id: 6,
		date: "24 feb 2021",
		text: "Push to Git Hub",
		status: successful
	},
	{
		id: 7,
		date: "24 feb 2021",
		text: "Deploy to Git Hub pages",
		status: successful
	},
	{
		id: 8,
		date: "24 feb 2021",
		text: "Send ready to-do app to the company",
		status: successful
	},
	{
		id: 9,
		date: "24 feb 2021",
		text: "Get response...",
		status: active
	},
]
localStorage.setItem("todo_data", JSON.stringify(data_todo))
let todo_Storage = JSON.parse(localStorage.getItem("todo_data"))
//end==========================

//function to format date from input
const format_Date = (date) => {
	//creating date
	let today = new Date();
	let dd = String(today.getDate()).padStart(2, "0");
	let mm = String(today.getMonth() + 1).padStart(2, "0");
	let yyyy = today.getFullYear();
	const month = { "01": "jan", "02": "feb", "03": "march", "04": "april", "05": "may", "06": "june", "07": "july", "08": "aug", "09": "sept", "10": "oct", "11": "nov", "12": "dec" }
	today = `${dd} ${month[mm]} ${yyyy}`;
	//end=================================

	let reversed = date.split("-").reverse()
	reversed[1] = month[reversed[1]]//changing '02' to -> "feb"
	return reversed.join(" ")
}
//=============================

//todo creator
const create_New_Todo = () => {
	popup.classList.add("visible")
	let input_date = ''
	let input_text = ''
	const accept_handler = (event) => {
		event.preventDefault()
		input_date = popup_input.value
		input_text = popup_textarea.value
		//some kind of validation...
		if (popup_input.value.length && popup_textarea.value.length) {
			const newId = ++todo_Storage.length
			todo_Storage = [
				...todo_Storage,
				{
					id: newId,
					date: format_Date(input_date),
					text: input_text,
					status: active
				}
			]

			popup_input.value = ''
			localStorage.setItem("todo_data", JSON.stringify(todo_Storage.filter(item => item !== [])))
			render_Todo(todo_Storage)
			popup_textarea.value = ''
			popup.classList.remove("visible")
			popup_accept.removeEventListener("click", accept_handler)
		} else {
			// show tip and highlight empty field
			popup_tip.style.height = "40px"
			popup_tip.style.opacity = 1
			!popup_input.value.length && (popup_input.style.boxShadow = "0 10px 10px rgba(230, 7, 7, 0.5)")
			!popup_textarea.value.length && (popup_textarea.style.boxShadow = "0 10px 10px rgba(230, 7, 7, 0.5)")
			setTimeout(() => {
				popup_tip.style.height = "0px"
				popup_tip.style.opacity = 0
				popup_input.style.boxShadow = "0 10px 10px rgba(0, 0, 0, 0.5)"
				popup_textarea.style.boxShadow = "0 10px 10px rgba(0, 0, 0, 0.5)"
			}, 3000);
		}
	}

	popup_accept.addEventListener("click", (event) => accept_handler(event))
	popup_decline.addEventListener("click", () => popup.classList.remove("visible"))
}
//end==========================


//todo header event listeners
const todo_Header_Handler = (event) => {
	//getting todo header
	const element = event.target
	//element type
	const type = element.dataset.type
	//element id 
	const id = element.id
	//handle event depending on element type
	switch (type) {
		case "checkbox":
			if (Array.from(element.classList).includes("checked")) {
				element.classList.remove("checked")
				update_ToDo(id, null, null, active)
			} else {
				element.classList.add("checked")
				update_ToDo(id, null, null, successful)
			}
			break;
		case "date":
			change_Date(event)
			break;
		case "edit":
			const text_Body = document.getElementById(`text-body-${id}`)
			todo_Body_Handler(text_Body)
			break;
		case "remove":
			remove_ToDo(event)
			break;
		default:
			break;
	}


}
//end========================

//todo body event listeners
const todo_Body_Handler = (target) => {
	//getting body
	const text_Body = target
	//getting to-do id
	const id = text_Body.parentNode.attributes.id.value
	//saving to-do content 
	let inner_Text = target.innerText
	//removing old to-do content
	text_Body.innerHTML = ""

	//---creating textarea to change to-do content
	const text_Area = document.createElement("textarea")
	//assigning class to textarea to get proper styles 
	text_Area.classList.add("todo-item__textarea")
	//placing textarea to to-do body
	text_Body.appendChild(text_Area)
	//giving to textarea initial content
	text_Area.value = inner_Text
	//placing cursor inside textarea
	text_Area.focus()

	//---creating button to save content
	const save_Button = document.createElement("button")
	//assigning class to button to get proper styles 
	save_Button.classList.add("todo-item__body_save")
	//adding text and id to button
	save_Button.innerText = "save"
	save_Button.id = "save"
	//placing button to to-do body
	text_Body.appendChild(save_Button)


	//highlighting of border
	text_Body.parentNode.classList.add("animated")
	//adding event listener to submit changes during in focus
	text_Body.addEventListener('click', (event) => textarea_handler(event),)
	//submitting handler for textarea
	//- saving entered content into temporary variable 
	//- giving content back to to-do body
	//- highlighting body for 200ms to show it was changed
	//- removing highlighting
	const textarea_handler = (event) => {
		if (event.target.id === "save") {
			inner_Text = text_Area.value
			text_Body.style.background = "rgb(157, 248, 115)"
			text_Body.parentNode.classList.remove("animated")
			setTimeout(() => {
				text_Body.style.background = "rgb(255, 255, 255)"
				update_ToDo(id, inner_Text, null, null)
			}, 200);
		}
	}

}
//end========================

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











