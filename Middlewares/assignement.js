const express = require('express');
const app = express();
const port = 3000;


// Create a middleware that counts total number of requests sent to a server.
// Also create an endpoint that exposes it

let requestCount = 0;

app.use((req,res,next) => {
    requestCount++;
    console.log(`Total requests: ${requestCount}`);
    next();
})

app.get("/sum", function(req, res) {
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    res.json({
        ans: a + b
    })
});
app.get("/requestCount", (req, res) => {
    res.json({ totalRequests: requestCount });
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});