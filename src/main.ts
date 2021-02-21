import App from './App.svelte';
import Entry from './Entry.svelte';

const tasks: Entry[] = [];

for(let i = 0; i < 5; i++)
{
	tasks.push(new Entry({
		target: document.querySelector("#work-table"),
		props: {
			taskName: "...",
			currentWorkers: 0,
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

function buf2hex(buffer) { // buffer is an ArrayBuffer
	return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('');
}

socket.addEventListener('message', (e) => {
	let message = JSON.parse(e.data);
	//console.log(message);
	let hashes = message.hashes;
	for(let i = 0; i < hashes.length && i < tasks.length; i++)
	{
		//console.log(buf2hex(hashes[i].hash.slice(0,3)))
		tasks[i].$$set({
			taskName: buf2hex(hashes[i].hash.slice(0,3)) + "...",
			timesServed: hashes[i].served,
			currentWorkers: hashes[i].nodes.length,
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