//import React from "react";
import React, { useState, useEffect } from "react";
import { BarChart, LineChart, PieChart, Bar, Line, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts'
import { useTranslation } from "../contexts/LanguageContext";
import { AuthContext, AuthProvider, useAuth } from "../contexts/AuthContext"
import { Calendar, ChevronDown, Search, Bell, MessageSquare, Plus, Star, Users, Briefcase, Building, DollarSign, FileText, Settings, LogOut, User, Clock, Calendar as CalendarIcon, AlertTriangle, ListTodo, BrainCircuit, Newspaper, CheckCircle, XCircle, MoreVertical, Paperclip, Send, Smile, Phone, Mail, Link, MapPin, Trash2, Edit, Filter, GripVertical, Download, Eye, Share2, Shield, Play, Square } from 'lucide-react';
//import { MOCK_DB } from "../mock/mockDb";
import { fetchTenantData } from "../services/api";

// --------------------------------------------------------------------------------
// Componente: Sidebar
// Una barra laterale con link di navigazione base.
// --------------------------------------------------------------------------------
export const Sidebar = ({ activeView, onNavigate }) => {
    const { t } = useTranslation();
    const { user } = useAuth();
    //const allUsers = MOCK_DB.users; // <--- definito qui

// 🔄 Inizializza lo stato per gli utenti
const [allUsers, setAllUsers] = useState([]);

// 🔁 Al montaggio, carica i dati dal backend Express
useEffect(() => {
  fetch("http://localhost:5000/api/users")
    .then(res => res.json())
    .then(data => {
      //console.log("✅ Dati ricevuti:", data); // 👈 aggiungi questa riga
      setAllUsers(data);
    })
    .catch(err => console.error("Errore nel caricamento utenti:", err));
}, []);

  const menuItems = [
    { id: 'dashboard', label: t('dashboard'), icon: <BarChart size={20} /> },
    { id: 'scrivania', label: t('scrivania'), icon: <User size={20} /> },
    { id: 'contatti', label: t('contatti'), icon: <Users size={20} /> },
    { id: 'aziende', label: t('aziende'), icon: <Building size={20} /> },
    { id: 'fornitori', label: t('fornitori'), icon: <Briefcase size={20} /> },
    { id: 'banche', label: t('banche'), icon: <DollarSign size={20} /> },
    { id: 'progetti', label: t('progetti'), icon: <Briefcase size={20} /> },
    { id: 'deals', label: t('deals'), icon: <DollarSign size={20} /> },
    { id: 'bi_report', label: t('bi_report'), icon: <PieChart size={20} /> },
    { id: 'knowledge_base', label: t('knowledge_base'), icon: <BrainCircuit size={20} /> },
    { id: 'impostazioni', label: t('impostazioni'), icon: <Settings size={20} /> },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 flex flex-col h-screen shadow-lg">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">ConsulenzaCRM</h1>
      </div>
      <nav className="flex-grow p-4 space-y-2">
        {menuItems.map(item => (
          <a
            key={item.id}
            href="#"
            onClick={(e) => { e.preventDefault(); onNavigate(item.id); }}
            className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
              activeView === item.id
                ? 'bg-blue-500 text-white'
                : 'hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </a>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3 mb-4">
          <img src={user.foto} alt="User" className="w-10 h-10 rounded-full" />
          <div>
            <p className="font-semibold">{user.nome} {user.cognome}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{user.ruolo}</p>
          </div>
        </div>
        <div className="mb-2">
            <label htmlFor="user-switcher" className="text-sm font-medium text-gray-600 dark:text-gray-300 block mb-1">Cambia Utente:</label>
            <select 
                id="user-switcher"
                value={user._id} 
                onChange={(e) => loginAs(e.target.value)}
                className="w-full p-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-sm"
            >
                {allUsers.map(u => <option key={u._id} value={u._id}>{u.nome} {u.cognome} ({u.ruolo})</option>)}
            </select>
        </div>
        <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};
