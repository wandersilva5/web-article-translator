// src/types/index.ts

export interface Article {
    title: string;
    content: string;
    images: ArticleImage[];
    tables: ArticleTable[];
    url: string;
  }
  
  export interface ArticleImage {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  }
  
  export interface ArticleTable {
    html: string;
    caption?: string;
  }
  
  export interface TranslationResult {
    originalTitle: string;
    translatedTitle: string;
    originalContent: string;
    translatedContent: string;
    images: ArticleImage[];
    tables: ArticleTable[];
    translatedTables: ArticleTable[];
  }