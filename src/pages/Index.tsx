import React from "react";
import DashboardOverview from "@/components/dashboard/DashboardOverview";

const Dashboard: React.FC = () => {
  return (
    <main role="main" aria-label="Painel de Controle" className="p-4 md:p-6">
      <section className="container mx-auto">
        <DashboardOverview />
      </section>
    </main>
  );
};

export default Dashboard;
