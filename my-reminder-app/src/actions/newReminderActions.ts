import { redirect } from "react-router-dom";
import { getReminder } from "./pageLoader";
import axios from "axios";

const url = 'http://localhost:3000/reminders';

export async function reminderData({ params }: any) {
  if (params.reminderId == -1) {
    return null;
  }

  const data = await getReminder(params.reminderId);

  return data;
}


export async function addReminder({ request, params }: any) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  if(params.reminderId == -1) {
    await axios.post(url, data).then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log(error);
    }).finally(() => {
      console.log("post request completed");
    });

  } else {
    await axios.put(`${url}?id=${params.reminderId}`, data).then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log(error);
    }).finally(() => {
      console.log("put request complete");
    });

  }

  return redirect("/");
}