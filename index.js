const serverless = require("serverless-http");
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());

app.use(bodyParser.json());

const db = mysql.createPool({
  connectionLimit:10,
  host: 'datapalooza.cflnkjzdabyk.ap-south-1.rds.amazonaws.com',
  port: '3306',
  user: 'admin',
  password: 'admin123',
  database: 'datapalooza'
});

// db.connect(err => {
//   if (err) {
//     console.error('Error connecting to MySQL database:', err.message);
//   } else {
//     console.log('Connected to MySQL database');
//   }
// });

db.query(`
  CREATE TABLE IF NOT EXISTS Doctor (
    doctor_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    specialization VARCHAR(255) NOT NULL,
    contact_number VARCHAR(20) NOT NULL,
    location VARCHAR(255) NOT NULL,
    hospital_name VARCHAR(255),
    updates TEXT
    )`);

db.query(`
  CREATE TABLE IF NOT EXISTS User (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    contact_number VARCHAR(20),
    age INT,
    gender VARCHAR(10),
    updates TEXT
  )`);

db.query(`
  CREATE TABLE IF NOT EXISTS Appointment (
    appointment_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    doctor_id INT,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    location VARCHAR(255),
    symptoms TEXT,
    result TEXT,
    FOREIGN KEY (user_id) REFERENCES User(user_id),
    FOREIGN KEY (doctor_id) REFERENCES Doctor(doctor_id)
  )`);

// db.query(`
//   CREATE TABLE IF NOT EXISTS Prescription (
//     prescription_id INT AUTO_INCREMENT PRIMARY KEY,
//     appointment_id INT,
//     medication TEXT,
//     instructions TEXT,
//     FOREIGN KEY (appointment_id) REFERENCES Appointment(appointment_id)
//   )`);

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the backend!' });

})

app.post('/doctors', (req, res) => {
try {
    const { name, specialization,email, contactNumber,location, hospitalName, password } = req.body;
    db.query('INSERT INTO Doctor (name, specialization, contact_number, location, hospital_name,password,email) VALUES (?, ?, ?, ?, ?, ?, ?)', [name, specialization, contactNumber,location,hospitalName,password,email], (err, results) => {
      if (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ doctor_id: results.insertId });
    });
} catch (error) {
  res.status(500).json({ error: error.message});
}
});

app.get('/doctors', (req, res) => {
try {
    const { location } = req.query;
    const query = location ? 'SELECT * FROM Doctor WHERE location = ?' : 'SELECT * FROM Doctor';
    db.query(query, [location], (err, results) => {
      if (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(results);
    });
} catch (error) {
  res.status(500).json({ error: error.message});
}
});


app.post('/users', (req, res) => {
try {
    const { name, email, contact_number,location,age,gender,password } = req.body;
    db.query('INSERT INTO User (name, email, contact_number,location,age,gender, password) VALUES (?, ?, ?, ?, ?, ?, ?)', [name, email, contact_number,location,age,gender, password], (err, results) => {
      if (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ user_id: results.insertId });
    });
} catch (error) {
  res.status(500).json({ error: error.message});
}
});

app.get('/users', (req, res) => {
try {
    const {queryKey,queryValue} = req.query;
    const query = queryKey ? `SELECT * FROM User WHERE ${queryKey} = ?` : 'SELECT * FROM User';
    db.query(query, [queryValue], (err, results) => {
      if (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(results);
    });
} catch (error) {
  res.status(500).json({ error: error.message});
}
});

app.post('/login', (req, res) => {
try {
    const { email, password,type } = req.body;
    db.query(`SELECT * FROM ${type} WHERE email = ? AND password = ?`, [email, password], (err, results) => {
      if (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
      } else if (results.length === 0) {
        res.status(401).json({ error: 'Invalid email or password' });
      } else {
        res.json(results[0]);
      }
    });
} catch (error) {
  res.status(500).json({ error: error.message});
  
}
}
);

app.post('/appointments/book', (req, res) => {
try {
    const { user_id,  appointment_date, appointment_time, symptoms } = req.body;
  
    db.query('SELECT location FROM User WHERE user_id = ?', [user_id], (err, userResults) => {
      if (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
        return;
      }
  
      const location = userResults[0].location;
  
      db.query('INSERT INTO Appointment (user_id, appointment_date, appointment_time, location, symptoms) VALUES (?, ?, ?, ?, ?)', [user_id,  appointment_date, appointment_time, location, symptoms], (err, results) => {
        if (err) {
          console.error(err.message);
          res.status(500).json({ error: err.message });
          return;
        }
        res.json({ appointment_id: results.insertId });
      });
    });
} catch (error) {
  res.status(500).json({ error: error.message});
  
}
});

app.post('/appointments/result', (req, res) => {
try {
    const { appointment_id, result } = req.body;
    db.query('UPDATE Appointment SET result = ? WHERE appointment_id = ?', [result, appointment_id], (err, results) => {
      if (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ appointment_id: results.insertId });
    });
} catch (error) {
  res.status(500).json({ error: error.message});
}
});

app.post('/appointments/assign', (req, res) => {
 try {
   const { appointment_id, doctor_id } = req.body;
   db.query('UPDATE Appointment SET doctor_id = ? WHERE appointment_id = ?', [doctor_id, appointment_id], (err, results) => {
     if (err) {
       console.error(err.message);
       res.status(500).json({ error: err.message });
       return;
     }
     res.json({ appointment_id: results.insertId });
   });
 } catch (error) {
    res.status(500).json({ error: error.message});
 }
})

app.get('/appointments', (req, res) => {

  try {
    var { user_id, doctor_id } = req.query;

  if (user_id) {
    db.query('SELECT * FROM Appointment WHERE user_id = ?', [user_id], (err, results) => {
      if (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(results);
    });
    return;
  }
  else if (doctor_id) {
    db.query('SELECT * FROM Appointment WHERE doctor_id = ?', [doctor_id], (err, results) => {
      if (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(results);
    });
    return;
  }
  db.query('SELECT * FROM Appointment', (err, results) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
  } catch (error) {
    res.status(500).json({ error: error.message});
  }
});

// app.post('/prescriptions', (req, res) => {
//     const { appointment_id, medication, instructions } = req.body;
//     db.query('INSERT INTO Prescription (appointment_id, medication, instructions) VALUES (?, ?, ?)', [appointment_id, medication, instructions], (err, results) => {
//       if (err) {
//         console.error(err.message);
//         res.status(500).json({ error: err.message });
//         return;
//       }
//       res.json({ prescription_id: results.insertId });
//     });
//   });
  
//   app.get('/prescriptions/:appointment_id', (req, res) => {
//     const appointment_id = req.params.appointment_id;
//     db.query('SELECT * FROM Prescription WHERE appointment_id = ?', [appointment_id], (err, results) => {
//       if (err) {
//         console.error(err.message);
//         res.status(500).json({ error: err.message });
//         return;
//       }
//       res.json(results);
//     });
//   });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports.handler = serverless(app);
