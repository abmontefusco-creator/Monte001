import React from "react";
import { StatCard } from "./StatCard";
import { useTranslation } from "../contexts/LanguageContext";
import { AuthContext, AuthProvider, useAuth } from "../contexts/AuthContext"
import { Card } from "./Card"
import { BarChart, LineChart, PieChart, Bar, Line, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts'
import { Calendar, ChevronDown, Search, Bell, MessageSquare, Plus, Star, Users, Briefcase, Building, DollarSign, FileText, Settings, LogOut, User, Clock, Calendar as CalendarIcon, AlertTriangle, ListTodo, BrainCircuit, Newspaper, CheckCircle, XCircle, MoreVertical, Paperclip, Send, Smile, Phone, Mail, Link, MapPin, Trash2, Edit, Filter, GripVertical, Download, Eye, Share2, Shield, Play, Square } from 'lucide-react';
import { MOCK_DB } from "../mock/mockDb" // Assicurati che questo path punti al file giusto


export const Dashboard = () => {
    const { t } = useTranslation();
    const { user } = useAuth();
    if (!user) return <div>Loading...</div>; // o fallback guest

    console.log(user.tenantId);
    console.log("User nel Dashboard:", user);

    // Dati filtrati per il tenant dell'utente
    const tenantData = {
        contacts: MOCK_DB.contatti.filter(c => c.tenantId === user.tenantId),
        companies: MOCK_DB.aziende.filter(a => a.tenantId === user.tenantId),
        projects: MOCK_DB.progetti.filter(p => p.tenantId === user.tenantId),
        deals: MOCK_DB.deals.filter(d => d.tenantId === user.tenantId),
    };
    
    const pipelineValue = tenantData.deals.reduce((sum, deal) => sum + (deal.valore * (deal.probabilita / 100)), 0);

    const kpiData = [
        { name: 'Q1', conversion: 25, profitability: 15, satisfaction: 4.2 },
        { name: 'Q2', conversion: 30, profitability: 18, satisfaction: 4.5 },
        { name: 'Q3', conversion: 28, profitability: 20, satisfaction: 4.4 },
        { name: 'Q4', conversion: 35, profitability: 22, satisfaction: 4.7 },
    ];
    return (
        <div className="p-6 space-y-6">
        <div>
            <h1>Benvenuto {user?.name || "Guest"}</h1>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Dashboard</h2>
      {/* Widget principali */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={<Users size={24} />} title={t('totale_contatti')} value={tenantData.contacts.length} />
        <StatCard icon={<Building size={24} />} title={t('aziende_attive')} value={tenantData.companies.length}>
          <div className="flex justify-between text-sm">
            <span>{t('clienti')}: {tenantData.companies.filter(c => c.tipo === 'Cliente').length}</span>
            <span>{t('fornitori_dashboard')}: {tenantData.companies.filter(c => c.tipo === 'Fornitore').length}</span>
          </div>
        </StatCard>
        <StatCard icon={<DollarSign size={24} />} title={t('valore_pipeline')} value={`€${pipelineValue.toLocaleString('it-IT', { minimumFractionDigits: 2 })}`} />
        <StatCard icon={<Briefcase size={24} />} title={t('progetti_attivi')} value={tenantData.projects.filter(p => p.stato === 'In Corso').length} />
      </div>
      {/* KPI Strategici */}
      <Card>
        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">{t('kpi_strategici')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <p className="text-3xl font-bold text-green-500">32%</p>
            <p className="text-gray-500 dark:text-gray-400">{t('tasso_conversione')}</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-yellow-500">18%</p>
            <p className="text-gray-500 dark:text-gray-400">{t('redditivita_progetti')}</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-blue-500 flex items-center justify-center">
              4.5 <Star size={24} className="ml-1 text-yellow-400" />
            </p>
            <p className="text-gray-500 dark:text-gray-400">{t('soddisfazione_clienti')}</p>
          </div>
        </div>
        <div className="h-64 mt-6">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={kpiData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="profitability" name="Redditività (%)" stroke="#f59e0b" />
              <Line type="monotone" dataKey="conversion" name="Conversione (%)" stroke="#10b981" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Attività Recenti */}
      <Card>
        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">{t('attivita_recenti')}</h3>
        <div className="space-y-4">
          {MOCK_DB.attivita.slice(0, 4).map(activity => (
            <div key={activity.id} className="flex items-center p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700">
              <div className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center mr-4">
                <CheckCircle size={18} className="text-gray-500" />
              </div>
              <div className="flex-grow">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{activity.titolo}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {MOCK_DB.users.find(u => u.id === activity.utenteId)?.nome} - {new Date(activity.scadenza).toLocaleDateString()}
                </p>
              </div>
              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${activity.completata ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                {activity.completata ? 'Completata' : 'Da fare'}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>            
    );
};
// Fine Pagina: Dashboard