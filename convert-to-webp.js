#!/usr/bin/env node

/**
 * Script de Conversão Automática para WebP
 * 
 * COMO FUNCIONA:
 * 1. Lê todas as imagens da pasta de entrada
 * 2. Converte cada imagem para formato WebP
 * 3. Salva na pasta de saída
 * 4. Mantém as imagens originais (não deleta)
 * 
 * FORMATOS SUPORTADOS:
 * - JPG/JPEG → WebP
 * - PNG → WebP
 * - GIF → WebP (sem animação)
 * - WebP → WebP (recompressão)
 * 
 * USO:
 * npm run convert-webp
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Converter __dirname para ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuração
const CONFIG = {
  // Pasta onde estão as imagens originais
  inputDir: path.join(__dirname, 'src', 'Assets', 'images'),
  
  // Pasta onde salvar as imagens WebP
  outputDir: path.join(__dirname, 'src', 'Assets', 'images-webp'),
  
  // Qualidade da compressão (0-100)
  // 80 = boa qualidade, tamanho menor
  // 90 = alta qualidade, tamanho maior
  quality: 80,
  
  // Formatos de entrada suportados
  supportedFormats: ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.tiff']
};

// Garantir que a pasta de saída existe
if (!fs.existsSync(CONFIG.outputDir)) {
  fs.mkdirSync(CONFIG.outputDir, { recursive: true });
  console.log(`📁 Pasta criada: ${CONFIG.outputDir}\n`);
}

// Função principal de conversão
async function convertImagesToWebP() {
  console.log('🚀 Iniciando conversão para WebP...\n');
  console.log(`📂 Entrada: ${CONFIG.inputDir}`);
  console.log(`📂 Saída: ${CONFIG.outputDir}`);
  console.log(`⚙️  Qualidade: ${CONFIG.quality}%\n`);
  console.log('─'.repeat(50) + '\n');

  // Verificar se pasta de entrada existe
  if (!fs.existsSync(CONFIG.inputDir)) {
    console.error(`❌ Pasta de entrada não encontrada: ${CONFIG.inputDir}`);
    process.exit(1);
  }

  // Ler arquivos da pasta
  const files = fs.readdirSync(CONFIG.inputDir);
  
  // Filtrar apenas imagens suportadas
  const imageFiles = files.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return CONFIG.supportedFormats.includes(ext);
  });

  if (imageFiles.length === 0) {
    console.log('⚠️  Nenhuma imagem encontrada para converter.');
    process.exit(0);
  }

  console.log(`📸 ${imageFiles.length} imagem(ns) encontrada(s)\n`);

  let successCount = 0;
  let errorCount = 0;
  let totalSavedBytes = 0;

  // Converter cada imagem
  for (const file of imageFiles) {
    const inputPath = path.join(CONFIG.inputDir, file);
    const ext = path.extname(file);
    const outputFilename = path.basename(file, ext) + '.webp';
    const outputPath = path.join(CONFIG.outputDir, outputFilename);

    try {
      // Obter tamanho do arquivo original
      const originalStats = fs.statSync(inputPath);
      const originalSize = originalStats.size;

      // Converter para WebP
      await sharp(inputPath)
        .webp({ 
          quality: CONFIG.quality,
          effort: 6 // 0-6, maior = mais compressão (mais lento)
        })
        .toFile(outputPath);

      // Obter tamanho do arquivo WebP
      const webpStats = fs.statSync(outputPath);
      const webpSize = webpStats.size;
      
      // Calcular economia
      const savedBytes = originalSize - webpSize;
      const savedPercent = ((savedBytes / originalSize) * 100).toFixed(1);
      totalSavedBytes += savedBytes;

      // Log de sucesso
      console.log(`✅ ${file.padEnd(30)} → ${outputFilename}`);
      console.log(`   ${formatBytes(originalSize)} → ${formatBytes(webpSize)} (${savedPercent}% menor)`);
      
      successCount++;
    } catch (error) {
      console.error(`❌ Erro ao converter ${file}:`, error.message);
      errorCount++;
    }
  }

  // Resumo final
  console.log('\n' + '─'.repeat(50));
  console.log('\n📊 RESUMO DA CONVERSÃO:');
  console.log(`   ✅ Sucesso: ${successCount} imagem(ns)`);
  console.log(`   ❌ Erros: ${errorCount} imagem(ns)`);
  console.log(`   💾 Economia total: ${formatBytes(Math.abs(totalSavedBytes))}`);
  console.log(`\n📁 Imagens WebP salvas em: ${CONFIG.outputDir}`);
  console.log('\n✨ Conversão concluída!\n');
}

// Função auxiliar para formatar bytes
function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Executar
convertImagesToWebP().catch(error => {
  console.error('❌ Erro fatal:', error);
  process.exit(1);
});
