import * as React from "react";
import { List, Datagrid, TextField, EmailField, ArrayField } from 'react-admin';

export const CartList = (props) => {
    
    return (
        <List {...props}>
            <Datagrid rowClick="show">
                <TextField source="id_user" label="Id de l'utilisateur"/>
                <TextField source="email_user" label="Email de l'utilisateur"/>
                <TextField source="amount" label="Nombre de produits" />
            </Datagrid>
        </List>
    )
};