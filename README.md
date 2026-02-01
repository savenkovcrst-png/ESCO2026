# Помощник мастера по сложным буровым работам — интерактивная карта решений

Это готовый сайт (Vite + React + TypeScript), который показывает деревья решений по главам книги и умеет
выдавать Mermaid-код (для блок-схем).

## Быстрый старт локально
1) Установите Node.js 18+ (лучше 20)
2) В папке проекта:
```bash
npm install
npm run dev
```
Откройте http://localhost:5173

## Как залить на GitHub и получить сайт (GitHub Pages)
1) Создайте новый репозиторий на GitHub (публичный или приватный).
2) Загрузите содержимое этого проекта в репозиторий (ветка **main**).
3) В GitHub откройте:
   - **Settings → Pages**
   - **Build and deployment → Source: GitHub Actions**
4) Сделайте `git push` в `main`.  
   Workflow `.github/workflows/deploy.yml` автоматически соберёт проект и задеплоит на GitHub Pages.

После первого успешного прогона workflow ссылка появится в **Settings → Pages**.

## Где лежат деревья решений
- `src/trees/chapter1_accidents.ts`
- `src/trees/chapter2_elimination.ts`
- `src/trees/chapter3_prevention.ts`
- `src/trees/chapter4_fishing_tools.ts`
- `src/trees/chapter5_losses.ts`

## Как расширять до более детальных подслучаев
Добавляйте новые узлы `question/result` и ветвления `edges` в файлы `src/trees/*.ts`.
Экспорт Mermaid обновится автоматически кнопкой «Показать Mermaid».
