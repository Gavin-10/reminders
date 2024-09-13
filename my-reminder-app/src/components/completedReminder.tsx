import { Card, Typography } from "@mui/material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

function CompletedReminder({data}: any) {
  console.log(data.ishighpriority);
  return(
    <Card sx={{mt: 2, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '60px'}}>
      <CheckCircleOutlineIcon sx={{mr: 2}} color={data.ishighpriority ? "error" : "success"}/>
      <Typography variant="body1" align="left" width='100%'>{data.name}</Typography>
    </Card>
  );
}

export default CompletedReminder;