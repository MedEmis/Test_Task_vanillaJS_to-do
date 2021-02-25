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

	text_Body.removeEventListener("touchstart", touch2Mouse, true);
	text_Body.removeEventListener("touchmove", touch2Mouse, true);
	text_Body.removeEventListener("touchend", touch2Mouse, true);

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

				text_Body.addEventListener("touchstart", touch2Mouse, true);
				text_Body.addEventListener("touchmove", touch2Mouse, true);
				text_Body.addEventListener("touchend", touch2Mouse, true);

			}, 200);
		}
	}

}
//end========================