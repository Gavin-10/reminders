import axios from "axios";
import { Reminder } from "../reminder";

const url = 'http://localhost:3000/reminders';

export async function completeReminder(data: Reminder) {

  try {
    await deleteReminder(data.id);

    const newData = data;
    newData.completed = true;
    await axios.post(`${url}?completed=${newData.completed}`, newData).then((response) => {
      console.log(response);
    }).catch((error) => {
      console.error(error);
      throw error;
    }).finally(() => {
      console.log("reminder completed");
    });
  } catch (error) {
    console.error("an error occured");
    console.error(error);
  }

}

export async function deleteReminder(id: number) {
  await axios.delete(`${url}?id=${id}`).then((response) => {
    console.log(response);
  }).catch((error) => {
    console.error(error);
    throw error;
  }).finally(() => {
    console.log("delete request completed");
  });

  console.log("reminder deleted");
}

export async function deleteAllReminders() {
  await axios.delete(url).then((response) => {
    console.log(response);
  }).catch((error) => {
    console.error(error);
    throw error;
  }).finally(() => {
    console.log("delete request complete");
  })
}