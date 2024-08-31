const express = require('express');
const app = express();
const fs = require('fs');
app.use(express.json())
let arr = [];
app.get('/items', (req, res) => {
    fs.readFile('data.json', (err, data) => {
        if (err) return "error creating";
        res.json(JSON.parse(data));
    });
});

app.post('/items', (req, res) => {
    fs.readFile('data.json', (err, data) => {
        if (err) { return "error creating"; }
        // const newItem = req.body;
        if (data) {
             arr = JSON.parse(data);   
        }
        arr.push(req.body);
        fs.writeFile('data.json', JSON.stringify(arr), (err) => {
            if (err) { return "error writing"; }
            else { 
                res.send(arr);
            }
        });
    });
});

app.get('/items/:id', (req, res) => {
    fs.readFile('data.json', (err, data) => {
        const items = JSON.parse(data);
        const item = items.find(i => i.id == parseInt(req.params.id));
        res.json(item)
    });
});

app.delete('/items/:id', (req, res) => {
    fs.readFile('data.json', (err, data) => {
        if (err) { return "error creating" }
        let items = JSON.parse(data);
        items = items.filter(i => i.id !== parseInt(req.params.id));
        fs.writeFile('data.json', JSON.stringify(items), (err) => {
            if (err) return "error writing";
            res.send();
        });
    });
});


app.listen(3006, () => {
    console.log('listening on port 3006')
});