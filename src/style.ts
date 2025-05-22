/**
 * @description CSS styles for timeline visualization
 */
export const style: string = `<style>
/* Import Google fonts */
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&family=Open+Sans:wght@400;600&family=Montserrat:wght@500;600&display=swap');

/* Global styles */
body {
    font-family: 'Roboto', Arial, sans-serif;
    margin: 0;
    padding: 5px;
    background-color: #f9f9f9;
    color: #333;
}

.scrollable-content {
    overflow-x: auto;
    overflow-y: auto;
    padding-bottom: 20px;
    max-height: 85vh; /* Ограничиваем высоту, чтобы появился вертикальный скролл */
}

/* Tab buttons */
.tab-buttons {
    display: flex;
    margin-bottom: 20px;
    border-bottom: 1px solid #ddd;
    padding: 10px 0;
    background-color: #f9f9f9;
}

.tab-button {
    padding: 10px 20px;
    background-color: #f0f0f0;
    border: none;
    border-bottom: 2px solid transparent;
    cursor: pointer;
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
    transition: all 0.3s;
    margin-right: 2px;
}

.tab-button:hover {
    background-color: #e0e0e0;
}

.tab-button.active {
    background-color: white;
    border-bottom: 2px solid #3f51b5;
    color: #3f51b5;
}

/* Statistics layout */
.statistics-layout {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    max-width: 100%;
}

.statistics-column {
    flex: 1;
    min-width: 600px;
}

.reopened-tickets-column {
    flex: 0 0 350px;
    border-left: 1px solid #ddd;
    padding-left: 20px;
}

/* User reopened tickets section */
.user-reopened-tickets {
    margin-bottom: 10px;
    border: 1px solid #eee;
    border-radius: 4px;
}

.user-header {
    display: flex;
    align-items: center;
    padding: 10px;
    cursor: pointer;
    background-color: #f9f9f9;
    border-radius: 4px;
    transition: background-color 0.2s;
}

.user-header:hover {
    background-color: #f0f0f0;
}

.toggle-icon {
    display: inline-block;
    width: 16px;
    margin-right: 5px;
    color: #3f51b5;
    font-size: 12px;
    text-align: center;
    transition: transform 0.2s;
}

.toggle-icon.expanded {
    transform: rotate(0deg);
}

.user-reopened-tickets h3 {
    font-family: 'Montserrat', sans-serif;
    font-size: 15px;
    margin: 0;
    color: #333;
    flex: 1;
}

.ticket-count {
    color: #757575;
    font-size: 14px;
    font-weight: normal;
    margin-left: 5px;
}

.tickets-list {
    list-style: none;
    padding: 0;
    margin: 0;
    max-height: 300px;
    overflow-y: auto;
    border-top: 1px solid #eee;
    border-radius: 0 0 4px 4px;
}

.reopened-ticket {
    padding: 8px 12px;
    border-bottom: 1px solid #eee;
    font-size: 12px;
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
}

.reopened-ticket:last-child {
    border-bottom: none;
}

.reopened-ticket:hover {
    background-color: #f5f5f5;
}

.reopened-ticket a {
    color: #3f51b5;
    font-weight: 600;
    text-decoration: none;
    margin-right: 8px;
}

.reopened-ticket a:hover {
    text-decoration: underline;
}

.ticket-summary {
    flex: 1;
    color: #555;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
}

.ticket-date {
    color: #888;
    font-size: 11px;
}

/* Statistics table */
.statistics-table {
    width: 100%;
    max-width: 800px;
    border-collapse: collapse;
    margin: 20px auto;
   
    font-family: 'Open Sans', sans-serif;
}

.statistics-table th, 
.statistics-table td {
    padding: 12px 15px;
    text-align: left;
    border: 1px solid #ddd;
}

.statistics-table th {
    background-color: #3f51b5;
    color: white;
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
}

.statistics-table tr:nth-child(even) {
    background-color: #f5f5f5;
}

.statistics-table tr:hover {
    background-color: #e1f5fe;
}

/* Выделение высоких процентов переоткрытия задач */
.statistics-table .high-percent {
    background-color: #ffcdd2;
    color: #c62828;
    font-weight: 600;
}

.statistics-table .high-percent-testing {
    background-color:rgb(116, 221, 107);
    font-weight: 600;
}

/* Table layout */
table {
    border-collapse: collapse;
    font-family: 'Open Sans', sans-serif;
    width: max-content;

}

/* Стили именно для таблицы во вкладке "Временная шкала" */
#timeline-tab table {
    position: relative;
    border-collapse: collapse;
    border: none;
}

#timeline-tab thead {
    position: sticky;
    top: 0;
    z-index: 2;
}

/* Стили для всех ячеек заголовка */
#timeline-tab th {
    position: sticky;
    top: 0;
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    font-size: 13px;
    z-index: 2;
    border: none !important; /* Убираем реальную границу */
    vertical-align: middle;
}

/* Стили для первой строки с месяцами */
#timeline-tab thead tr:first-child th {
    vertical-align: middle;
    height: 30px;
    border: none !important;
}

/* Стили для второй строки с числами */
#timeline-tab thead tr:last-child th {
    vertical-align: middle;
    height: 30px;
    border: none !important;
    /* Добавляем верхнюю границу для разделения месяцев и дат */
   
}

/* Специальный стиль для ячейки Summary с rowspan=2 */
#timeline-tab th[rowspan="2"] {
    position: sticky;
    left: 0;
    top: 0;
    z-index: 3;
    background-color: #f2f2f2;
    border: none !important;
    vertical-align: middle;
    height: 60px; /* Высота, равная сумме высот двух рядов */
   
}

/* Разделительная сетка должна быть только внутри тела таблицы */
#timeline-tab tbody tr td {
    border: 1px solid #e0e0e0;
}

th,
td {
    padding: 2px;
    text-align: center;
}

th {
    background-color: #f2f2f2;
}

/* Fixed column (summary) styling */
.fixed-column {
    position: sticky;
    left: 0;
    background-color: white;
    z-index: 1;
   
    text-align: left;
    padding: 3px 5px;
    width: 140px;
    max-width: 140px;
    overflow: visible;
    white-space: normal;
    word-wrap: break-word;
}

.fixed-column a {
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
    text-decoration: none;
    color: #2c3e50;
    font-size: 11px;
    display: block;
    white-space: normal;
    word-wrap: break-word;
}

.fixed-column a:hover {
    text-decoration: underline;
}

.fixed-column p {
    font-size: 10px;
    margin: 1px 0;
    color: #555;
    white-space: normal;
    word-wrap: break-word;
}

/* Cell styles */
td.issue {
    background-color: white;
}

.weekend {
    background-color: #f2f2f2;
    color: #f2f2f2;
}

.in-progress {
    background-color: #3f51b5;  /* Индиго */
    color: white;
    font-weight: 500;
}

.blocked {
    background-color: #f44336;  /* Красный */
    color: white;
    font-weight: 500;
}

.qablocked {
    background-color: #ff9800;  /* Оранжевый */
    color: #4a2700;
    font-weight: 500;
}

.testing {
    background-color: #ffeb3b;  /* Желтый */
    color: #6b5900;
    font-weight: 500;
}

.open {
    background-color: #e0e0e0;  /* Светло-серый */
    color: #616161;
    font-weight: 500;
}

.hide {
    background-color: white;
    color: white;
}

.blwh {
    background-color: #f5f5f5;
    color: #757575;  /* Более темный серый цвет */
}

.readyqa {
    background-color: #4caf50;  /* Зеленый */
    color: white;
    font-weight: 500;
}

.review {
    background-color: #2196f3;  /* Голубой */
    color: white;
    font-weight: 500;
}

.reopened {
    background-color: #e91e63;  /* Розовый */
    color: white;
    font-weight: 500;
}

.created {
    background-color: white;
    color: black;
}

/* Стиль по умолчанию для неизвестных статусов */
.default-status {
    background-color: white;
    color: black;
}

p {
    margin: 0px;
    font-size: 11px;
    font-weight: 400;
}

/* Team colors */
.animator,
.qa,
.content,
.tam,
.sound,
.art {
    background-color: white;
    color: #000;
}

.be {
    background-color: #fff9c4;
    color: #000;
}

.fe {
    background-color: #b2dfdb;
    color: #000;
}

.math {
    background-color: #ffab91;
    color: #000;
}

/* Month backgrounds */
.bg-january {
    background-color: #bbdefb;  /* Более насыщенный голубой */
}

#timeline-tab .bg-february,
.bg-february {
    background-color: #b3e5fc;  /* Яркий голубой */
}

.bg-march {
    background-color: #c8e6c9;  /* Мятный зеленый */
}

.bg-april {
    background-color: #dcedc8;  /* Светло-зеленый */
}

.bg-may {
    background-color: #fff59d;  /* Яркий желтый */
}

#timeline-tab .bg-june,
.bg-june {
    background-color: #ffecb3;  /* Золотисто-желтый */
}

#timeline-tab .bg-july,
.bg-july {
    background-color: #ffcc80;  /* Оранжевый */
}

#timeline-tab .bg-august,
.bg-august {
    background-color: #ffab91;  /* Терракотовый */
}

#timeline-tab .bg-september,
.bg-september {
    background-color: #ffab91;  /* Коралловый */
}

#timeline-tab .bg-october,
.bg-october {
    background-color: #bcaaa4;  /* Серо-коричневый */
}

#timeline-tab .bg-november,
.bg-november {
    background-color: #b0bec5;  /* Стальной голубой */
}

#timeline-tab .bg-december,
.bg-december {
    background-color: #cfd8dc;  /* Светло-серый с голубым оттенком */
}
</style>`;
