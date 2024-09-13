import { Card, Typography, Divider, Box, TextField, Button, FormControl, FormLabel, RadioGroup, Radio, FormControlLabel } from "@mui/material";
import { Form } from "react-router-dom";
import { useNavigate, useLoaderData } from "react-router-dom";
import { DateCalendar } from "@mui/x-date-pickers";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";

function SetReminder() {
  const navigate = useNavigate();
  const data: any = useLoaderData();
  const method = data ? "PUT" : "POST"
  const date = new Date(data ? data.date : Date.now());
  const formattedToday = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  const [value, setValue] = useState<Dayjs | null>(dayjs(formattedToday));

  console.log(method);

  return(
    <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
      <Card sx={{width: '400px', p: 3}}>
        <Typography variant="h3">New Reminder</Typography>
        <Divider sx={{mb: 2}} />

        <Form method={method} autoComplete="off" id="fake-data-form">
          <Box sx={{display: 'flex', justifyContent: {xs: 'center', sm: 'space-between'}, flexWrap: 'wrap'}}>
            <TextField
              required
              id="reminder-name"
              name="reminderName"
              label="Reminder Name"
              defaultValue={data ? data.name : null}
              fullWidth
              sx={{ mb: 2}}
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                defaultValue={value} 
                value={value}
                onChange={(newValue) => setValue(newValue)}
                disablePast
                sx={{ width: '100%'}}
              />
            </LocalizationProvider>

            <TextField sx={{display: 'none'}} id="date" name="date" value={value} slotProps={{input: {readOnly: true}}}/>

            <FormControl sx={{mt: 2}}>
              <FormLabel>Priority</FormLabel>
              <RadioGroup
                row
                name="isHighPriority"
                defaultValue={data ? data.ishighpriority : false}
              >
                <FormControlLabel value={false} control={<Radio />} label="Low" />
                <FormControlLabel value={true} control={<Radio />} label="High" />
              </RadioGroup>
            </FormControl>

            <Box sx={{width: '100%', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap-reverse', mt: 2}}>
              <Button 
                variant="outlined" 
                color="secondary"
                sx={{width: {xs: '100%', sm: '20%'}}}
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>

              <Button 
                type="submit" 
                variant="outlined" 
                sx={{width: {xs: '100%', sm: '20%'}, ml: {xs: 0, sm: 2}, mb: {xs: 2, sm: 0}}}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Form>
      </Card>
    </Box>
  );
}

export default SetReminder;