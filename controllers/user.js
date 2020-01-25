const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// const { Pool } = require('pg');
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

const getUsers = (req, res) => {
  client.query('SELECT * FROM users ORDER BY userId ASC', (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
};

const signUp = (req, res) => {
    bcrypt.hash(req.body.password, 10, function(err, hash) {
      const { email } = req.body;
    
      client.query('INSERT INTO users (email, password) VALUES ($1, $2)', [email, hash], (error, results) => {
        if (error) {
          res.send(error.detail);
          return console.log('error', error);
        }
        res.status(201).json({msg: 'user created'});
      })        
    });
};

const login = (req, res) => {
    const { email, password } = req.body;

    client.query('SELECT * FROM users WHERE (email = $1)', [email], (err, results) => {
        if (err) {
            return console.log('error', err);
        }

        if (results.rows.length > 0) {
            const { password: hash } = results.rows[0];

            bcrypt.compare(password, hash, function(err, response) {
              if(response) {
                const token = jwt.sign({ email, password }, 'RANDOM_TOKEN_SECRET', { expiresIn: '24h' });
                res.json({
                  status: 200,
                  token
                })
              } else {
               res.json({error: 'Password is incorrect'})
              } 
            });
        } else {
            res.json({error: "Email is not registered"})
        }


    });

};


module.exports = {
    getUsers,
    signUp,
    login
};