// src/components/TranslationViewer.tsx
import React from 'react';
import parse from 'html-react-parser';
import type { TranslationResult } from '../types';
import { generateWordDocument } from '../services/wordService';

interface TranslationViewerProps {
  translation: TranslationResult;
}

const TranslationViewer: React.FC<TranslationViewerProps> = ({ translation }) => {
  if (!translation) return null;

  const handleDownloadWord = () => {
    try {
      generateWordDocument(translation);
    } catch (error) {
      console.error('Erro ao gerar documento Word:', error);
      alert('Não foi possível gerar o documento Word. Tente novamente.');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Artigo Traduzido</h2>
        <button 
          onClick={handleDownloadWord}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
        >
          Baixar como Word
        </button>
      </div>
      
      <h3 className="text-lg font-bold">{translation.translatedTitle}</h3>
      
      <div className="mt-4">
        {translation.translatedContent.split('\n').map((paragraph, index) => (
          <p key={index} className="mb-3">{paragraph}</p>
        ))}
      </div>
      
      {translation.images.length > 0 && (
        <div className="mt-6">
          <h4 className="font-bold mb-2">Imagens ({translation.images.length})</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {translation.images.map((image, index) => (
              <div key={index} className="border rounded p-2">
                <img 
                  src={image.src} 
                  alt={image.alt || `Imagem ${index + 1}`} 
                  className="max-w-full h-auto"
                />
                <p className="text-sm text-gray-600 mt-1">{image.alt}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {translation.translatedTables.length > 0 && (
        <div className="mt-6">
          <h4 className="font-bold mb-2">Tabelas ({translation.translatedTables.length})</h4>
          {translation.translatedTables.map((table, index) => (
            <div key={index} className="mb-4">
              {table.caption && <p className="font-medium mb-1">{table.caption}</p>}
              <div className="overflow-x-auto">
                {parse(table.html)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TranslationViewer;