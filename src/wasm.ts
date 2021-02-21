// @ts-ignore
import wasm from "../../PAC/Cargo.toml";

async function loadWasm() {
    const exports = await wasm();
    exports.initialize();
}

loadWasm();