import * as React from "react";
import { List, Datagrid, TextField, EmailField, Edit, SimpleForm, TextInput, NumberInput, ArrayInput, SimpleFormIterator, TabbedForm, FormTab, Toolbar } from 'react-admin';
// import { UidContext } from '../Hook/AppContext';


export const UpdateOrder = (props) => {
    
    return (
        <Edit>
            <TabbedForm>
                <FormTab label="Informations générales">
                    <NumberInput source="id" />
                    <TextInput source="email" />
                    <TextInput source="roles" />
                    <TextInput source="password" />
                </FormTab>
                <FormTab label="Adresse">
                    <TextInput source="address.id" label="Id" />
                    <TextInput source="address.city" label="Ville" />
                    <TextInput source="address.zipcode" label="Code postal" />
                    <TextInput source="address.street" label="Rue" />
                    <TextInput source="address.number" label="Numéro de rue" />
                    <TextInput source="address.country" label="Pays" />
                    <TextInput source="address.firstname" label="Prénom" />
                    <TextInput source="address.lastname" label="Nom" />
                    <TextInput source="address.region" label="Région" />
                    <TextInput source="address.phone" label="Numéro de télépone" />
                </FormTab>
                <FormTab label="Commandes">
                    <ArrayInput source="orders">
                        <SimpleFormIterator disableAdd disableRemove>
                            <NumberInput source="id" />
                            <TextInput source="state" />
                        </SimpleFormIterator>
                    </ArrayInput>

                </FormTab>
            </TabbedForm>
        </Edit>
    )

};