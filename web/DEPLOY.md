# 🚀 Деплой Meri Movs

## Варианты деплоя

### 1. Vercel (Рекомендуется)

```bash
npm install -g vercel
cd web
vercel
```

Или через GitHub:
1. Загрузи код на GitHub
2. Зайди на vercel.com
3. Импортируй репозиторий
4. Vercel автоматически определит настройки

### 2. Netlify

```bash
npm run build
# Загрузи папку dist на netlify.com
```

Или через Netlify CLI:
```bash
npm install -g netlify-cli
cd web
netlify deploy --prod
```

### 3. GitHub Pages

```bash
npm run build
# Настрой GitHub Actions для автоматического деплоя
```

### 4. Свой сервер

```bash
npm run build
# Скопируй папку dist на сервер
# Настрой nginx/apache для статических файлов
```

## Настройки для продакшена

### Environment Variables

Создай `.env.production`:
```
VITE_API_URL=https://api.merimovs.com
VITE_APP_NAME=Meri Movs
```

### Build

```bash
npm run build
```

Файлы будут в папке `dist/`

### Preview

```bash
npm run preview
```

## Оптимизация

- ✅ Минификация кода
- ✅ Tree shaking
- ✅ Code splitting
- ✅ Lazy loading компонентов
- ✅ Оптимизация изображений

## PWA

Приложение готово к установке как PWA:
- ✅ manifest.json
- ✅ Service Worker (можно добавить)
- ✅ Offline поддержка (можно добавить)

---

**Meri Movs** готов к деплою! 🚀

