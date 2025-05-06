// src/services/translationService.ts

import type { Article, TranslationResult } from "../types";

// API livre para tradução - usaremos LibreTranslate
const TRANSLATE_API_URL = 'https://libretranslate.de/translate';

export async function translateArticle(article: Article): Promise<TranslationResult> {
  try {
    // Traduzir título
    const translatedTitle = await translate(article.title);
    
    // Traduzir conteúdo
    const translatedContent = await translate(article.content);
    
    // Traduzir tabelas (legendas e conteúdo)
    const translatedTables = await Promise.all(
      article.tables.map(async (table) => {
        const translatedHtml = await translate(table.html);
        const translatedCaption = table.caption ? await translate(table.caption) : undefined;
        
        return {
          html: translatedHtml,
          caption: translatedCaption
        };
      })
    );
    
    return {
      originalTitle: article.title,
      translatedTitle,
      originalContent: article.content,
      translatedContent,
      images: article.images,
      tables: article.tables,
      translatedTables
    };
  } catch (error) {
    console.error('Erro ao traduzir o artigo:', error);
    throw new Error('Não foi possível traduzir o artigo. Tente novamente mais tarde.');
  }
}

async function translate(text: string): Promise<string> {
  if (!text) return '';
  
  try {
    const response = await fetch(TRANSLATE_API_URL, {
      method: 'POST',
      body: JSON.stringify({
        q: text,
        source: 'auto',
        target: 'pt',
        format: 'text'
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Erro na API de tradução: ${response.status}`);
    }
    
    const data = await response.json();
    return data.translatedText || text;
  } catch (error) {
    console.error('Erro na tradução:', error);
    
    // Tentar método alternativo (Hugging Face) se o primeiro falhar
    try {
      return await translateWithAI(text);
    } catch (secondError) {
      console.error('Erro na tradução alternativa:', secondError);
      // Retornar o texto original em caso de erro
      return text;
    }
  }
}

// Alternativa: usar uma API de IA gratuita como a Hugging Face Inference API
export async function translateWithAI(text: string): Promise<string> {
  try {
    const response = await fetch('https://api-inference.huggingface.co/models/Helsinki-NLP/opus-mt-en-pt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Nota: Em produção, você precisaria de uma chave API real
        'Authorization': 'Bearer hf_dummy_api_token' 
      },
      body: JSON.stringify({ inputs: text }),
    });
    
    if (!response.ok) {
      throw new Error(`Erro na API Hugging Face: ${response.status}`);
    }
    
    const result = await response.json();
    return Array.isArray(result) ? result[0].translation_text : text;
  } catch (error) {
    console.error('Erro na tradução com IA:', error);
    return text;
  }
}