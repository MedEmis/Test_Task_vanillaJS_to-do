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

