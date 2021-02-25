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
		input_date = popup_Input.value
		input_text = popup_Textarea.value
		//some kind of validation...
		if (popup_Input.value.length && popup_Textarea.value.length) {
			const newId = 10 + ++todo_Storage.length
			const new_Todo = {
				id: newId,
				date: format_Date(input_date),
				text: input_text,
				status: active
			}

			new Promise((resolve) => {
				resolve(post_Todo(new_Todo))
			}).then(() => {
				//update localStorage
				localStorage.setItem("todo_data", JSON.stringify(todo_Storage.filter(item => item !== null)))
				todo_Storage = [
					...todo_Storage.filter(item => item !== null),
					new_Todo
				]
				render_Todo(todo_Storage)

				popup_Input.value = ''
				popup_Textarea.value = ''

				popup.classList.remove("visible")
				popup_Accept.removeEventListener("click", accept_handler)
			});

		} else {
			// show tip and highlight empty field
			popup_Tip.style.height = "40px"
			popup_Tip.style.opacity = 1
			!popup_Input.value.length && (popup_Input.style.boxShadow = "0 10px 10px rgba(230, 7, 7, 0.5)")
			!popup_Textarea.value.length && (popup_Textarea.style.boxShadow = "0 10px 10px rgba(230, 7, 7, 0.5)")
			setTimeout(() => {
				popup_Tip.style.height = "0px"
				popup_Tip.style.opacity = 0
				popup_Input.style.boxShadow = "0 10px 10px rgba(0, 0, 0, 0.5)"
				popup_Textarea.style.boxShadow = "0 10px 10px rgba(0, 0, 0, 0.5)"
			}, 3000);
		}
	}

	popup_Accept.addEventListener("click", (event) => accept_handler(event))
	popup_Decline.addEventListener("click", () => popup.classList.remove("visible"))
}
//end==========================
