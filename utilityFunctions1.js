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
//end=============================

//todo creator
const create_New_Todo = () => {

	popup_Accept.removeEventListener("click", accept_handler, true)

	popup_Accept.addEventListener("click", accept_handler, false)

	popup_Decline.addEventListener("click", () => popup.classList.remove("visible"), false)

	popup.classList.add("visible")

}
//end==========================
