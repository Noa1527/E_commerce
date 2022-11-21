import * as React from "react";
import { List, Datagrid, TextField, EmailField, Edit, SimpleForm, TextInput, NumberInput, ArrayInput, SimpleFormIterator, TabbedForm, FormTab, Toolbar } from 'react-admin';


export const UpdateCartProduct = (props) => {
    
        return (
            <Edit>
                <SimpleForm>
                    <TextInput source="id" />
                </SimpleForm>
            </Edit>
    )

};