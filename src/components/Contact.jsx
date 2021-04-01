import React, {useState} from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {db} from '../firebase'
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

import MuiAlert from '@material-ui/lab/Alert';



const useStyle = makeStyles((theme) => ({
    root:{
        width:"450px",
        marginTop:"150px",
        marginLeft:"600px"
        
    }
}))

const Contact = () => {

    const classes = useStyle()
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [open, setOpen] = useState(false)


    
    const handleClose = (e, reason) =>{
        if (reason === 'clickaway'){
           return(
               console.log("working")
           ) 
        }
        setOpen(false)
    }

    function Alert(props) {
      return <MuiAlert elevation={6} variant='filled' {...props} />;
    }

    const onSubmitHandler = (e) =>{
        e.preventDefault()
        db.collection('contact').add({
            name: name,
            email:email,
            message :message,
        })
        .then(() => {
            setOpen(true);
        })
        .catch((error) =>{
            alert(error.message)
        })
      
       setName("")
       setEmail("")
       setMessage("")
       
    }

    return (
      <div class={classes.root}>
        <Typography variant='h3'>contact us</Typography>
        <br />
        <br />
        <br />
        <form noValidate=''>
          <Grid
            container
            direction='column'
            justify='center'
            alignItems='center'
          >
            <Grid container item>
              <TextField
                require={true}
                id='name'
                label='Name'
                variant='outlined'
                autoComplete='new-name'
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <br />
            <br />
            <Grid container item>
              <TextField
                required
                id='email'
                label='Email'
                variant='outlined'
                autoComplete='new-email'
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <br />
            <br />
            <Grid container item>
              <TextField
                required
                id='message'
                label='Message'
                fullWidth
                multiline
                rows={4}
                value={message}
                variant='outlined'
                onChange={(e) => setMessage(e.target.value)}
              />
            </Grid>
            <br />
            <br />
            <br />
            <br />
            <Grid container item>
              <Button
                variant='contained'
                fullWidth
                color='primary'
                onClick={onSubmitHandler}
              >
                Submit
              </Button>

              
            </Grid>
          </Grid>
        </form>

        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity='success'>
            This is a success message!
          </Alert>
        </Snackbar>
      </div>
    );
}

export default Contact
