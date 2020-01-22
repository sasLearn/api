const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'api',
  password: 'password',
  port: 5432,
})

const getOrders = (req, res) => {
  pool.query('SELECT * FROM orders ORDER BY orderId ASC', (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
};

const createOrder = (req, res) => {
  const { courseId, email } = req.body

  pool.query('INSERT INTO orders (courseId, email) VALUES ($1, $2)', [courseId, email], (error, results) => {
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