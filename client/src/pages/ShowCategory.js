import * as React from "react";
import { TextField, NumberInput, SimpleShowLayout, Show, ArrayField, Datagrid } from 'react-admin';

export const ShowCategory = (props) => {

    return (
        <Show>
            <SimpleShowLayout>
                <TextField source="id" />
                <TextField source="name" label="Nom" />
                <TextField source="amount" label="Nombre de produits dans le panier" />
            </SimpleShowLayout>
        </Show>
    )

};