 const body = document.getElementsByTagName("body")[0];
 const rand = Math.floor(Math.random() * (7 - 1) + 1);
 body.style.backgroundImage = "url('../images/pic" + rand + ".jpg')";
 const wrapper = document.getElementById("wrapper")

const titleURL = window.location.href + "/title";
const titleResponse = await fetch(titleURL);
const title = await titleResponse.text();
const p = document.getElementById("title");
p.innerHTML = title;

const contentURL = window.location.href + "/html";
const iframe = document.createElement("iframe");
iframe.src = contentURL;
wrapper.append(iframe);
