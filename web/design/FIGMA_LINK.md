# 🎨 Figma Design Link

## Ссылка на дизайн:
https://www.figma.com/design/jAKoIVQ7aWGEwJrHmgo6Kd/Real-Estate-Business-Website-UI-Template---Dark-Theme-%7C-Produce-UI--Community-?node-id=102-8754&t=JmFep1Xl8Het611j-0

## File Key:
`jAKoIVQ7aWGEwJrHmgo6Kd`

## Node ID:
`102-8754`

## 📥 Как экспортировать:

### Вариант 1: Через скрипт (автоматически)

1. Получите Figma Access Token:
   - Откройте: https://www.figma.com/settings
   - Personal Access Tokens → Create new token
   - Скопируйте токен

2. Запустите скрипт:
   ```bash
   cd web/design
   node export-figma.js YOUR_TOKEN
   ```

### Вариант 2: Вручную через Figma

1. Откройте файл в Figma
2. Экспортируйте скриншоты всех экранов:
   - Выберите Frame
   - Right Click → Export → PNG (2x)
   - Сохраните в `design/images/screenshots/`

3. Скопируйте Design Tokens:
   - Откройте панель Design
   - Скопируйте все цвета и стили
   - Заполните `design/docs/design-tokens.md`

### Вариант 3: Через Figma API (curl)

```bash
# Замените YOUR_TOKEN на ваш токен
curl -H 'X-Figma-Token: YOUR_TOKEN' \
  'https://api.figma.com/v1/files/jAKoIVQ7aWGEwJrHmgo6Kd' \
  > design/assets/figma-export.json
```

## 🎯 Что нужно экспортировать:

- ✅ Все экраны (скриншоты)
- ✅ Цветовая палитра
- ✅ Типографика
- ✅ Компоненты
- ✅ Spacing система
- ✅ Иконки (если есть)

---

**После экспорта** - я реализую дизайн 1 в 1! 🚀

