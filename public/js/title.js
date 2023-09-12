const a = document.createElement("a");
a.href = "/home";

setTimeout(() => {
	a.click();
}, 11000);

addEventListener("keypress", () => {
	if (event.keyCode == 32) {
		a.click();
	}
});
