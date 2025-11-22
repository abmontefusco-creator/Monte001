//import React from "react";
import { useTranslation } from "../contexts/LanguageContext";
import { AuthContext, AuthProvider, useAuth } from "../contexts/AuthContext"
import { AnagraficaPage } from "./Anagrafica";
import { ActivityTimeline } from "./ActivityTimeline";
import { DocumentManager } from "./DocumentManager";
import { Card } from "./Card"
import { Calendar, ChevronDown, Search, Bell, MessageSquare, Plus, Star, Users, Briefcase, Building, DollarSign, FileText, Settings, LogOut, User, Clock, Calendar as CalendarIcon, AlertTriangle, ListTodo, BrainCircuit, Newspaper, CheckCircle, XCircle, MoreVertical, Paperclip, Send, Smile, Phone, Mail, Link, MapPin, Trash2, Edit, Filter, GripVertical, Download, Eye, Share2, Shield, Play, Square } from 'lucide-react';
import { MOCK_DB } from "../mock/mockDb" // Assicurati che questo path punti al file giusto
import { useEffect, useState } from "react";
import { fetchTenantData } from "../services/api";

// --------------------------------------------------------------------------------
// Componente Form: ContactForm
// --------------------------------------------------------------------------------
export const ContactForm = ({ initialData, onSave, onClose }) => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState(initialData);


    useEffect(() => {
        setFormData(initialData);
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    if (!formData) return null;

    return (
        <div className="space-y-4">
            <input name="nome" value={formData.nome || ''} onChange={handleChange} placeholder={t('nome')} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
            <input name="cognome" value={formData.cognome || ''} onChange={handleChange} placeholder={t('cognome')} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
            <div className="flex justify-end gap-4">
                <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">{t('annulla')}</button>
                <button onClick={() => onSave(formData)} className="px-4 py-2 bg-blue-500 text-white rounded">{t('salva')}</button>
            </div>
        </div>
    );
};

// --------------------------------------------------------------------------------
// Pagina: Contatti
// Implementazione specifica per il modulo Contatti.
// --------------------------------------------------------------------------------
export const ContactsPage = () => {
    const { t } = useTranslation();
    const [contatti, setContatti] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/contatti")
        .then(res => res.json())
        .then(data => {
            console.log("✅ Dati contatti:", data); // 👈 aggiungi questa riga
            setContatti(data);
        })
        .catch(err => console.error("Errore fetch contatti:", err));
    }, []);

    const getCompanyName = (id) => MOCK_DB.aziende.find(c => c.id === id)?.ragioneSociale || 'N/A';

    const renderListItem = (contact) => (
        <>
            <p className="font-semibold text-gray-900 dark:text-gray-100">{contact.nome} {contact.cognome}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{contact.posizione} presso {getCompanyName(contact.aziendaId)}</p>
        </>
    );

    const renderDetailPane = (contact, handleEdit) => (
        <Card>
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{contact.nome} {contact.cognome}</h3>
                    <p className="text-lg text-gray-600 dark:text-gray-300">{contact.posizione}</p>
                    <p className="text-blue-600 hover:underline">{getCompanyName(contact.aziendaId)}</p>
                </div>
                <button onClick={() => handleEdit(contact)} className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600">
                    <Edit size={16} /> {t('modifica')}
                </button>
            </div>
            <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h4 className="font-semibold mb-2">Informazioni di Contatto</h4>
                    <p className="flex items-center gap-2"><Mail size={16} /> {contact.email[0].value}</p>
                </div>
                <div>
                    <h4 className="font-semibold mb-2">Dettagli</h4>
                    <p><strong>Stadio:</strong> {contact.stadio}</p>
                    <p><strong>Fonte:</strong> {contact.fonte}</p>
                </div>
            </div>
            <ActivityTimeline relatedId={contact._id} relatedType="contatto" />
            <DocumentManager parentId={contact._id} parentType="contatti" />
        </Card>
    );

    return (
        <AnagraficaPage
            pageTitle={t('contatti')}
            itemType="contatti"
            data={contatti}
            renderListItem={renderListItem}
            renderDetailPane={renderDetailPane}
            FormComponent={ContactForm}
            initialState={{ nome: '', cognome: '', posizione: '', aziendaId: '', email: [{type:'Lavoro', value:''}], stadio: 'Lead', fonte: '', tags: [] }}
        />
    );
};
// Fine Pagina: Contatti