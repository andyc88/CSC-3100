import express from "express";
import cors from "cors";
import userServices from "./services/user-services.js"

const app = express();
const port = 8000;

//enable all CORS requests
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello, World!");
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; 
  userServices.findUserById(id)
  .then((result) => {
    if (result === null) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
  })
  .catch((error) => {
    res.status(500).send("Server error.")
  });
});

app.post("/users", (req, res) =>{
  const usersToAdd = req.body
  const newuser = addUser(usersToAdd);
  res.status(201).send(newuser);
})

app.delete("/users/:id", (req, res) =>{
  const userToDel = req.params.id;
  const found = findUserById(userToDel);

  if (found == undefined){
    res.status(404).send();
  } else {
    delUser(userToDel);
    res.status(204).send();
  }
})


app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job
  if (name !== undefined && job !== undefined){
    let result = findUserByNameJob(name, job);
    result = { users_list: result };
    res.send(result);
  } else if (name !== undefined) {
    let result = findUserByName(name);
    result = {users_list: result };
    res.send(result);
  } else {
    res.send(users);
  }
  
}) 