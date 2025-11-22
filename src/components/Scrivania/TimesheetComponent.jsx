import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext"
import { Calendar, ChevronDown, Search, Bell, MessageSquare, Plus, Star, Users, Briefcase, Building, DollarSign, FileText, Settings, LogOut, User, Clock, Calendar as CalendarIcon, AlertTriangle, ListTodo, BrainCircuit, Newspaper, CheckCircle, XCircle, MoreVertical, Paperclip, Send, Smile, Phone, Mail, Link, MapPin, Trash2, Edit, Filter, GripVertical, Download, Eye, Share2, Shield, Play, Square } from 'lucide-react';
import { Card } from "../Card"
import { StatCard } from "../StatCard";
import { fetchTenantData } from "../../services/api";
import { useTranslation } from "../../contexts/LanguageContext";

export const TimesheetComponent = () => {
    const { t } = useTranslation();
    const { user } = useAuth();
    const [isTiming, setIsTiming] = useState(false);
    const [userProjects, setUserProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/progetti?userId=${user._id}`);
                const data = await response.json();
                console.log("✅ Dati ricevuti Projects:", data); // 👈 aggiungi questa riga
                setUserProjects(data);
            } catch (err) {
                console.error("Errore fetch progetti:", err);
            }
        };

        fetchProjects();
    }, [user._id]);
    
    //const userTimesheet = MOCK_DB.timesheet.filter(t => t.utenteId === user._id);
    const [userTimesheet, setUserTimesheet] = useState([]);

    useEffect(() => {
    fetch(`/api/timesheet/${user._id}`)
        .then(res => res.json())
        .then(data => setUserTimesheet(data));
    }, [user._id]);

    const dailyHours = userTimesheet.filter(t => new Date(t.data).toDateString() === new Date().toDateString()).reduce((sum, t) => sum + t.ore, 0);
    const weeklyHours = userTimesheet.reduce((sum, t) => sum + t.ore, 0); // Semplificato per demo

    return (
        <Card className="h-full">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">{t('timesheet')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4 p-4 border rounded-lg">
                    <button onClick={() => setIsTiming(!isTiming)} className={`w-full flex items-center justify-center gap-2 px-4 py-2 text-white rounded-lg ${isTiming ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}>
                        {isTiming ? <><Square size={16} /> {t('ferma_timer')}</> : <><Play size={16} /> {t('avvia_timer')}</>}
                    </button>
                    <select className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" defaultValue="">
                        <option value="" disabled>{t('progetto')}</option>
                        {userProjects.map(p => <option key={p._id} value={p._id}>{p.nome}</option>)}
                    </select>
                    <select className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" defaultValue="">
                        <option value="" disabled>{t('categoria_attivita')}</option>
                        <option>Attività Commerciale</option>
                        <option>Incontro Cliente</option>
                        <option>Stesura Documenti</option>
                        <option>Analisi di Commessa</option>
                    </select>
                    <input type="number" placeholder={t('ore')} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
                    <textarea placeholder={t('note')} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" rows="3"></textarea>
                    <button className="w-full px-4 py-2 bg-blue-500 text-white rounded">{t('registra_ore')}</button>
                </div>
                <div className="space-y-4">
                    <StatCard icon={<Clock size={24} />} title={t('ore_giornaliere')} value={dailyHours} />
                    <StatCard icon={<CalendarIcon size={24} />} title={t('ore_settimanali')} value={weeklyHours} />
                </div>
            </div>
        </Card>
    );
};