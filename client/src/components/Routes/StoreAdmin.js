import { Admin, Resource } from 'react-admin';
import dataProvider from '../../providers/dataProvider';
import {UserList} from '../../pages/UserList';
import { UpdateUser } from '../../pages/UpdateUser';
import { ShowUser  } from '../../pages/ShowUser';
import { CartList } from '../../pages/CartList';
import { ShowCart } from '../../pages/ShowCart';
import { ProductList } from '../../pages/PorductList';
import { UpdateCartProduct } from '../../pages/UpdateCartProduct';
import { ShowProduct } from '../../pages/ShowProduct';
import { UpdateProduct } from '../../pages/UpdateProduct';
import { CategoryList } from '../../pages/CategoryList';
import { ShowCategory } from '../../pages/ShowCategory';
import { UpdateCategory } from '../../pages/UpdateCategory';
import { CommentList } from '../../pages/CommentList';
import { ShowComment } from '../../pages/showComment';
import { UpdateComment } from '../../pages/UpdateComment';
import { CreateProduct } from '../../pages/CreateProduct';

export const StoreAdmin = () => (
    <Admin basename='/admin' dataProvider={dataProvider}>
        <Resource name="/users" list={UserList} edit={UpdateUser} show={ShowUser} options={{label: "Utilisateurs"}} />
        <Resource name="/carts" list={CartList} show={ShowCart} options={{label: "Paniers"}} />
        <Resource name="/cartProducts"  edit={UpdateCartProduct}  />
        <Resource name="/products" list={ProductList} show={ShowProduct} edit={UpdateProduct} create={CreateProduct} options={{label: "Produits"}} />
        <Resource name="/categories" list={CategoryList} show={ShowCategory} edit={UpdateCategory} options={{label: "Categories"}} />
        <Resource name="/comments" list={CommentList} show={ShowComment} edit={UpdateComment} options={{label: "Commentaires"}} />
      </Admin>
);