const express = require("express");
const app = express();
app.use(express.json()); // This should be one of the first middlewares you use.
const cors = require("cors");
app.use(cors());
const pool = require("./db");

//ROUTES//
app.get('/', function (req, res) {
    res.send('Sample Database');
  });

app.post("/postdata", async (req, res) => {
    try {
      let { id, fname, lname, gender, dob, doa, dept, email, nation, address, emergency, csem, percent } = req.body;
      console.log(id, fname, lname, gender, dob, doa, dept, email, nation, address, emergency, csem, percent);
      const newStudent = await pool.query(
        "INSERT INTO student (id, fname, lname, gender, dob, doa, dept, email, nation, address, emergency, csem, percent) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)",
        [id, fname, lname, gender, dob, doa, dept, email, nation, address, emergency, csem, percent]
      );
      res.json(newStudent.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });
  

//get all todos

app.get("/getdata", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM student");
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get a todo

app.get("/getstudent/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const todo = await pool.query("SELECT * FROM student WHERE id = $1", [
      id
    ]);

    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// //update name

app.put("/updatestudent/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const updateStudent = await pool.query(
        "UPDATE student SET name = $1 WHERE id = $2",
        [name, id]
      );

      if (updateStudent.rowCount === 0) {
        return res.status(404).json("Student not found");
      }
  
      res.json("Student was updated!");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });
  

// //delete a todo

app.delete("/deletestudent/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletestudent = await pool.query("DELETE FROM student WHERE id = $1", [
      id
    ]);
    res.json("Student was deleted!");
  } catch (err) {
    console.log(err.message);
  }
});

// Operations
app.post("/executequery", async (req, res) => {
    try {
      const { sqlQuery } = req.body;
      const result = await pool.query(sqlQuery);
      res.json(result.rows);
    } catch (err) {
      console.error(err); // Log the entire error
      res.status(500).send("Error executing query: " + err.message);
    }
  });
  
  
app.listen(5000, () => {
  console.log("server has started on port 5000");
});