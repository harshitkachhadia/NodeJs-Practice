const express = require('express');
const app = express();
const cors = require('cors');
const port = 3001;

app.use(express.json());
app.use(cors());

app.post('/sum',(req,res) => {
    const a = parseInt(req.body.a);
    const b = parseInt(req.body.b);
    res.json({ sum: a + b });
})
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});