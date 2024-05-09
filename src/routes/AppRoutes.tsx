import AppLayout from "@/components/layouts/AppLayout";
import MainLayout from "@/components/layouts/MainLayout";
import GroupAppointmentPage from "@/pages/booking/GroupAppointment/GroupAppointmentPage";
import Services from "@/pages/booking/SingleAppointment/Services";
import MainScreen from "@/pages/screens/MainScreen";
import { RouteObject } from "react-router-dom";

export const routeObjects: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <MainScreen />,
      },
      {
        path: "booking",
        element: <AppLayout />,
        children: [
          {
            path: "appointment",
            element: <Services />,
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
