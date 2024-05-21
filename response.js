const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

app.post('/curl', (req, res) => {
    const { command } = req.body;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            res.status(500).send({ error: stderr });
            return;
        }

        res.send({ output: stdout });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
