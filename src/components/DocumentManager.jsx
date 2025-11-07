import React, { useState } from "react";
// --------------------------------------------------------------------------------
// Componente: DocumentManager
// Gestisce il caricamento e la visualizzazione di documenti associati a un record.
// --------------------------------------------------------------------------------
export const DocumentManager = ({ parentId, parentType }) => {
  const [docs, setDocs] = useState([]);
  
  // Simula il caricamento di documenti
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newDoc = {
        id: `doc-${Date.now()}`,
        name: file.name,
        size: `${(file.size / 1024).toFixed(2)} KB`,
        uploadDate: new Date().toLocaleDateString(),
        expiryDate: null,
      };
      setDocs(prevDocs => [...prevDocs, newDoc]);
    }
  };

  return (
    <div className="mt-6">
      <h4 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Gestione Documentale</h4>
      <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
        <p className="text-gray-500 dark:text-gray-400">Trascina i file qui o</p>
        <label htmlFor="file-upload" className="cursor-pointer text-blue-600 hover:text-blue-800 font-semibold">
          seleziona per caricare
        </label>
        <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileUpload} />
      </div>
      <div className="mt-4 space-y-2">
        {docs.map(doc => (
          <div key={doc.id} className="flex justify-between items-center bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
            <div className="flex items-center">
              <FileText className="mr-3 text-gray-500" />
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">{doc.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{doc.size} - Caricato il {doc.uploadDate}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="text-gray-500 hover:text-blue-600"><Download size={18} /></button>
              <button className="text-gray-500 hover:text-red-600"><Trash2 size={18} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
// Fine Componente: DocumentManager