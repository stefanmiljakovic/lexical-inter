import express from "express";
import bodyParser from "body-parser";
import {BNFLexer} from "./token";
import {BNFParser} from "./parser";

let app = express();
let port = 3000;

app.use(bodyParser());

app.post('/parse', (req, res) => {
    if (!req.body || !req.body.text || typeof req.body.text !== "string")
        res.send("Invalid argument supplied to body.text;");

    let text = req.body.text;

    let result = BNFLexer.tokenize(text);
    let parser = new BNFParser();

    parser.input = result.tokens;

    let data = (parser as any).main() || parser.errors;

    res.send(data);
});

app.post('/lex', (req, res) => {
    if (!req.body || !req.body.text || typeof req.body.text !== "string")
        res.send("Invalid argument supplied to body.text;");

    let text = req.body.text;

    let tokened = BNFLexer.tokenize(text);
    let response = tokened.tokens.map(value => {
        if(value.tokenType) {
            let tokenType = value.tokenType.name || 'undefined';
            let val = value.tokenType.LABEL;
            return {
                type: tokenType,
                image: val
            }
        }
    });
    res.send(response);
});

app.listen(port, () => {
    console.log(`Server started on ${port}.`);
});