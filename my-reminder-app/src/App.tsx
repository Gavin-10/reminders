import { Box, Divider } from "@mui/material"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import AddAlertIcon from '@mui/icons-material/AddAlert';
import Card from "@mui/material/Card"
import Grid2 from "@mui/material/Grid2"
import NewReminder from "./components/newReminder"
import CompletedReminder from "./components/completedReminder"
import { useNavigate, useLoaderData } from "react-router-dom"
import { Reminder } from "./reminder"
import { useState } from "react"
import { deleteReminder, completeReminder } from "./actions/reminderActions"

function App() {
  const data: any = useLoaderData();
  const [newReminders, setNewReminders] = useState<Reminder[]>(data.newReminders as Reminder[]);
  const [completedReminders, _] = useState<Reminder[]>(data.completedReminders as Reminder[]);
  const navigate = useNavigate();

  const deleteHandler = (id: number) => {
    deleteReminder(id);
    const newData: Reminder[] = newReminders.filter((element: Reminder) => element.id != id);
    setNewReminders(newData);
  }

  const completed = (data: Reminder) => {
    completeReminder(data);
    const completedReminder = newReminders.find((element: Reminder) => element.id == data.id);
    completedReminder!.completed = true;
    completedReminders.push(completedReminder!);

    const editedNewReminders = newReminders.filter((element: Reminder) => !element.completed);
    setNewReminders(editedNewReminders);
  }

  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{background: '#212121'}} elevation={1}>
        <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="add-reminder"
            sx={{ mr: 2 }}
            onClick={() => navigate("/form/-1")}
          >
            <AddAlertIcon />
          </IconButton>
          <Typography variant="h6" component="div">
            Reminders
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>

    <Grid2 container spacing={2} sx={{mx: 2, mt: 5}}>
      <Grid2 size={{xs: 12, sm: 6}} sx={{display: 'flex', justifyContent: 'end', flexGrow: 1}}>
        <Card elevation={3} sx={{px: 2, py: 3, maxWidth: '400px', width: '100%', height: '700px'}}>
          <Typography variant="h4">To-Do</Typography>
          <Divider />
          {
            newReminders.map((element: Reminder, index: number) => (
              <NewReminder data={element} key={index} onDelete={() => deleteHandler(element.id)} onComplete={() => completed(element)} />
            ))
          }
        </Card>
      </Grid2>
      <Grid2 size={{xs: 12, sm: 6}}>
        <Card elevation={3} sx={{px: 2, py: 3, maxWidth: '400px', height: '700px', overflow: 'auto'}}>
          <Typography variant="h4">Completed</Typography>
          <Divider />
          {
            completedReminders.map((element: Reminder, index: number) => (
              <CompletedReminder data={element} key={index} />
            ))
          }
        </Card>
      </Grid2>
    </Grid2>
    </>
  )
}

export default App
