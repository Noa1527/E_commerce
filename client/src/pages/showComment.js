import * as React from "react";
import { TextField, NumberInput, SimpleShowLayout, Show, ArrayField, Datagrid, ReferenceField } from 'react-admin';

export const ShowComment = (props) => {

    return (
        <Show>
            <SimpleShowLayout>
                <TextField source="id" />
                <TextField source="comment" label="Commentaire" />
                <TextField source="rating" label="Evaluation" />
                <ReferenceField source="product.id" reference="products" label="Produit">
                    <TextField source="name" />
                </ReferenceField>
                <ReferenceField source="user.id" reference="users" label="Utilisateur">
                    <TextField source="email" />
                </ReferenceField>
            </SimpleShowLayout>
        </Show>
    )

};