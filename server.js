const express = require("express");
const path = require("path");
const Rollbar = require('rollbar')


const rollbar = new Rollbar({
  accessToken: '547834b28454466bb4c3b3104dcf5974',
  captureUncaught: true,
  captureUnhandledRejections: true
})

const app = express();
app.use(express.json());
app.use(rollbar.errorHandler())

let petList = [];

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
  rollbar.info('html file served successfully');
});

app.post("/api/pet", (req, res) => {
    console.log('hit')
  let { name } = req.body;
  name = name.trim();
  const index = petList.findIndex((petName) => {
    return petName === name;
  });

  const myPet = 'Savage'

  if (index === -1 && name !== "") {
    petList.push(name);
    rollbar.log('pet added successfully')
    res.status(200).send(petList);
  } else if (name === "") {
    rollbar.error('no name given')
    res.status(400).send({ error: "no name was provided" });
  } else {
    rollbar.error('pet already exists')
    res.status(400).send({ error: "that pet already exists" });
  }
});

app.get('/api/pets', (req, res) => {
    petWork()
    rollbar.error(`function does not exist`)
    res.status(400).send({error: 'function does not exist'})
})

const port = process.env.PORT || 4545;


app.listen(port, () => console.log(`server running on port ${port}`));