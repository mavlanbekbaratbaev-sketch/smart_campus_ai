# Smart Campus AI
Учебная веб-платформа управления инфраструктурой кампуса: HTML + CSS + JavaScript, Chart.js, localStorage.

## Запуск
Открыть папку в VS Code → Live Server → `index.html`. Вход: любой логин и пароль, выбрать роль.

## Структура
- `index.html` — вход (имитация ролей Administrator / Engineer / Operator)
- `dashboard / rooms / devices / incidents / analytics / settings .html`
- `assets/css/style.css` — стили, тёмная/светлая тема, адаптив (1920/1366/768/390)
- `assets/js/data.js` — исходные данные (12 помещений, 28 устройств, 4 инцидента)
- `assets/js/storage.js` — localStorage, инициализация, симуляция датчиков
- `assets/js/common.js` — sidebar, topbar, поиск, уведомления, пороги и статусы
- `assets/js/<страница>.js` — логика каждой страницы

## AI Analytics
1. Пороги: температура 28/32 °C, CO₂ 1000/1500 ppm, энергия +30%/+60% к базовой линии.
2. Z-score по истории из 12 значений, аномалия при z > 2.
3. Rule-based рекомендации (это не генеративный AI).

## Публикация
`git init`, `git add .`, `git commit`, `git branch -M main`, `git remote add origin URL`, `git push -u origin main`, затем Settings → Pages → main / root.
