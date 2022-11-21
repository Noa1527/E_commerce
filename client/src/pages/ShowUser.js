import * as React from "react";
import { TextField, NumberInput, SimpleShowLayout, Show, ArrayField, Datagrid, ReferenceField, ReferenceArrayField } from 'react-admin';
// import { UidContext } from '../Hook/AppContext';


export const ShowUser = (props) => {

    return (
        <Show>
            <div>
                <h2 style={{ "text-align": "center", "margin-top": "20px" }}>Informations générales</h2>
                <SimpleShowLayout>
                    <TextField source="id" />
                    <TextField source="email" />
                    <TextField source="roles" />
                    <TextField source="password" />
                </SimpleShowLayout>
            </div>
            <div>
                <h2 style={{ "text-align": "center", "margin-top": "20px" }}>Adresse</h2>
                <SimpleShowLayout>
                    <TextField source="address.id" label="Id" />
                    <TextField source="address.city" label="Ville" />
                    <TextField source="address.zipcode" label="Code postal" />
                    <TextField source="address.street" label="Rue" />
                    <TextField source="address.number" label="Numéro de rue" />
                    <TextField source="address.country" label="Pays" />
                    <TextField source="address.firstname" label="Prénom" />
                    <TextField source="address.lastname" label="Nom" />
                    <TextField source="address.region" label="Région" />
                    <TextField source="address.phone" label="Numéro de télépone" />
                </SimpleShowLayout>
            </div>
            <div>
                <h2 style={{ "text-align": "center", "margin-top": "20px" }}>Commentaires</h2>
                <ReferenceArrayField reference="comments" source="comments">
                    <Datagrid bulkActionButtons={false} rowClick="show">
                        <TextField source="id" />
                        <TextField source="rating" label="Tamere" />
                        <TextField source="comment" label="Commentaire" />
                    </Datagrid>
                </ReferenceArrayField>
            </div>

        </Show>
    )

};