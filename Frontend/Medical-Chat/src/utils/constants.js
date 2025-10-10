let runtimeConfig = null;

async function loadRuntimeConfig() {
if (!runtimeConfig) {
    const res = await fetch('/config.json');
    runtimeConfig = await res.json();
}
return runtimeConfig;
}

const { SERVER_URL } = await loadRuntimeConfig();


export const API_BASE =SERVER_URL || 'http://localhost:5000';