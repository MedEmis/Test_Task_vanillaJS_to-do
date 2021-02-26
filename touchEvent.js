

let touch_Start = 0
let touch_Shift

function touch2Mouse(e) {
	e.preventDefault();

	let element = null

	const id = e.target.id.replace("text-body-", "");

	element = document.getElementById(+id)

	let event = {
		target: {
			id: id
		}
	}

	//swipe on todo to remove it
	switch (e.type) {
		case "touchstart": touch_Start = e.changedTouches[0].pageX; break;
		case "touchend": {
			touch_End = e.changedTouches[0].pageX
			if (touch_Shift / 2 > 40) {
				remove_ToDo(event)
			}
		}; break;
		case "touchmove": {
			touch_Shift = touch_Start - e.changedTouches[0].pageX
			element.style.left = `-${touch_Shift}%`
		}; break;
		default: return;
	}
}


