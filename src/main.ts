import App from './App.svelte';
import Entry from './Entry.svelte';

const tasks: Entry[] = [];

for(let i = 0; i < 5; i++)
{
	tasks.push(new Entry({
		target: document.querySelector("#work-table"),
		props: {
			taskName: `${i}`,
			timesServed: 0,
			timesCompleted: 0,
			leadingSolution:  "[Pending]"
		}
	}));
}

let worker = new Worker("build/wasm.js");

let socket = new WebSocket("ws://localhost:8080");
socket.addEventListener('open', () => {
	console.log("Opened client connection.")
});

socket.addEventListener('message', (e) => {
	let message = JSON.parse(e.data);
	console.log(message);
	let hashes = message.hashes;
	for(let i = 0; i < hashes.length && i < tasks.length; i++)
	{
		tasks[i].$$set({
			timesServed: hashes[i].served,
			timesCompleted: hashes[i].completed,
			leadingSolution: hashes[i].completed > 0 ? hashes[i].text : "[Pending]"
		});
	}
});

socket.addEventListener('close', () => {
	console.log("Socket closed.")
});


setInterval(() => {
	socket.send("fetch")
}, 5000);

export default app;