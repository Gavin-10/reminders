const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'gpm',
  host: 'localhost',
  database: 'reminders',
  password: 'password',
  port: 5432,
});

const getReminders = async (req, res) => {
  const resData = {
    "newReminders": [],
    "completedReminders": [],
  };

  try {
    resData.newReminders = (await pool.query('SELECT * FROM reminderessential ORDER BY date ASC')).rows;
    resData.completedReminders = (await pool.query('SELECT * FROM completedreminders')).rows;
  } catch(err) {
    console.log(err);
  }

  console.log(req.url);
  console.log("sending data: \n", resData);

  res.status(200).send(resData);
};

const getReminderById = async (req, res) => {
  const id = parseInt(req.query.id);

  pool.query('SELECT * FROM reminderessential WHERE id = $1', [id], (err, result) => {
    if (err) {
      throw err;
    }

    console.log(req.url);
    console.log("Sending reminder: \n", result.rows);

    res.status(200).json(result.rows);
  });
}

const createReminder = (req, res) => {
  console.log("inserting data: \n", req.body);
  const data = req.body;

  if(req.query.completed) {
    pool.query('INSERT INTO completedreminders(name, date, ishighpriority) VALUES ($1, $2, $3)', [data.name, data.date, data.ishighpriority], (err, result) => {
      if(err) {
        throw err;
      }

      res.status(201).send(`Reminder added with ID: ${result.insertedID}`);
    })

  } else {
    const date = new Date(parseInt(data.date));
    data.date = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

    pool.query('INSERT INTO reminderessential(name, date, ishighpriority) VALUES ($1, $2, $3)', [data.reminderName, data.date, data.isHighPriority], (err, result) => {
      if (err) {
        throw err;
      }

      res.status(201).send(`Reminder added with ID: ${result.insertedID}`);
    });

  }

  res.status(200);
};

const updateReminder = (req, res) => {
  console.log("updating reminder ID: ", req.query.id);
  const data = req.body;
  const date = new Date(parseInt(data.date));
  data.date = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  console.log(data);

  pool.query('UPDATE reminderessential SET name=$1, date=$2, ishighpriority=$3 WHERE id=$4', [data.reminderName, data.date, data.isHighPriority, req.query.id], (err, result) => {
    if (err) {
      throw err;
    }

    res.status(200).send(`Reminder modified with ID: ${req.query.id}`);
  });
}

const deleteReminder = (req, res) => {
  console.log("deleting reminder ID: ", req.query.id);
  const id = req.query.id;

  pool.query('DELETE FROM reminderessential WHERE id = $1', [id], (err, result) => {
    if (err) {
      throw err;
    }

    res.status(200).send(`Reminder deleted with ID: ${id}`);
  });
}

const deleteAllReminders = (req, res) => {
  console.log("deleting all completed reminders");

  pool.query('DELETE FROM completedreminders', [], (err, result) => {
    if (err) {
      throw err;
    }

    res.status(200).send("All completed reminders deleted")
  });
}

module.exports = {
  getReminders,
  getReminderById,
  updateReminder,
  createReminder,
  deleteReminder,
  deleteAllReminders,
}