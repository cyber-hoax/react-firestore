# store data in firestore via form in react and Material UI

save the contact form details in firestore

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### step 1.

Let's cretae new creact app and install the firebase and material ui in the project 
>  npx create-react-app projectName

>  npm install -s firebase
  
>  npm install -s @material-ui/core 
  
>  npm install -s @material-ui/styles   




### step 2.

create a firebase.js file for all the firebase config

it lloks kie this:

```javascript       
import firebase from 'firebase/app'
import firestore from 'firebase/firebase-firestore'


const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firstore()

```

note: firebase config can be found under the project setting in firebase

### step 3. 

create a form to collect data from user and update in firestore

``` javascript  
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
            message submitted successfully!
          </Alert>
        </Snackbar>
      </div>
```

note: snackbar is for alert that the user data is submitted successfuly 


### now we write me make state for our form input so we can capture on change values from the input field and write firestore command to save data in

``` javascript   


const classes = useStyle()
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [open, setOpen] = useState(false)
    
    
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

```

### create a function for snackbar 
```javascript
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
```

### for styling the elements

we use makesStyles function from material to design our form

``` javascript 

const useStyle = makeStyles((theme) => ({
    root:{
        width:"450px",
        marginTop:"150px",
        marginLeft:"600px"
        
    }
}))
```

note: we call usestyle ()
 by using other variable(in this case i use classes = useStyles())
 
 So hats it everyon. 
 Hope you Enjoy!

