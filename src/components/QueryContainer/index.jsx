import React from 'react';
import { List, ListItem, TextField, Button } from '@mui/material';

function DrawerComponent({ handleInputChange, handleSubmit, inputText }) {

  return (
    <div>
      <List>
        <ListItem>
          <TextField
            label="Enter Text"
            variant="outlined"
            fullWidth
            value={inputText}
            onChange={handleInputChange}
          />
        </ListItem>
        <ListItem>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </ListItem>
      </List>
    </div>
  );
}

export default DrawerComponent;