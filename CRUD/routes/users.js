import express from "express"

// Router handler - generally useful for 
// implementation of modularization Concept
const router = express.Router();

// Mock database
const users = [
    {
      first_name: 'John',
      last_name: 'Doe',
      email: 'johndoe@example.com',
    },
    {
      first_name: 'Alice',
      last_name: 'Smith',
      email: 'alicesmith@example.com',
    },
  ];

  // Get route
  router.get("/",(req,res) => {
    res.send(users)
  })

  // POST route 
  router.post('/', (req, res) => {

    const user = req.body;

    users.push({ ...user, id: uuidv4() });

    res.send(`${user.first_name} has been added to the Database`);
})

  // Get user by ID - 

  router.get('/:id', (req, res) => {
    const { id } = req.params;

    const foundUser = users.find((user) => user.id === id)

    res.send(foundUser)
});

// Delete user by ID - 
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  users = users.filter((user) => user.id !== id)

  res.send(`${id} deleted successfully from database`);
});

// Update user by ID - 

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

  