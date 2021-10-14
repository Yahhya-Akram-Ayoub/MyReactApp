import React from 'react';
import {makeStyles } from 'useStyles';
import { create } from 'jss';
import { StylesProvider, jssPreset } from '@mui/styles';
import rtl from 'jss-rtl';


// A style sheet
const useStyles = makeStyles({
    root: {}, // a style rule
    label: {}, // a nested style rule
});

const jss = create({
    plugins: [...jssPreset().plugins, rtl()],
});



class MainThemeSettings extends React.Component{

    constructor() {
        super();

    }

    render() {
        return(<>

        </>);
    }

}

export default theme;
