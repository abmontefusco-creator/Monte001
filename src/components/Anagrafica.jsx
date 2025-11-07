import React, { useState, createContext, useContext, useEffect, useMemo } from "react";
import { AuthContext, AuthProvider, useAuth } from "../contexts/AuthContext"
import { Calendar, ChevronDown, Search, Bell, MessageSquare, Plus, Star, Users, Briefcase, Building, DollarSign, FileText, Settings, LogOut, User, Clock, Calendar as CalendarIcon, AlertTriangle, ListTodo, BrainCircuit, Newspaper, CheckCircle, XCircle, MoreVertical, Paperclip, Send, Smile, Phone, Mail, Link, MapPin, Trash2, Edit, Filter, GripVertical, Download, Eye, Share2, Shield, Play, Square } from 'lucide-react';
import { Modal } from "./Modal"
import { Card } from "./Card"
// --------------------------------------------------------------------------------
// Pagina: Anagrafica (Contatti, Aziende, etc.) - Componente Generico
// Gestisce il layout a due pannelli e la logica comune per le anagrafiche.
// --------------------------------------------------------------------------------
export const AnagraficaPage = ({
  pageTitle,
  itemType,
  data,
  renderListItem,
  renderDetailPane,
  FormComponent,
  initialState,
}) => {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    // Filtro per tenant e ruolo
    let filteredData = data.filter(item => item.tenantId === user.tenantId);

    if (user.ruolo === 'Consultant') {
      if (itemType === 'progetti') {
        filteredData = filteredData.filter(p => p.teamAssegnatoIds.includes(user.id));
      } else if (itemType === 'aziende' || itemType === 'contatti') {
         const projectsIConsult = MOCK_DB.progetti
            .filter(p => p.tenantId === user.tenantId && p.teamAssegnatoIds.includes(user.id))
            .map(p => p.clienteId);
         
         if (itemType === 'aziende') {
            filteredData = filteredData.filter(a => projectsIConsult.includes(a.id) || a.teamMemberIds.includes(user.id));
         } else { // contatti
            const companyIds = filteredData.map(a => a.id);
            filteredData = MOCK_DB.contatti.filter(c => c.tenantId === user.tenantId && companyIds.includes(c.aziendaId));
         }
      }
    } else if (user.ruolo === 'Cliente') {
        if (itemType === 'progetti') {
            filteredData = filteredData.filter(p => p.clienteId === user.aziendaAssociataId);
        } else if (itemType === 'aziende') {
            filteredData = filteredData.filter(a => a.id === user.aziendaAssociataId);
        } else if (itemType === 'contatti') {
            filteredData = MOCK_DB.contatti.filter(c => c.tenantId === user.tenantId && c.aziendaId === user.aziendaAssociataId);
        } else {
            filteredData = []; // I clienti non vedono altro
        }
    }
    
    setItems(filteredData);
    if (filteredData.length > 0) {
      setSelectedItem(filteredData[0]);
    } else {
      setSelectedItem(null);
    }
  }, [data, user, itemType]);

  const handleNew = () => {
    setEditingItem(initialState);
    setIsModalOpen(true);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleSave = (itemToSave) => {
    // Logica di salvataggio (qui simulata)
    console.log("Saving:", itemToSave);
    if (itemToSave.id) {
      setItems(items.map(i => i.id === itemToSave.id ? itemToSave : i));
      if (selectedItem?.id === itemToSave.id) {
        setSelectedItem(itemToSave);
      }
    } else {
      const newItem = { ...itemToSave, id: `${itemType}-${Date.now()}`, tenantId: user.tenantId };
      setItems([...items, newItem]);
      setSelectedItem(newItem);
    }
    setIsModalOpen(false);
    setEditingItem(null);
  };

  return (
    <div className="flex h-full">
      {/* Pannello Lista */}
      <div className="w-1/3 h-full border-r border-gray-200 dark:border-gray-700 flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">{pageTitle}</h2>
          <button onClick={handleNew} className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">
            <Plus size={20} />
          </button>
        </div>
        <div className="flex-grow overflow-y-auto">
          {items.map(item => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className={`p-4 cursor-pointer border-b border-gray-200 dark:border-gray-700 ${
                selectedItem?.id === item.id
                  ? 'bg-blue-100 dark:bg-blue-900'
                  : 'hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              {renderListItem(item)}
            </div>
          ))}
        </div>
      </div>

      {/* Pannello Dettaglio */}
      <div className="w-2/3 h-full overflow-y-auto p-6 bg-gray-50 dark:bg-gray-900">
        {selectedItem ? renderDetailPane(selectedItem, handleEdit) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">Seleziona un elemento dalla lista.</p>
          </div>
        )}
      </div>

      {/* Modale di modifica/creazione */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem?.id ? `Modifica ${pageTitle}` : `Nuovo ${pageTitle}`}
      >
        {isModalOpen && <FormComponent initialData={editingItem} onSave={handleSave} onClose={() => setIsModalOpen(false)} />}
      </Modal>
    </div>
  );
};
// Fine Pagina: Anagrafica Generico