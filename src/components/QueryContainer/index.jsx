import React from 'react';
import { TextField, Button } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import "./QueryContainer.css";

function DrawerComponent({ handleInputChange, handleSubmit, inputText }) {
  return (
    <div className='add-drawer'>
        <TextField
            label="Enter Prompt"
            variant="outlined"
            fullWidth
            value={inputText}
            onChange={handleInputChange}
            className='prompt'
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
            Generate&nbsp; <AutoAwesomeIcon />
        </Button>
    </div>
  );
}

export default DrawerComponent;