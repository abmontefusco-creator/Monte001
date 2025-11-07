import React from "react";
import { MOCK_DB } from "../mock/mockDb";
import { Calendar, ChevronDown, Search, Bell, MessageSquare, Plus, Star, Users, Briefcase, Building, DollarSign, FileText, Settings, LogOut, User, Clock, Calendar as CalendarIcon, AlertTriangle, ListTodo, BrainCircuit, Newspaper, CheckCircle, XCircle, MoreVertical, Paperclip, Send, Smile, Phone, Mail, Link, MapPin, Trash2, Edit, Filter, GripVertical, Download, Eye, Share2, Shield, Play, Square } from 'lucide-react';

// --------------------------------------------------------------------------------
// Componente: ActivityTimeline
// Mostra una cronologia di attività per un dato record.
// --------------------------------------------------------------------------------
export const ActivityTimeline = ({ relatedId, relatedType }) => {
  // Logica di filtraggio simulata
  const activities = MOCK_DB.attivita.filter(a => a[relatedType + 'Id'] === relatedId);

  return (
    <div className="mt-6">
      <h4 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Cronologia Attività</h4>
      <div className="space-y-4">
        {activities.length > 0 ? activities.map(activity => (
          <div key={activity.id} className="flex items-start">
            <div className="flex-shrink-0 w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mr-4">
              <CheckCircle className="text-gray-500" />
            </div>
            <div>
              <p className="text-sm text-gray-800 dark:text-gray-200">{activity.titolo}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {new Date(activity.scadenza).toLocaleDateString()}
              </p>
            </div>
          </div>
        )) : (
          <p className="text-sm text-gray-500 dark:text-gray-400">Nessuna attività registrata.</p>
        )}
      </div>
    </div>
  );
};
// Fine Componente: ActivityTimeline