import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CloseBtn from '../close_btn/CloseBtn.jsx';


export default function AddressForm({onChange}) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
       Direccion de envío: 
      </Typography>
      <Grid container spacing={3}>
        
        <Grid item xs={12}>
          <TextField
            required
            id="address"
            name="address"
            label="Direccion"
            fullWidth
            autoComplete="shipping address-line1"
            onChange={(e) => {onChange(e)}}

          />
        </Grid>
        
      </Grid>
    </React.Fragment>
  );
}