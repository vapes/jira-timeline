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
    padding: 20px;
    background-color: #f9f9f9;
    color: #333;
}

.scrollable-content {
    overflow-x: auto;
    padding-bottom: 20px;
}

/* Table layout */
table {
    border-collapse: collapse;
    font-family: 'Open Sans', sans-serif;
    width: max-content;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

th,
td {
    border: 1px solid #9a9797;
    padding: 2px;
    text-align: center;
}

th {
    background-color: #f2f2f2;
    position: sticky;
    top: 0;
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    font-size: 13px;
}

/* Fixed column (summary) styling */
.fixed-column {
    position: sticky;
    left: 0;
    background-color: white;
    z-index: 1;
    box-shadow: 2px 0 4px rgba(0,0,0,0.1);
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

.bg-june {
    background-color: #ffecb3;  /* Золотисто-желтый */
}

.bg-july {
    background-color: #ffcc80;  /* Оранжевый */
}

.bg-august {
    background-color: #ffab91;  /* Терракотовый */
}

.bg-september {
    background-color: #ffab91;  /* Коралловый */
}

.bg-october {
    background-color: #bcaaa4;  /* Серо-коричневый */
}

.bg-november {
    background-color: #b0bec5;  /* Стальной голубой */
}

.bg-december {
    background-color: #cfd8dc;  /* Светло-серый с голубым оттенком */
}
</style>`;
