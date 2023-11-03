const express = require('express')
const Filegenerator = require('./generateFile');
const InputGenerator = require('./generateInput');
const out = require('./generateoutput')
const cors = require('cors')
const app = express()

app.use(express.urlencoded({ extended: 'true' }));
app.use(express.json())
app.use(cors());

app.get('/', (req, res, next) => {
    res.send("hello world")
})

app.post('/run', async (req, res, next) => {
    const { language, code, input } = req.body
    if (code === undefined) {
        res.status(400).json({ "error": "Code must be provided" })
    }

    const filepath = await Filegenerator.generateFile(language, code);
    const inputpath = await InputGenerator.generateFile("in",input);
    
    const o = out.exceute(filepath,inputpath).then((stdout) => {
      console.log(stdout);
      return res.json({
        filepath, stdout
    })
    }).catch((error) => {
        console.error(error);
    });
    
})

app.listen(5000, () => {
    console.log("Server running")
})