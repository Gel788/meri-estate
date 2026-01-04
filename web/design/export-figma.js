#!/usr/bin/env node

/**
 * Скрипт для экспорта дизайна из Figma
 * Использование: node export-figma.js YOUR_FIGMA_TOKEN
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// File Key из URL
const FILE_KEY = 'jAKoIVQ7aWGEwJrHmgo6Kd';
const NODE_ID = '102-8754';

const token = process.argv[2];

if (!token) {
  console.log('❌ Нужен Figma Access Token!');
  console.log('\nКак получить токен:');
  console.log('1. Откройте https://www.figma.com/settings');
  console.log('2. Personal Access Tokens → Create new token');
  console.log('3. Скопируйте токен');
  console.log('\nИспользование: node export-figma.js YOUR_TOKEN');
  process.exit(1);
}

const options = {
  hostname: 'api.figma.com',
  path: `/v1/files/${FILE_KEY}?node_ids=${NODE_ID}`,
  method: 'GET',
  headers: {
    'X-Figma-Token': token
  }
};

console.log('🔄 Загружаю данные из Figma...\n');

const req = https.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    if (res.statusCode === 200) {
      const json = JSON.parse(data);
      
      // Сохраняем полный JSON
      const outputDir = path.join(__dirname, 'assets');
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }
      
      fs.writeFileSync(
        path.join(outputDir, 'figma-export.json'),
        JSON.stringify(json, null, 2)
      );
      
      console.log('✅ Данные экспортированы в: design/assets/figma-export.json');
      console.log('\n📊 Извлечённые данные:');
      
      // Извлекаем цвета
      extractColors(json);
      extractTextStyles(json);
      extractComponents(json);
      
    } else {
      console.error('❌ Ошибка:', res.statusCode);
      console.error(data);
    }
  });
});

req.on('error', (error) => {
  console.error('❌ Ошибка запроса:', error.message);
});

req.end();

function extractColors(json) {
  console.log('\n🎨 Цвета:');
  // Здесь можно парсить стили из JSON
  // Figma API возвращает стили в document.styles
}

function extractTextStyles(json) {
  console.log('\n📝 Текстовые стили:');
  // Парсим текстовые стили
}

function extractComponents(json) {
  console.log('\n🧩 Компоненты:');
  // Парсим компоненты
}

