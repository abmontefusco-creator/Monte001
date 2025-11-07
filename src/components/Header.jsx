import React from "react";
import { useTranslation } from "../contexts/LanguageContext";
import { Calendar, ChevronDown, Search, Bell, MessageSquare, Plus, Star, Users, Briefcase, Building, DollarSign, FileText, Settings, LogOut, User, Clock, Calendar as CalendarIcon, AlertTriangle, ListTodo, BrainCircuit, Newspaper, CheckCircle, XCircle, MoreVertical, Paperclip, Send, Smile, Phone, Mail, Link, MapPin, Trash2, Edit, Filter, GripVertical, Download, Eye, Share2, Shield, Play, Square } from 'lucide-react';

// --------------------------------------------------------------------------------
// Componente: Header
// La barra superiore con la ricerca globale, notifiche e impostazioni lingua.
// --------------------------------------------------------------------------------
export const Header = () => {
  const { t } = useTranslation();
  const { language, setLanguage } = useTranslation();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm p-4 flex justify-between items-center">
      <div className="relative w-full max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder={t('cerca')}
          className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex items-center space-x-4">
        <button className="text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white relative">
          <Bell size={24} />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
        </button>
        <button className="text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white relative">
          <MessageSquare size={24} />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">1</span>
        </button>
        <div className="relative">
          <select 
            value={language} 
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-gray-100 dark:bg-gray-700 border-none rounded-md p-2"
          >
            <option value="it">🇮🇹 IT</option>
            <option value="en">🇬🇧 EN</option>
            <option value="fr">🇫🇷 FR</option>
          </select>
        </div>
      </div>
    </header>
  );
};
// Fine Componente: Header
