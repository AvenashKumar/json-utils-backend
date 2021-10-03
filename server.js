'use strict';

import Express from "express";
import YAML from "yaml";
import XML2JS from "xml2js";
import cors from 'cors';
import js2xmlparser from 'js2xmlparser';

// Constants
const PORT = process.env.PORT || 4000;
const HOST = '0.0.0.0';

// App
const app = Express();
app.use(Express.json());
app.use(Express.urlencoded({extended: true}));
app.use(cors());

app.get("/json-utils/api/v1/health", (req, res)=>{
    res.json({"server": "UP"});
});

app.post("/json-utils/api/v1/json2yaml/indent/:indent", Express.text({type: '*/*'}), (req, res)=>{
    const doc = new YAML.Document({indent: Number(req.params.indent)});
    doc.contents = JSON.parse(req.body);
    res.send(doc.toString());
});

app.post("/json-utils/api/v1/yaml2json/indent/:indent", Express.text({type: '*/*'}), (req, res)=>{
    const jsonObj = YAML.parse(req.body);
    const formattedJson = JSON.stringify(jsonObj, null, Number(req.params.indent));
    res.header("Content-Type",'application/json');
    res.send(formattedJson);
});

app.post("/json-utils/api/v1/xml2json/indent/:indent", Express.text({type: '*/*'}), (req, res)=>{
    const xml = req.body;
    XML2JS.parseString(xml, (err, result) => {
        if(err) {
            throw err;
        }
        const json = JSON.stringify(result, null, Number(req.params.indent));
        res.header("Content-Type",'application/json');
        res.send(json);        
    });
});

app.post("/json-utils/api/v1/json2xml/indent/:indent", Express.text({type: '*/*'}), (req, res)=>{
    const json = JSON.parse(req.body);
    const options = {
        declaration:{
            encoding: "UTF-8"
        }
    }
    const xml = js2xmlparser.parse("root", json, options);
    res.header("Content-Type",'application/xml');
    res.send(xml);
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);