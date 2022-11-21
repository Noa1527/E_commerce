import { fetchUtils } from 'react-admin';
import { stringify } from 'query-string';

const apiUrl = 'http://127.0.0.1:8000/api';
// const httpClient = fetchUtils.fetchJson;

const httpClient = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    if (options.token) {
        options.headers.set('Authorization', `Bearer ${options.token}`);
    }
    
    return fetchUtils.fetchJson(url, options);
};

const dataProvider= {
    getList: (resource, params) => {
        let url = apiUrl
        console.log("getList");
       
        switch (resource) {
            case '/users':
                url += '/admin/user/list'
                break;
            case '/orders':
                url += '/admin/order/list'
                break;
            case '/carts':
                url += '/admin/carts'
                break;
            case '/products':
                url += '/product/list'
                break;
            case '/categories':
                url += '/categories'
                break;
            case '/comments':
                url += '/comments'
                break;
            default:
                break;
        }
        
        return httpClient(url, {token: localStorage.getItem("token")}).then(({ headers, json }) => ({
            data: json,
            total: 300,

        }));
    },

    getOne: (resource, params) => {
        let url = apiUrl
        console.log("getOne");
       
        switch (resource) {
            case '/users':
                url += '/admin/user/' + params.id
                break;
            case '/orders':
                url += '/admin/order/' + params.id
                break;
            case '/carts':
                url += '/admin/cart/' + params.id
                break;
            case '/cartProducts':
                url += '/admin/cartProduct/' + params.id
                break;
            case '/products':
                url += '/product/' + params.id
                break;
            case '/categories':
                url += '/category/' + params.id
                break;
            case '/comments':
                url += '/comment/' + params.id
                break;
            default:
                break;
        }

        return httpClient(url, {token: localStorage.getItem("token")}).then(({ json }) => ({
            data: json,
    }))
},

    getMany: (resource, params) => {
        let url = apiUrl
        console.log("getMany");
        console.log(resource);
        console.log(params)
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        switch (resource) {
            case 'users':
                url += `/admin/user?filter=${query.filter}`
                break;
            case 'orders':
                url += '/admin/order/' + params.id
                break;
            case 'carts':
                url += '/admin/cart/' + params.id
                break;
            case 'cartProducts':
                url += '/admin/cartProduct/' + params.id
                break;
            case 'products':
                url += `/admin/product?filter=${query.filter}`
                break;
            case 'categories':
                url += `/category?filter=${query.filter}`
                break;
            case '/categories':
                url += `/category?filter=${query.filter}`
                break;
            case 'comments':
                url += `/comment?filter=${query.filter}`
                break;
            default:
                break;
        }
        
        return httpClient(url, {token: localStorage.getItem("token")}).then(({ json }) => ({ data: json }));
    },

    getManyReference: (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        console.log("getManyReference");
        
        const query = {
            // sort: JSON.stringify([field, order]),
            // range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            // filter: JSON.stringify({
            //     ...params.filter,
            //     [params.target]: params.id,
            // }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;

        return httpClient(url).then(({ headers, json }) => ({
            data: json,
            total: parseInt(headers.get('content-range').split('/').pop(), 10),
        }));
    },

    update: (resource, params) => {
        let url = apiUrl
        console.log("update");
        console.log(params);
        switch (resource) {
            case '/users':
                url += '/admin/user/' + params.id
                break;
            case '/orders':
                url += '/admin/order/' + params.id
                break;
            case '/carts':
                url += '/admin/cart/' + params.id
                break;
            case '/cartProducts':
                url += '/admin/cartProduct/' + params.id
                break;
            case '/products':
                url += '/admin/product/' + params.id
                let data = new FormData();
                let stringableData = {}
                for (const [key, value] of Object.entries(params.data)) {
                    if (key === "photos") {
                        value.forEach((photo, key) => {
                            data.append(`photo${key}`, photo.rawFile)
                        })
                    } else {
                        if (value !== [] && value !== "" && value !== 'list') {
                            stringableData[key] = value
                        }
                    }
                }
                stringableData.category = params.data.list  
                data.append("data", JSON.stringify(stringableData))

                return httpClient(url, {
                    token: localStorage.getItem("token"),
                    method: 'POST',
                    body: data,
                }).then(({ json }) => ({ data: json }))
            case '/categories':
                url += '/category/' + params.id
                break;
            default:
                break;
        }

        return httpClient(url, {
            token: localStorage.getItem("token"),
            method: 'PUT',
            body: JSON.stringify(params.data),

        }).then(({ json }) => ({ data: json }))
    },

    updateMany: (resource, params) => {
        console.log("updateMany");

        const query = {
            filter: JSON.stringify({ id: params.ids}),
        };

        return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json }));
    },

    create: (resource, params) => {
        let url = apiUrl
        console.log("create");

        switch (resource) {
            case '/users':
                url += '/admin/user'
                break;
            case '/orders':
                url += '/admin/order'
                break;
            case '/carts':
                url += '/admin/cart'
                break;
            case '/cartProducts':
                url += '/admin/cartProduct'
                break;
            case '/products':
                url += '/admin/product'
                let data = new FormData();
                let stringableData = {}
                for (const [key, value] of Object.entries(params.data)) {
                    if (key === "photos") {
                        value.forEach((photo, key) => {
                            data.append(`photo${key}`, photo.rawFile)
                        })
                    } else {
                        if (value !== [] && value !== "" && value !== 'list') {
                            stringableData[key] = value
                        }
                    }
                }
                stringableData.category = params.data.list  
                data.append("data", JSON.stringify(stringableData))

                return httpClient(url, {
                    token: localStorage.getItem("token"),
                    method: 'POST',
                    body: data,
                }).then(({ json }) => ({ data: json }))
            case '/categories':
                url += '/category/' + params.id
                break;
            default:
                break;
        }

        return httpClient(url, {
            method: 'POST',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({
            data: { ...params.data, id: json.id },
        }))
    },

    delete: (resource, params) => {
        let url = apiUrl
        console.log("delete");
        
        switch (resource) {
            case '/users':
                url += '/admin/user/' + params.id
                break;
            case '/orders':
                url += '/admin/order/' + params.id
                break;
            case '/carts':
                url += '/admin/cart/' + params.id
                break;
            case '/cartProducts':
                url += '/admin/cartProduct/' + params.id
                break;
            case '/products':
                url += '/product/' + params.id
                break;
            case '/categories':
                url += '/category/' + params.id
                break;
            default:
                break;
        }

        return httpClient(url, {
            token: localStorage.getItem("token"),
            method: 'DELETE',
        }).then(({ json }) => ({ data: json }))
    },

    deleteMany: (resource, params) => {
        let url = apiUrl
        console.log("deleteMany");
        const ids = JSON.stringify({ id: params.ids})
        switch (resource) {
            case '/users':
                url += '/admin/user?ids=' + ids
                break;
            case '/orders':
                url += '/admin/order?ids=' + ids
                break;
            case '/carts':
                url += '/admin/cart?ids=' + ids
                break;
            case '/cartProducts':
                url += '/admin/cartProduct?ids=' + ids
                break;
            case '/products':
                url += '/product?ids=' + ids
                break;
            case '/categories':
                url += '/categories?ids=' + ids
                break;
            default:
                break;
        }

        const query = {
            filter: JSON.stringify({ id: params.ids}),
        };
        return httpClient(url, {
            token: localStorage.getItem("token"),
            method: 'DELETE',
        }).then(({ json }) => ({ data: json }));
    }
};

/**
 * Convert a `File` object returned by the upload input into a base 64 string.
 * That's not the most optimized way to store images in production, but it's
 * enough to illustrate the idea of data provider decoration.
 */
 const convertFileToBase64 = file =>
 new Promise((resolve, reject) => {
     const reader = new FileReader();
     reader.onload = () => resolve(reader.result);
     reader.onerror = reject;

     reader.readAsDataURL(file.rawFile);
 });

export default dataProvider;