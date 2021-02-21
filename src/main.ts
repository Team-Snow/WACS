import App from './App.svelte';
import Entry from './Entry.svelte';
import wasm from "../../PAC/Cargo.toml";

async function loadWasm() {
	const exports = await wasm();
	exports.initialize();
}
loadWasm();

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

export default app;