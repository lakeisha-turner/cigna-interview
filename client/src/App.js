import React, {useState, useEffect} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import FilterListIcon from '@material-ui/icons/FilterList';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  inline: {
    display: 'inline',
  },
}));

function App() {
  const classes = useStyles();
  const [filteredList, setFilteredList] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const fetchDoctors = async() =>  {
    fetch('/doctors')
     .then(res =>  res.json())
     .then(docs => {setDoctors(docs); setFilteredList(docs);})

   }

   const filterList = (event) => {
      const searchParam = event.target.value.toLowerCase();
      let resultsArray = [];
      doctors.forEach(obj => {
        if(obj.name.toLowerCase().includes(searchParam) || obj.specialty.toLowerCase().includes(searchParam)){
          resultsArray.push(obj)
        }
      });
      setFilteredList(resultsArray);
   }
  
  useEffect(() => {
    fetchDoctors();
    }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Grid container spacing={3} justifyContent="center" alignItems="center">
          <Grid item xs={12}>
            <Typography variant="h3" component="h3">
              <Box textAlign="center" m={1}>
                Medical Doctors
              </Box>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Paper component="form" className={classes.root}>
            <IconButton type="submit" className={classes.iconButton} aria-label="search">
                <FilterListIcon />
              </IconButton>
              <InputBase
                className={classes.input}
                placeholder="Filter Doctors"
                inputProps={{ 'aria-label': 'filter doctors' }}
                onChange={filterList}
              />
            </Paper>
          </Grid>
          <List className={classes.root}>
          {filteredList.map(doctor => (
            <Grid item xs={12}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt={doctor.name}>
                    {doctor.name.substring(0,2).toUpperCase()}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={doctor.name}
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        {doctor.specialty}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider />
            </Grid>
          ))}
          </List>
        </Grid>
      </Container>
      </React.Fragment>
  );
}

export default App;
