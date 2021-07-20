const express = require("express");
const path = require("path");
// require rollbar below
const Rollbar = require('rollbar')
// create the Rollbar class below
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
  // send rollbar some info
  rollbar.info('html file served successfully');
});

app.post("/api/pet", (req, res) => {
  let { name } = req.body;
  name = name.trim();

  const index = petList.findIndex((petName) => {
    return pettName === name;
  });

  const myPet = 'Savage'

  if (index === -1 && name !== "") {
    petList.push(name);
    // add rollbar log here
    rollbar.log('pet added successfuly', {author: `${myPet}`, type: 'manual'})

    res.status(200).send(petList);
  } else if (name === "") {
    // add a rollbar error here
    rollbar.error('no name given')

    res.status(400).send({ error: "no name was provided" });
  } else {
    // add a rollbar error here too
    rollbar.error('pet already exists')

    res.status(400).send({ error: "that pet already exists" });
  }
});

app.get('/api/pets', (req, res) => {
    petWork()
    rollbar.error(`function does not exist`)
})

const port = process.env.PORT || 4545;

// add rollbar errorHandler middleware here

app.listen(port, () => console.log(`server running on port ${port}`));