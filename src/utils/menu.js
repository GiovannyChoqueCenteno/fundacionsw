import {routes} from "./constants.js";
export const menuOptionsToClient=[
    {
        path:routes.home,
        title:'Inicio'
    },
    {
        path:routes.categories,
        title:'Categorias'
    },
    {
        path:routes.departments,
        title:'Departamentos'
    },
    {
        path:routes.registerFoundation,
        title:'Mi fundación'
    }
]

export const menuOptionsToAdmin=[
    {
        path:routes.adminRequests,
        title:'Solicitudes'
    },
    {
        path:routes.adminCategories,
        title:'Categorias'
    },
    {
        path:routes.adminDepartments,
        title:'Departamentos'
    },
];