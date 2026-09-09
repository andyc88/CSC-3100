import express from "express";

const app = express();
const port = 8000;

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor",
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer",
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor",
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress",
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender",
    },
  ],
};

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello, World!");
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})

//find UserByName helper -> used in get/users endpoint
const findUserByName = (name) => {
  return users["users_list"].filter((user) => user["name"] === name);
};

//find userByID helper function + endpoint
const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

//POST endpoint + helper
const addUser = (user) => {
  users["users_list"].push(user);
  return user 
}

app.post("/users", (req, res) =>{
  const usersToAdd = req.body
  addUser(usersToAdd);
  res.send();
})

//Delete endpoint
const delUser = (id) =>{
  users["users_list"] = users["users_list"].filter((user) => {
    return user.id !== id;
  });
}

app.delete("/users/:id", (req, res) =>{
  const userToDel = req.params.id
  delUser(userToDel);
  res.send();
})

//name + job matching
const findUserByNameJob = (name, job) => {
  return users.users_list.filter((user) => {
    return user.name === name && user.job === job;
  })
}

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