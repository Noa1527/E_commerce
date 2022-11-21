import * as React from "react";
import { List, Datagrid, TextField, EmailField } from 'react-admin';

export const CategoryList = (props) => {
    
    return (
    <List {...props}>
        <Datagrid rowClick="show">
            <TextField source="id" />
            <TextField source="name" label="Nom"/>
        </Datagrid>
    </List>
    )
    
};