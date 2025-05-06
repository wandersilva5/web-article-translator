// src/services/wordService.ts
import { Document, Packer, Paragraph, TextRun} from 'docx';
import { saveAs } from 'file-saver';
import type { TranslationResult } from '../types';

export async function generateWordDocument(translationResult: TranslationResult): Promise<void> {
  try {
    const docChildren = [
      new Paragraph({
        children: [
          new TextRun({
            text: translationResult.translatedTitle,
            bold: true,
            size: 36
          })
        ],
        spacing: {
          after: 400
        }
      })
    ];

    // Adicionar parágrafos de conteúdo
    translationResult.translatedContent.split('\n\n').forEach(paragraph => {
      if (paragraph.trim()) {
        docChildren.push(
          new Paragraph({
            children: [
              new TextRun({
                text: paragraph.trim()
              })
            ],
            spacing: {
              after: 200
            }
          })
        );
      }
    });

    // Adicionar imagens (como referências de texto por enquanto)
    if (translationResult.images.length > 0) {
      docChildren.push(
        new Paragraph({
          children: [
            new TextRun({
              text: "Imagens",
              bold: true,
              size: 28
            })
          ],
          spacing: {
            before: 400,
            after: 200
          }
        })
      );

      translationResult.images.forEach((image, index) => {
        docChildren.push(
          new Paragraph({
            children: [
              new TextRun({
                text: `Imagem ${index + 1}: ${image.alt || 'Sem descrição'}`,
                italics: true
              })
            ],
            spacing: {
              after: 200
            }
          })
        );
      });
    }

    // Adicionar tabelas (como texto por enquanto)
    if (translationResult.translatedTables.length > 0) {
      docChildren.push(
        new Paragraph({
          children: [
            new TextRun({
              text: "Tabelas",
              bold: true,
              size: 28
            })
          ],
          spacing: {
            before: 400,
            after: 200
          }
        })
      );

      translationResult.translatedTables.forEach((table, index) => {
        if (table.caption) {
          docChildren.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: table.caption,
                  bold: true
                })
              ],
              spacing: {
                before: 200,
                after: 200
              }
            })
          );
        }

        docChildren.push(
          new Paragraph({
            children: [
              new TextRun({
                text: `[Conteúdo da Tabela ${index + 1}]`
              })
            ],
            spacing: {
              after: 400
            }
          })
        );
      });
    }

    const doc = new Document({
      sections: [
        {
          properties: {},
          children: docChildren
        }
      ]
    });

    // Gerar e baixar o documento
    const buffer = await Packer.toBuffer(doc);
    const fileName = sanitizeFileName(translationResult.translatedTitle);
    saveAs(new Blob([buffer]), `${fileName}.docx`);
  } catch (error) {
    console.error('Erro ao gerar documento Word:', error);
    throw new Error('Não foi possível gerar o documento Word. Tente novamente.');
  }
}

// Função para sanitizar o nome do arquivo
function sanitizeFileName(title: string): string {
  // Limitar comprimento e remover caracteres inválidos
  return title
    .substring(0, 50)
    .replace(/[\\/:*?"<>|]/g, '_')
    .trim();
}