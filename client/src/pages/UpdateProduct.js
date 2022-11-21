import * as React from "react";
import { List, Datagrid, TextField, EmailField, Edit, SimpleForm, TextInput, NumberInput, SelectArrayInput, ReferenceInput, SelectInput, ImageInput, ImageField } from 'react-admin';


export const UpdateProduct = (props) => {
    
        return (
            <Edit>
                <SimpleForm>
                    <TextField source="id" label="ID" />
                    <TextInput source="name" label="Nom" />
                    <TextInput source="description" label="Description" multiline/>
                    <NumberInput source="price" label="Prix" />
                    <NumberInput source="weight" label="Poids" />
                    <NumberInput source="inventory" label="Nombre d'article en stock" defaultValue="1" />
                    <ReferenceInput reference="/categories" source="list" label="Categories">
                        <SelectInput optionText="name" optionValue="id" label="Catégories"/>
                    </ReferenceInput>
                    <ImageInput source="photos" label="Photos" accept="images/*, .png, .jpg, .jpeg, .gif, .webp" placeholder={<p>Glissez votre image ici ou cliquez pour l'ajouter.</p>} multiple={true}>
                        <ImageField source="fullUrl"/>
                    </ImageInput>
                </SimpleForm>
            </Edit>
    )

};