const express = require('express');
const router = express.Router();
const { getReminders, getReminderById, createReminder, deleteReminder, updateReminder } = require('./reminderDriver');

router.route("/")
.get((req, res) => {
  const id = parseInt(req.query.id);
  console.log(id);
  if(req.query.id != undefined) {
    getReminderById(req, res);
  } else {
    getReminders(req, res);
  }
})
.put(updateReminder)
.post(createReminder)
.delete(deleteReminder)

module.exports = router;