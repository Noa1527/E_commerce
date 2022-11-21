import * as React from "react";
import { List, Datagrid, TextField, EmailField } from 'react-admin';

export const CommentList = (props) => {
    
    return (
    <List {...props}>
        <Datagrid rowClick="show">
            <TextField source="id" />
            <TextField source="comment" label="Commentaire"/>
            <TextField source="rating" label="Note"/>
            <TextField source="product.name" label="Produit"/>
            <TextField source="user.email" label="Utilisateur"/>
        </Datagrid>
    </List>
    )
    
};