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

	//convert standard format  
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
			const newId = 10 + ++todo_Storage.length
			todo_Storage = [
				...todo_Storage.filter(item => item !== null),
				{
					id: newId,
					date: format_Date(input_date),
					text: input_text,
					status: active
				}
			]

			popup_input.value = ''
			localStorage.setItem("todo_data", JSON.stringify(todo_Storage.filter(item => item !== null)))
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
