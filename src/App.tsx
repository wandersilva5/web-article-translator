// src/App.tsx
import React, { useState } from 'react';
import ArticleForm from './components/ArticleForm';
import ArticleViewer from './components/ArticleViewer';
import TranslationViewer from './components/TranslationViewer';
import LoadingSpinner from './components/LoadingSpinner';
import { fetchArticle, translateArticle } from './services/articleService';
import type { Article, TranslationResult } from './types';


const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [article, setArticle] = useState<Article | null>(null);
  const [translation, setTranslation] = useState<TranslationResult | null>(null);

  const handleSubmit = async (url: string) => {
    setIsLoading(true);
    setError(null);
    setArticle(null);
    setTranslation(null);

    try {
      // Buscar o artigo da URL
      const fetchedArticle = await fetchArticle(url);
      setArticle(fetchedArticle);

      // Traduzir o artigo
      const translatedArticle = await translateArticle(fetchedArticle);
      setTranslation(translatedArticle);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocorreu um erro desconhecido');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-8 text-center">Tradutor de Artigos Web para Português</h1>
        
        <ArticleForm onSubmit={handleSubmit} isLoading={isLoading} />
        
        {isLoading && <LoadingSpinner />}
        
        {error && (
          <div className="mt-6 p-4 bg-red-100 text-red-700 rounded">
            <p><strong>Erro:</strong> {error}</p>
          </div>
        )}
        
        {article && !isLoading && (
          <div className="mt-8">
            <ArticleViewer article={article} />
          </div>
        )}
        
        {translation && !isLoading && (
          <div className="mt-8">
            <TranslationViewer translation={translation} />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;