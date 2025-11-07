import React, { useState } from "react";
import { useTranslation } from "../contexts/LanguageContext";
import { AuthContext, AuthProvider, useAuth } from "../contexts/AuthContext"
import { Calendar, ChevronDown, Search, Bell, MessageSquare, Plus, Star, Users, Briefcase, Building, DollarSign, FileText, Settings, LogOut, User, Clock, Calendar as CalendarIcon, AlertTriangle, ListTodo, BrainCircuit, Newspaper, CheckCircle, XCircle, MoreVertical, Paperclip, Send, Smile, Phone, Mail, Link, MapPin, Trash2, Edit, Filter, GripVertical, Download, Eye, Share2, Shield, Play, Square } from 'lucide-react';
import { AnagraficaPage } from "./Anagrafica";
import { ActivityTimeline } from "./ActivityTimeline";
import { DocumentManager } from "./DocumentManager";
import { Card } from "./Card"
import { MOCK_DB } from "../mock/mockDb";

// --------------------------------------------------------------------------------
// Componente Form: CompanyForm
// --------------------------------------------------------------------------------
export const CompanyForm = ({ initialData, onSave, onClose }) => {
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
            <input name="ragioneSociale" value={formData.ragioneSociale || ''} onChange={handleChange} placeholder="Ragione Sociale" className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
            <input name="settore" value={formData.settore || ''} onChange={handleChange} placeholder="Settore" className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
            <select name="tipo" value={formData.tipo || 'Cliente'} onChange={handleChange} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600">
                <option value="Cliente">Cliente</option>
                <option value="Fornitore">Fornitore</option>
            </select>
            <div className="flex justify-end gap-4">
                <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">{t('annulla')}</button>
                <button onClick={() => onSave(formData)} className="px-4 py-2 bg-blue-500 text-white rounded">{t('salva')}</button>
            </div>
        </div>
    );
};

// --------------------------------------------------------------------------------
// Pagina: Aziende
// Implementazione specifica per il modulo Aziende.
// --------------------------------------------------------------------------------
export const CompaniesPage = () => {
    const { t } = useTranslation();
    const [isAiAnalyzing, setIsAiAnalyzing] = useState(false);
    
    const handleAiAnalysis = (company) => {
        setIsAiAnalyzing(true);
        console.log(`Avvio analisi AI per ${company.ragioneSociale}`);
        setTimeout(() => {
            // Simula l'aggiornamento dei dati dopo l'analisi
            const updatedCompany = {
                ...company,
                tags: [...new Set([...company.tags, 'AI-Analyzed', 'High-Potential'])],
                analisiFinanziaria: {
                    ...company.analisiFinanziaria,
                    scoring: (company.analisiFinanziaria?.scoring || 70) + 5,
                    areeRischio: ['Liquidità migliorata dopo analisi']
                }
            };
            // Qui dovresti aggiornare lo stato globale/DB
            console.log("Analisi AI completata:", updatedCompany);
            alert(`Analisi AI per ${company.ragioneSociale} completata!`);
            setIsAiAnalyzing(false);
        }, 3000);
    };

    const renderListItem = (company) => (
        <>
            <p className="font-semibold text-gray-900 dark:text-gray-100">{company.ragioneSociale}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{company.settore}</p>
            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${company.tipo === 'Cliente' ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'}`}>
                {company.tipo}
            </span>
        </>
    );

    const renderDetailPane = (company, handleEdit) => (
        <Card>
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{company.ragioneSociale}</h3>
                    <p className="text-lg text-gray-600 dark:text-gray-300">{company.settore}</p>
                </div>
                <div className="flex gap-2">
                    <button 
                        onClick={() => handleAiAnalysis(company)} 
                        disabled={isAiAnalyzing}
                        className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:bg-purple-300"
                    >
                        <BrainCircuit size={16} /> {isAiAnalyzing ? 'Analisi in corso...' : 'Avvia Analisi Approfondita'}
                    </button>
                    <button onClick={() => handleEdit(company)} className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600">
                        <Edit size={16} /> {t('modifica')}
                    </button>
                </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
                {company.tags.map(tag => <span key={tag} className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">{tag}</span>)}
            </div>
            
            {/* Sezione Sviluppo Strategico */}
            <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
                 <h4 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Sviluppo Strategico</h4>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="bg-gray-50 dark:bg-gray-700">
                        <h5 className="font-bold mb-2">Internazionalizzazione</h5>
                        {company.sviluppoStrategico?.internazionalizzazione.attivo ? (
                            <>
                                <p>Mercati esteri: <span className="font-semibold">{company.sviluppoStrategico.internazionalizzazione.mercati.join(', ')}</span></p>
                                <button className="mt-2 text-sm text-blue-600">Attiva Workflow Nuovo Mercato</button>
                            </>
                        ) : (
                            <>
                                <p>Interesse all'espansione: <span className="font-semibold">{company.sviluppoStrategico?.internazionalizzazione.interesse ? `Sì (${company.sviluppoStrategico.internazionalizzazione.mercatiInteresse})` : 'No'}</span></p>
                                <button className="mt-2 text-sm text-blue-600">Attiva Workflow Sviluppo Estero</button>
                            </>
                        )}
                    </Card>
                    <Card className="bg-gray-50 dark:bg-gray-700">
                        <h5 className="font-bold mb-2">Hub Finanza Agevolata</h5>
                        <p><strong>Operazioni Invitalia:</strong> {company.sviluppoStrategico?.finanzaAgevolata.invitaliaAttuali.join(', ') || 'Nessuna'}</p>
                        <p><strong>Opportunità Invitalia:</strong> {company.sviluppoStrategico?.finanzaAgevolata.invitaliaOpportunita.join(', ') || 'Nessuna'}</p>
                    </Card>
                 </div>
            </div>

            <ActivityTimeline relatedId={company.id} relatedType="azienda" />
            <DocumentManager parentId={company.id} parentType="aziende" />
        </Card>
    );

    return (
        <AnagraficaPage
            pageTitle={t('aziende')}
            itemType="aziende"
            data={MOCK_DB.aziende}
            renderListItem={renderListItem}
            renderDetailPane={renderDetailPane}
            FormComponent={CompanyForm}
            initialState={{ ragioneSociale: '', tipo: 'Cliente', settore: '', tags: [], teamMemberIds: [] }}
        />
    );
};
// Fine Pagina: Aziende