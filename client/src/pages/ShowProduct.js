import * as React from "react";
import { TextField, NumberInput, SimpleShowLayout, Show, ArrayField, Datagrid, ReferenceField, ReferenceOneField, List, ImageField, SingleFieldList } from 'react-admin';

export const ShowProduct = (props) => {

    return (
        <Show>
            <SimpleShowLayout>
                <TextField source="id" />
                <TextField source="name" label="Nom" />
                <TextField source="description" label="Description" />
                <TextField source="price" label="Prix" />
                <TextField source="weight" label="Poids" />
                <TextField source="photo" label="Photo" />
                <ReferenceField source="category.category_id" reference="categories" label="Catégorie">
                    <TextField source="name" />
                </ReferenceField>
                <ArrayField source="photos" label="Images" >
                    <SingleFieldList>
                        <ImageField source="fullUrl" sx={{ '& img': {maxWidth: 200, maxHeight: 200, pt: 2}}} />
                        {/* <TextField source="url" /> */}
                    </SingleFieldList>
                </ArrayField>
            </SimpleShowLayout>
        </Show>
    )

};