import App from './App.svelte';
import Entry from './Entry.svelte';

const tasks: Entry[] = [];

let worker = new Worker("build/wasm.js");

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

export default app;