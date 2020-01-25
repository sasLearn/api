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

const getOrders = (req, res) => {
  client.query('SELECT * FROM orders ORDER BY orderId ASC', (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
};

const createOrder = (req, res) => {
  const { courseId, email } = req.body

  client.query('INSERT INTO orders (courseId, email) VALUES ($1, $2)', [courseId, email], (error, results) => {
    if (error) {
      throw error
    }
    res.status(201).send(`Order Placed`);
  })
}

module.exports = {
  getOrders,
  createOrder
}