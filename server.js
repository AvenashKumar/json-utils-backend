'use strict';

import Express from "express";
import YML from "yaml";
import XML2JS from "xml2js";
import cors from 'cors';
import js2xmlparser from 'js2xmlparser';
import xmlFormatter from 'xml-formatter';

// Constants
const PORT = process.env.PORT || 4000;
const HOST = '0.0.0.0';

// App
const app = Express();
app.use(Express.json());
app.use(Express.urlencoded({extended: true}));
app.use(cors());

function json2yml(jsonStr, indent){
    const doc = new YML.Document({indent: indent});
    doc.contents = JSON.parse(jsonStr);
    return doc.toString();
}

app.get("/json-utils/api/v1/health", (req, res)=>{
    res.json({"server": "UP"});
});

app.post("/json-utils/api/v1/json2yml/indent/:indent", Express.text({type: '*/*'}), (req, res)=>{
    const yml = json2yml(req.body, Number(req.params.indent));
    res.send(yml);
});

app.post("/json-utils/api/v1/yml2json/indent/:indent", Express.text({type: '*/*'}), (req, res)=>{
    const jsonObj = YML.parse(req.body);
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

app.post("/json-utils/api/v1/xml2yml/indent/:indent", Express.text({type: '*/*'}), (req, res)=>{
    const xml = req.body;
    XML2JS.parseString(xml, (err, result) => {
        if(err) {
            throw err;
        }
        const indent = Number(req.params.indent);
        const json = JSON.stringify(result, null, indent);
        const yml = json2yml(json, indent)
        res.send(yml);        
    });
});

app.post("/json-utils/api/v1/xml/beautify/indent/:indent", Express.text({type: '*/*'}), (req, res)=>{
    const xml = req.body;
    const indent = Number(req.params.indent);
    var beautifiedXml = xmlFormatter(xml, {
        indentation: ' '.repeat(indent), 
        filter: (node) => node.type !== 'Comment', 
        collapseContent: true, 
        lineSeparator: '\n'
    });
    res.header("Content-Type",'application/xml');
    res.send(beautifiedXml);
});

app.post("/json-utils/api/v1/xml/minify", Express.text({type: '*/*'}), (req, res)=>{
    const xml = req.body;
    var minifiedXml = xmlFormatter(xml, {
        indentation: '', 
        filter: (node) => node.type !== 'Comment', 
        collapseContent: true, 
        lineSeparator: ''
    });
    res.header("Content-Type",'application/xml');
    res.send(minifiedXml);
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