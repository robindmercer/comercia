import React from 'react'

import Landing from '../components/Landing/Landing'


function HandleRoutes() {

    const routes = [
        {
            path: "/",
            element: <Landing />,
            exact: true,
            private: true,
        }
    ]
    return routes;
};


export default HandleRoutes;
