import * as React from "react";
import { List, Datagrid, TextField, EmailField } from 'react-admin';

export const UserList = (props) => {
    
    return (
    <List {...props}>
        <Datagrid rowClick="show">
            <TextField source="id" />
            <EmailField source="email" />
            <TextField source="address.firstname" label="Prénom" />
            <TextField source="address.lastname" label="Nom" />
            <TextField source="address.phone" label="Numéro de téléphone" />
        </Datagrid>
    </List>
    )
    
};