
import MainScreen from '@/pages/screens/MainScreen';
import { Navigate, RouteObject } from 'react-router-dom';

export const routeObjects: RouteObject[] = [



    {
        index: true,
        element: <Navigate to="Main" replace />,
    },
    {
        path: '/main',
        element: <MainScreen />,
        children: [
            {
                index: true,
                element: <Navigate to='service' replace />,

            },
            {

            }
        ]
    }
];