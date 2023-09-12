const container = document.getElementsByClassName("doc")[0];

getDocs(0);

async function getDocs(i) {
	const url = window.location.href + "/doc" + i + "/html";
	try {
		const response = await fetch(url);
		if (response.status >= 400) {
			return;
		} else {
			const titleURL = window.location.href + "/doc" + i + "/title";
			const titleResponse = await fetch(titleURL);
			const title = await titleResponse.text();
			const p = document.createElement("p");
			p.innerHTML = title;
			const iframe = document.createElement("iframe");
			iframe.src = url;
			const a = document.createElement("a");
			a.classList.add("doc-link");
			a.href = "/bible-studies/doc" + i;

			a.append(p);
			a.append(iframe);
			container.append(a);
			getDocs(i + 1);
		}
	} catch (err) {
		return;
	}
}
