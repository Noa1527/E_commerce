import * as React from "react";
import { TextField, NumberInput, SimpleShowLayout, Show, ArrayField, Datagrid } from 'react-admin';
// import { UidContext } from '../Hook/AppContext';


export const ShowOrder = (props) => {

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
                <h2 style={{ "text-align": "center", "margin-top": "20px" }}>Commandes</h2>
                <SimpleShowLayout>
                    <ArrayField source="orders">
                            <TextField source="id" label="Id" />
                            <TextField source="state" label="État de la commande" />
                            <div>
                            <ArrayField source="orders.products">
                                    <TextField source="order.id" label="Id" />
                                    <TextField source="order.name" label="name" />
                            </ArrayField>
                            </div>
                    </ArrayField>
                </SimpleShowLayout>
            </div>
        </Show>
    )

};