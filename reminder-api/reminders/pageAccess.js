const express = require('express');
const router = express.Router();
const { getReminders, getReminderById, createReminder, deleteReminder, updateReminder, deleteAllReminders } = require('./reminderDriver');

router.route("/")
.get((req, res) => {
  if(req.query.id != undefined) {
    getReminderById(req, res);
  } else {
    getReminders(req, res);
  }
})
.put(updateReminder)
.post(createReminder)
.delete((req, res) => {
  if(req.query.id != undefined) {
    deleteReminder(req, res);
  } else {
    deleteAllReminders(req, res);
  }
})

module.exports = router;