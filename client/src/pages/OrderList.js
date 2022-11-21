import * as React from "react";
import { List, Datagrid, TextField, EmailField } from 'react-admin';

export const OrderList = (props) => {
    
    return (
    <List {...props}>
        <Datagrid rowClick="show">
            <TextField source="id" />
            <EmailField source="state" />
        </Datagrid>
    </List>
    )
    
};