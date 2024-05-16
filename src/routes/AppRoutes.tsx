import Loader from "@/components/common/Loader";
import AppLayout from "@/components/layouts/AppLayout";
// import MainLayout from "@/components/layouts/MainLayout";
import Booking from "@/pages/booking/Booking";
import GroupAppointmentPage from "@/pages/booking/GroupAppointment/GroupAppointmentPage";
import MainScreen from "@/pages/screens/MainScreen";
import { Suspense, lazy } from "react";
import { Navigate, RouteObject } from "react-router-dom";

const MainLayout = lazy(() => import('@/components/layouts/MainLayout'))
const Services = lazy(() => import('@/pages/booking/SingleAppointment/Services'))
const Professionals = lazy(() => import('@/pages/booking/SingleAppointment/Professionals'))
const Time = lazy(() => import('@/pages/booking/SingleAppointment/Time'))
const ProfessionalService = lazy(() => import('@/pages/booking/SingleAppointment/SelectProfessional/ProfessionalService'))

export const routeObjects: RouteObject[] = [
  { 
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Suspense fallback={<Loader />}><MainScreen /></Suspense>,
      },
      {
        path: "booking",
        element: <AppLayout />,
        children: [
          {
            path: "appointment",
            element: <Booking />,
            children: [
              {
                index: true,
                element: <Navigate to={'services'} />,
                
              },
              {
                index: true,
                path:'services',
                element: <Suspense fallback={<Loader />}> <Services /></Suspense>
              },
              {
                path: "professionals",
                element: <Suspense fallback={<Loader />}> <Professionals/> </Suspense>
    
              },
              {
                path: "professionals-by-service",
                element: <Suspense fallback={<Loader />}> <ProfessionalService/> </Suspense>
    
              },
              {
                path: "time",
                element: <Suspense fallback={<Loader />}>  <Time/> </Suspense>
    
              },
            ]
          },
          {
            path: "group-appointment",
            element: <GroupAppointmentPage />,
          },
        ],
      },
    ],
  },
];
