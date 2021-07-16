import React from 'react';
import PeopleIcon from '@material-ui/icons/People';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';

export default function Routes(props) {
  return(
    <List>
      <Link to='/login' style={{ textDecoration: 'none', color: 'black' }}>
        <ListItem button key='dashboard'>
          <ListItemIcon><DashboardIcon /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
      </Link>

      <Link to='/users' style={{ textDecoration: 'none', color: 'black' }}>
        <ListItem button key='users'>
          <ListItemIcon><PeopleIcon /></ListItemIcon>
          <ListItemText primary="Users" />
        </ListItem>
      </Link>
    </List>
  );
}

