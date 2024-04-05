import express from "express";
import {v4 as uuidv4} from 'uuid';
const router = express.Router();

// Mock database
const users = [];

// Getting the list of users from the mock database
router.get("/", (req, res) => {
  res.send(users);
});

// Add user to the list
router.post("/", (req, res) => {
    const user = req.body;
    users.push({ ...user, id: uuidv4() });
    res.send(`${user.first_name} has been added to the Database`);
});

// Get a specific user
router.get('/:id', (req, res) => {
    const { id } = req.params;

    const foundUser = users.find((user) => user.id === id)

    res.send(foundUser)
});


// Delete user from the database
router.delete('/:id', (req, res) => {
    const { id } = req.params;
  
    users = users.filter((user) => user.id !== id)
  
    res.send(`${id} deleted successfully from database`);
  });

  //Update User
  router.patch('/:id', (req, res) => {
    const { id } = req.params;
  
    const { first_name, last_name, email} = req.body;
  
    const user = users.find((user) => user.id === id)
  
    if(first_name) user.first_name = first_name;
    if(last_name) user.last_name = last_name;
    if(email) user.email = email;
  
    res.send(`User with the ${id} has been updated`)
    
  });
export default router;
