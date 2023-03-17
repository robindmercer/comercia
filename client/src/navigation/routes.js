import React from 'react'

import Layout from '../components/Layout'
import Landing from '../components/Landing/Landing'


function HandleRoutes() {

    const routes = [
        {
            path: "/",
            element: <Landing />,
            exact: true,
            private: true,
        },
        {
            path: "/layout",
            element: <Layout />,
            exact: true,
            private: true,
        }
    ]
    return routes;
};


export default HandleRoutes;
