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
  userServices.addUser(usersToAdd)
  .then((newuser) => {
    res.status(201).send(newuser);
  })
  .catch((error) => {
    res.status(500).send("Server error.")
  })
})


app.delete("/users/:id", (req, res) =>{
  const userToDel = req.params.id;
  userServices.removeUser(userToDel)
    .then((result) => {
      if (result === null) {
        res.status(404).send();
      } else {
        res.status(204).send();
      }
    })
    .catch((error) => {
      res.status(500).send("Server error.")
    })
})


app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  userServices.getUsers(name, job)
    .then((result) => {
      res.send({users_list: result});
    })
    .catch((error) => {
      res.status(500).send();
    });
})