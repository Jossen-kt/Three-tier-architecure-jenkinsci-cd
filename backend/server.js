require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();

app.use(cors());
app.use(express.json());

const pool = new Pool({
	  host: process.env.DB_HOST,
	  database: process.env.DB_NAME,
	  user: process.env.DB_USER,
	  password: process.env.DB_PASSWORD,
	  port: process.env.DB_PORT
});
app.listen(process.env.APP_PORT, () => {
	  console.log(`Backend running on port ${process.env.APP_PORT}`);
	  console.log("DB_HOST =", process.env.DB_HOST);
	  console.log("DB_NAME =", process.env.DB_NAME);
	  console.log("APP_PORT =", process.env.APP_PORT);
});



app.get("/users", async (req, res) => {
	  try {
		      const result = await pool.query(
			            "SELECT * FROM users ORDER BY id"
			          );

		      res.json(result.rows);
		    } catch (err) {
			        console.error(err);
			        res.status(500).send("Database Error");
			      }
});




app.post("/users", async (req, res) => {
	  try {
		      const { name, email } = req.body;

		      const result = await pool.query(
			            "INSERT INTO users(name,email) VALUES($1,$2) RETURNING *",
			            [name, email]
			          );

		      res.status(201).json(result.rows[0]);

		    } catch (err) {
			        console.error(err);
			        res.status(500).send("Database Error");
			      }
});




app.put("/users/:id", async (req, res) => {

	  try {

		      const { id } = req.params;
		      const { name, email } = req.body;

		      const result = await pool.query(
			            `UPDATE users
				           SET name=$1,email=$2
					          WHERE id=$3
						         RETURNING *`,
			            [name, email, id]
			          );

		      res.json(result.rows[0]);

		    } catch (err) {

			        console.error(err);
			        res.status(500).send("Database Error");
			      }
});




app.delete("/users/:id", async (req, res) => {

	  try {

		      const { id } = req.params;

		      await pool.query(
			            "DELETE FROM users WHERE id=$1",
			            [id]
			          );

		      res.send("User Deleted");

		    } catch (err) {

			        console.error(err);
			        res.status(500).send("Database Error");
			      }
});


app.listen(5555, () => {
	  console.log("Backend running on port 5555");
});
