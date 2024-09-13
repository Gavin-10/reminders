import { LoadData } from '../loadData';
import { Reminder } from '../reminder';
import axios from 'axios';

const url = 'http://localhost:3000/reminders';

export async function loader() {
  const data: LoadData = await axios.get(url).then((response) => {
    return response.data;
  }).catch((error) => {
    console.log(error);
    return {
      "newReminders": [],
      "completedReminders": [],
    };
  }).finally(() => {
    console.log("get request completed");
  });

  console.log(data);
  
  return data;
}

export async function getReminder(id: number) {
  const data: Reminder[] = await axios.get(`${url}?id=${id}`).then((response) => {
    return response.data;
  }).catch((error) => {
    console.log(error);
    return null;
  }).finally(() => {
    console.log("get request completed");
  });

  console.log(data);

  return data[0];
}