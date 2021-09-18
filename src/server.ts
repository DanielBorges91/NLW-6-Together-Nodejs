import express from 'express';

const app = express();

app.get("/test", (request, response) => {
 return response.json({message: "Hello world!"});
});

app.post("/test-post", (request, response) => {
 return response.send("Olá Daniel");
});

app.listen(3000, () => {
 console.log("🚀 Server started on port 3000!");
});
