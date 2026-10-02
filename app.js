const http = require("http");

const PORT = process.env.PORT || 3000;
const APP_ENV = process.env.APP_ENV || "DEV";

const server = http.createServer((req, res) => {
    res.writeHead(200, {
        "Content-Type": "text/html"
    });

    res.end(`
        <h1>Hello this is ${APP_ENV} env ITCAMPUSGURU </h1>
        <p>Application deployed using GitHub Actions → AWS EC2</p>
        <p>Environment: <strong>${APP_ENV}</strong></p>
    `);
});

server.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${APP_ENV}`);
});


// const express = require("express");

// const app = express();

// const PORT = process.env.PORT || 3000;
// const ENV = process.env.APP_ENV || "DEV";

// app.get("/", (req, res) => {
//   res.send(`Hello Team - Environment: ${ENV}`);
// });

// app.get("/health", (req, res) => {
//   res.status(200).send("OK");
// });

// app.listen(PORT, () => {
//   console.log(`Application running on port ${PORT}`);
// });

