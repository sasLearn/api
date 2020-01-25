// const Pool = require('pg').Pool
const pg = require('pg');

// const pool = new Pool({
//   user: 'me',
//   host: 'localhost',
//   database: 'api',
//   password: 'password',
//   port: 5432,
// })

const conString = "postgres://warshzea:R3yColCYNC6RjLLNUx3Ztrfwsfz7SN0N@baasu.db.elephantsql.com:5432/warshzea" //Can be found in the Details page
const client = new pg.Client(conString);
client.connect(function(err) {
  if(err) {
    return console.error('could not connect to postgres', err);
  }
})

const getAllCourses = (req, res) => {
  client.query('SELECT * FROM courses ORDER BY courseId ASC', (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
}

const getSingleCourse = (req, res) => {
  const id = parseInt(req.params.id)

  client.query('SELECT * FROM courses WHERE courseId = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
}

// const createUser = (req, res) => {
//   const { name, email } = req.body

//   pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
//     if (error) {
//       throw error
//     }
//     res.status(201).send(`User added with ID: ${results.insertId}`)
//   })
// }

// const updateUser = (req, res) => {
//   const id = parseInt(req.params.id)
//   const { name, email } = req.body

//   pool.query(
//     'UPDATE users SET name = $1, email = $2 WHERE id = $3',
//     [name, email, id],
//     (error, results) => {
//       if (error) {
//         throw error
//       }
//       res.status(200).send(`User modified with ID: ${id}`)
//     }
//   )
// }

// const deleteUser = (req, res) => {
//   const id = parseInt(req.params.id)

//   pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
//     if (error) {
//       throw error
//     }
//     res.status(200).send(`User deleted with ID: ${id}`)
//   })
// }

module.exports = {
  getAllCourses,
  getSingleCourse,
  // createUser,
  // updateUser,
  // deleteUser,
}