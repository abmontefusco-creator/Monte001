import React, { useState } from "react";
import { Dashboard } from "./components/Dashboard";
import { Sidebar } from "./components/Sidebar";
import { AuthProvider } from "./contexts/AuthContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { Header } from "./components/Header";
import { Scrivania } from "./components/Scrivania";
import { ContactsPage } from "./components/ContactForm";
import { CompaniesPage } from "./components/CompanyForm";

export default function App() {
  const [activeView, setActiveView] = useState("dashboard");

  const renderActiveView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'scrivania':
        return <Scrivania />;
      case 'contatti':
        return <ContactsPage />;
      case 'aziende':
        return <CompaniesPage />;
      // Aggiungere qui gli altri case per le altre viste
      default:
        return <div className="p-6"><h2 className="text-2xl">Modulo non implementato</h2><p>La vista per "{activeView}" non è ancora stata creata.</p></div>;
    }
  };

  return (
<LanguageProvider>
      <AuthProvider>
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900 font-sans">
          <Sidebar onNavigate={setActiveView} activeView={activeView} />
          <main className="flex-1 flex flex-col overflow-hidden">
            <Header />
            <div className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-800">
              {renderActiveView()}
            </div>
          </main>
        </div>
      </AuthProvider>
    </LanguageProvider>
  );
}
