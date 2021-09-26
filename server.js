'use strict';

import Express from "express";
import YAML from "yaml";

// Constants
const PORT = process.env.PORT || 4000;
const HOST = '0.0.0.0';

// App
const app = Express();
app.use(Express.json());
app.use(Express.urlencoded({extended: true}));

app.get("/json-utils/api/v1/health", (req, res)=>{
    res.json({"server": "UP"});
});

app.post("/json-utils/api/v1/json2yaml/indent/:indent", (req, res)=>{
    const doc = new YAML.Document({indent: Number(req.params.indent)});
    doc.contents = req.body;
    res.send(doc.toString());
});


app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);