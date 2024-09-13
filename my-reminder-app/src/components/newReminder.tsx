import { Card, IconButton, Typography } from "@mui/material";
import AdjustIcon from '@mui/icons-material/Adjust';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from "@mui/material/styles";
import Stack, { StackProps } from '@mui/material/Stack';
import { useNavigate } from "react-router-dom";

const MyStack = styled(Stack)<StackProps>(({theme}) => `
  opacity: 0;
  transition: ${theme.transitions.create(['opacity'], {
    duration: theme.transitions.duration.standard,
  })};
  &:hover {
    opacity: 1;
  }`
)

function NewReminder({ data, onComplete, onDelete}: any) {
  const navigate = useNavigate();
  const URL = `/form/${data.id}`;

  return(
    <Card sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, mt: 2, height: '60px'}}>
      <AdjustIcon sx={{mr: 2}} color={data.ishighpriority ? "error" : "info"}/>
      <Typography variant="body1" width='100%' align="left">{data.name}</Typography>
      <MyStack direction='row' spacing={0}>
        <IconButton color="success" onClick={onComplete}>
          <CheckCircleIcon />
        </IconButton>
        <IconButton onClick={() => navigate(URL)}>
          <EditIcon />
        </IconButton>
        <IconButton color="error" onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
      </MyStack>
    </Card>
  );
}

export default NewReminder;