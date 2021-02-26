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

			if (!event.target.classList.contains("to-save")) {

				//change button style
				event.target.classList.add("to-save")

				const text_Body = document.getElementById(`text-body-${id}`)

				todo_Body_Handler(text_Body, event.target)

			} else {
				event.target.classList.remove("to-save")

			}

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
const todo_Body_Handler = (target, save_button) => {
	//getting body
	const text_Body = target

	//switch off swipe listeners
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

	//highlighting of border
	text_Body.parentNode.classList.add("animated")

	//adding event listener to submit changes 
	save_button.addEventListener('click', (event) => save_handler(event),)

	//submitting handler for textarea
	//- saving entered content into temporary variable 
	//- giving content back to to-do body
	//- removing highlighting of border 
	//- highlighting body for 200ms to show it was changed
	//- removing highlighting
	const save_handler = (event) => {

		inner_Text = text_Area.value

		text_Body.style.background = "rgb(157, 248, 115)"

		text_Body.parentNode.classList.remove("animated")

		setTimeout(() => {

			save_button.classList.remove("to-save")

			save_button.removeEventListener('click', (event) => save_handler(event),)

			text_Body.style.background = "rgb(255, 255, 255)"

			update_ToDo(id, inner_Text, null, null)

			//switch on swipe listeners back
			text_Body.addEventListener("touchstart", touch2Mouse, true);
			text_Body.addEventListener("touchmove", touch2Mouse, true);
			text_Body.addEventListener("touchend", touch2Mouse, true);

		}, 200);
	}

}
//end========================





//create todo accept handler
const accept_handler = (event) => {
	event.preventDefault()

	input_date = popup_Input.value
	input_text = popup_Textarea.value

	//some kind of validation...
	if (popup_Input.value.length && popup_Textarea.value.length) {

		//find max id and add 1
		const newId = Math.max.apply(Math, todo_Storage.map((todo) => todo.id)) + 1

		const new_Todo = {
			id: newId,
			date: format_Date(input_date),
			text: input_text,
			status: active
		}

		new Promise((resolve) => {

			//make request to server
			resolve(post_Todo(new_Todo))

		}).then(() => {

			todo_Storage = [
				...todo_Storage.filter(item => item !== null),
				new_Todo
			]

			//update localStorage
			localStorage.setItem("todo_data", JSON.stringify(todo_Storage.filter(item => item !== null)))

			//empty fields 
			popup_Input.value = ''
			popup_Textarea.value = ''

			//hide popup
			popup.classList.remove("visible")

			render_Todo(todo_Storage)

		}).catch(console.log.bind(console));


	} else {
		// show tip and highlight empty field

		popup_Tip.style.height = "40px"

		popup_Tip.style.opacity = 1

		!popup_Input.value.length && (popup_Input.style.boxShadow = "0 10px 10px rgba(230, 7, 7, 0.5)")

		!popup_Textarea.value.length && (popup_Textarea.style.boxShadow = "0 10px 10px rgba(230, 7, 7, 0.5)")

		setTimeout(() => {
			//hide tip
			popup_Tip.style.height = "0px"

			popup_Tip.style.opacity = 0

			popup_Input.style.boxShadow = "0 10px 10px rgba(0, 0, 0, 0.5)"

			popup_Textarea.style.boxShadow = "0 10px 10px rgba(0, 0, 0, 0.5)"

		}, 3000);
	}
}
//end========================
