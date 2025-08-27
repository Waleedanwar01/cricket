

import React from "react";
import ProtectedRoute from "../components/ProtectedRoute";
import DashboardClient from "./DashboardClient";

export const metadata = {
  title:"Dashboard | Cricket Court"
}
export default function Page() {
  return (
    <ProtectedRoute requireAuth={true}>
      <DashboardClient />
    </ProtectedRoute>
  );
}


