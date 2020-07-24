const url = 'https://injection-labels-server.irvinfiz.now.sh/graph';
const opts = {
    method: "POST",
    headers: { "Content-Type": "application/json" }
};

const hr_server = 'https://hr-app-server.adrian-injection.vercel.app/graph';
// const hr_server = 'http://localhost:4000/graph';
const hr_opts = {
    method: "POST",
    headers: { "Content-Type": "application/json" }
};

export { url, opts, hr_server, hr_opts }