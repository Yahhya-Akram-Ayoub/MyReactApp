import React  from 'react';
import axios from 'axios';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';


function  getEmployee(thiss){

    let data = new FormData();
    data.append('Number',10);

    axios.get('https://localhost:44304/api/Employee/getProcAll?Number=10' , data)
        .then(res=> {

          console.log(res);
            thiss.setState({emplotees : res.data});
    })
        .catch(err=>{

    })

}

export default class MainEmployee extends React.Component{

    constructor() {
        super();
        this.state ={
            emplotees:[]
        };
    }

componentDidMount() {
    getEmployee(this);
}


    render() {
        return( <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            subheader={<ListSubheader>Settings</ListSubheader>}
        >


                {
                    this.state.emplotees.map((item,index) =>
                        <ListItem key={index}>
                        <ListItemText  primary={item.EmployeeName} />
                        <ListItemText  primary={item.DepartmentName} />
                        </ListItem>
                    )
                }




        </List>
        );
    }

}
