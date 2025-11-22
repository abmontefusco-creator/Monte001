import React, { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { useTranslation } from "../contexts/LanguageContext";
import { AuthContext, AuthProvider, useAuth } from "../contexts/AuthContext"
import { Calendar, ChevronDown, Search, Bell, MessageSquare, Plus, Star, Users, Briefcase, Building, DollarSign, FileText, Settings, LogOut, User, Clock, Calendar as CalendarIcon, AlertTriangle, ListTodo, BrainCircuit, Newspaper, CheckCircle, XCircle, MoreVertical, Paperclip, Send, Smile, Phone, Mail, Link, MapPin, Trash2, Edit, Filter, GripVertical, Download, Eye, Share2, Shield, Play, Square } from 'lucide-react';
import { MOCK_DB } from "../mock/mockDb" // Assicurati che questo path punti al file giusto
import { Card } from "./Card"
import { Modal } from "./Modal";
import { fetchTenantData } from "../services/api";
//import ChatComponent from './Scrivania/ChatComponent.jsx';
import { ChatComponent } from './Scrivania/ChatComponent.jsx';
import { TimesheetComponent } from './Scrivania/TimesheetComponent.jsx';


// --------------------cd server
// ------------------------------------------------------------
// Pagina: Scrivania (Workspace)
// Hub centrale per la produttività personale e di team.
// --------------------------------------------------------------------------------
export const Scrivania = () => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState('attivita');

    const MyTasksComponent = () => {
        const { user } = useAuth();
        const [myTasks, setTasks] = useState([]);
        //const myTasks = MOCK_DB.attivita.filter(a => a.utenteId === user.id && !a.completata);
        const now = new Date();
        
        useEffect(() => {
            const loadTasks = async () => {
                try {
                    const res = await fetch(`http://localhost:5000/api/attivita?utenteId=${user._id}`);
                    const data = await res.json();
                    setTasks(data);
                } catch (err) {
                    console.error("Errore fetch attivita:", err);
                }
            };

            loadTasks();
        }, [user._id]);

        const categorizeTask = (task) => {
            const dueDate = new Date(task.scadenza);
            const diffDays = Math.ceil((dueDate - now) / (1000 * 60 * 60 * 24));

            if (diffDays < 0 || diffDays <= 5) return 'URGENTE';
            if (diffDays > 5 && diffDays <= 14) return 'DA_FARE';
            return 'DA_PIANIFICARE';
        };

        const categorizedTasks = myTasks.reduce((acc, task) => {
            const category = categorizeTask(task);
            if (!acc[category]) acc[category] = [];
            acc[category].push(task);
            return acc;
        }, {});
        
        const TaskItem = ({ task, category }) => {
            const dueDate = new Date(task.scadenza);
            const diffDays = Math.ceil((dueDate - now) / (1000 * 60 * 60 * 24));
            const isOverdue = diffDays < 0;

            const categoryStyles = {
                URGENTE: { icon: <AlertTriangle className="text-red-500" />, color: 'text-red-500' },
                DA_FARE: { icon: <CalendarIcon className="text-orange-500" />, color: 'text-orange-500' },
                DA_PIANIFICARE: { icon: <Clock className="text-gray-500" />, color: 'text-gray-500' },
            };

            return (
                <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                    <div className="mr-4">{categoryStyles[category].icon}</div>
                    <div className="flex-grow">
                        <p className="font-medium text-gray-900 dark:text-gray-100">{task.titolo}</p>
                        <p className={`text-sm ${categoryStyles[category].color}`}>
                            {isOverdue ? `${t('scaduto_da')} ${Math.abs(diffDays)} ${Math.abs(diffDays) > 1 ? t('giorni') : t('giorno')}` : `${t('scade_tra')} ${diffDays} ${diffDays > 1 ? t('giorni') : t('giorno')}`}
                        </p>
                    </div>
                    <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-500"><MoreVertical size={20} /></button>
                </div>
            );
        };

        return (
            <Card className="h-full">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">{t('le_mie_attivita')}</h3>
                <div className="space-y-6">
                    {Object.keys(categorizedTasks).map(category => (
                        <div key={category}>
                            <h4 className={`font-bold mb-2 ${category === 'URGENTE' ? 'text-red-500' : category === 'DA_FARE' ? 'text-orange-500' : 'text-gray-500'}`}>{t(category.toLowerCase())}</h4>
                            <div className="space-y-2">
                                {categorizedTasks[category].map(task => <TaskItem key={task._id} task={task} category={category} />)}
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        );
    };

    const CalendarComponent = () => {
        const [isModalOpen, setIsModalOpen] = useState(false);
        return (
            <Card className="h-full">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{t('calendario')}</h3>
                    <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                        <Plus size={16} /> {t('nuovo_evento')}
                    </button>
                </div>
                <div className="aspect-video bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Componente Calendario Interattivo qui</p>
                </div>
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={t('nuovo_evento')}>
                    <div className="space-y-4">
                        <input placeholder={t('titolo_evento')} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
                        <input type="date" className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
                        <button className="w-full px-4 py-2 bg-blue-500 text-white rounded">{t('salva')}</button>
                    </div>
                </Modal>
            </Card>
        );
    };
    
    const SandboxComponent = () => {
        const { user } = useAuth();
        const [note, setNote] = useState(MOCK_DB.sandboxNotes.find(n => n.userId === user._id)?.content || '');
        return (
            <Card className="h-full flex flex-col">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">{t('pensatoio')}</h3>
                <textarea value={note} onChange={(e) => setNote(e.target.value)} className="w-full flex-grow p-4 border rounded-lg dark:bg-gray-700 dark:border-gray-600" placeholder="Scrivi le tue idee..."></textarea>
                <div className="flex gap-4 mt-4">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded">{t('salva_nota')}</button>
                    <button className="px-4 py-2 bg-gray-200 rounded">{t('condividi')}</button>
                </div>
            </Card>
        );
    };

    const AiAssistantComponent = () => {
        const { user } = useAuth();
        const overdueTasks = MOCK_DB.attivita.filter(a => a.utenteId === user._id && !a.completata && new Date(a.scadenza) < new Date());
        return (
            <Card>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">{t('suggerimenti_ai')}</h3>
                <div className="space-y-3">
                    {overdueTasks.map(task => (
                        <div key={task._id} className="flex items-start gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/50 rounded-lg">
                            <AlertTriangle className="text-yellow-500 mt-1" />
                            <p>L'attività "<span className="font-semibold">{task.titolo}</span>" è scaduta. Considera di riprogrammarla o completarla.</p>
                        </div>
                    ))}
                    <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/50 rounded-lg">
                        <BrainCircuit className="text-blue-500 mt-1" />
                        <p>Hai registrato 3 incontri con <span className="font-semibold">ClientCorp S.p.A.</span> questo mese. Vuoi creare un report di attività?</p>
                    </div>
                </div>
            </Card>
        );
    };

    const NewsChannelComponent = () => (
        <Card>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">{t('canale_news')}</h3>
            <div className="space-y-4">
                {MOCK_DB.news.map(item => (
                    <div key={item._id} className="flex items-center gap-4">
                        <div className={`p-2 rounded-full ${item.type === 'nuovo_cliente_acquisito' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                           {item.type === 'nuovo_cliente_acquisito' ? <Star size={20} /> : <CheckCircle size={20} />}
                        </div>
                        <div>
                           <p className="text-gray-800 dark:text-gray-200">{item.testo}</p>
                           <p className="text-xs text-gray-500">{new Date(item.timestamp).toLocaleString()}</p>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );

    const tabs = [
        { id: 'attivita', label: t('le_mie_attivita'), icon: <ListTodo /> },
        { id: 'calendario', label: t('calendario'), icon: <CalendarIcon /> },
        { id: 'chat', label: t('chat_messaggi'), icon: <MessageSquare /> },
        { id: 'timesheet', label: t('timesheet'), icon: <Clock /> },
        { id: 'sandbox', label: t('pensatoio'), icon: <BrainCircuit /> },
        { id: 'ai_assistant', label: t('segreteria_ai'), icon: <User /> },
        { id: 'news', label: t('canale_news'), icon: <Newspaper /> },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'attivita': return <MyTasksComponent />;
            case 'calendario': return <CalendarComponent />;
            case 'chat': return <ChatComponent />;
            case 'timesheet': return <TimesheetComponent />;
            case 'sandbox': return <SandboxComponent />;
            case 'ai_assistant': return <AiAssistantComponent />;
            case 'news': return <NewsChannelComponent />;
            default: return <MyTasksComponent />;
        }
    };

    return (
        <div className="p-6 space-y-6 h-full flex flex-col">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">{t('scrivania')}</h2>
            <div className="border-b border-gray-200 dark:border-gray-700">
                <nav className="-mb-px flex space-x-6 overflow-x-auto" aria-label="Tabs">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`${
                                activeTab === tab.id
                                ? 'border-blue-500 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2`}
                        >
                            {tab.icon} {tab.label}
                        </button>
                    ))}
                </nav>
            </div>
            <div className="flex-grow">
                {renderContent()}
            </div>
        </div>
    );
};
// Fine Pagina: Scrivania