import Loader from "@/components/common/Loader";
import AppLayout from "@/components/layouts/AppLayout";
// import MainLayout from "@/components/layouts/MainLayout";
import Booking from "@/pages/booking/Booking";
import GroupBooking from "@/pages/booking/GroupAppointment/GroupBooking";
import MainScreen from "@/pages/screens/MainScreen";
import { Suspense, lazy } from "react";
import { Navigate, RouteObject } from "react-router-dom";

const MainLayout = lazy(() => import('@/components/layouts/MainLayout'))
// SINGLE SERVICE SELECTION COMPONENT
const Services = lazy(() => import('@/pages/booking/SingleAppointment/Services'))
const Professionals = lazy(() => import('@/pages/booking/SingleAppointment/Professionals'))
const Time = lazy(() => import('@/pages/booking/SingleAppointment/Time'))
const ProfessionalService = lazy(() => import('@/pages/booking/SingleAppointment/SelectProfessional/ProfessionalService'))

// GROUP SERVICE SELECTION COMPONENT

// const GroupBooking = lazy(() => import('@/pages/booking/GroupAppointment/GroupBooking'))
const GroupBookingServices = lazy(() => import('@/pages/booking/GroupAppointment/GroupBookingServices'))
const GroupBookingAddGuest = lazy(() => import('@/pages/booking/GroupAppointment/GroupBookingAddGuest'))
const GroupBookingProfessionals = lazy(() => import('@/pages/booking/GroupAppointment/GroupBookingProfessionals'))
const GroupBookingTime = lazy(() => import('@/pages/booking/GroupAppointment/GroupBookingTime'))
const GroupBookingProfessionalService = lazy(() => import('@/pages/booking/GroupAppointment/GroupBookingSelectProfessional/ProfessionalService'))

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
            element: <GroupBooking />,
            children: [
              {
                index: true,
                element: <Navigate to={'services'} />,
                
              },
              {
                index: true,
                path:'services',
                element: <Suspense fallback={<Loader />}> <GroupBookingServices /></Suspense>
              },
              {
                index: true,
                path:'add-guest',
                element: <Suspense fallback={<Loader />}> <GroupBookingAddGuest /></Suspense>
              },
              {
                path: "professionals",
                element: <Suspense fallback={<Loader />}> <GroupBookingProfessionals/> </Suspense>
    
              },
              {
                path: "professionals-by-service",
                element: <Suspense fallback={<Loader />}> <GroupBookingProfessionalService/> </Suspense>
    
              },
              {
                path: "time",
                element: <Suspense fallback={<Loader />}>  <GroupBookingTime/> </Suspense>
    
              },
            ]
          },
        ],
      },
    ],
  },
];
