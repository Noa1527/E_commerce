import * as React from "react";
import { TextField, NumberInput, SimpleShowLayout, Show, ArrayField, Datagrid, ReferenceArrayField } from 'react-admin';
// import { UidContext } from '../Hook/AppContext';


export const ShowCart = (props) => {

    return (
        <Show>
            <SimpleShowLayout>
                <TextField source="id_user" label="Id de l'utilisateur" />
                <TextField source="email_user" label="Email de l'utilisateur" />
                <TextField source="amount" label="Nombre de produits dans le panier" />
                {/* <ArrayField source="cart">
                    <Datagrid rowClick={onRowClick} resource='admin/cartProducts'>
                        <TextField source="id" label="Id du produit" />
                        <TextField source="amount" label="Nombre de produits commandés" />
                        <TextField source="product.name" label="Nom du produit" />
                    </Datagrid>
                </ArrayField> */}
                <div>
                    <h2 style={{ "text-align": "center", "margin-top": "20px" }}>Produits</h2>
                    <ReferenceArrayField reference="products" source="id_products">
                        <Datagrid bulkActionButtons={false} rowClick="show">
                            <TextField source="id" />
                            <TextField source="name" label="Nom" />
                            <TextField source="price" label="Prix" />
                        </Datagrid>
                    </ReferenceArrayField>
                </div>
            </SimpleShowLayout>
        </Show>
    )

};