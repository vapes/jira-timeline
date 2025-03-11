/**
 * @description CSS styles for timeline visualization
 * @type {string}
 */
export const style = `<style>
/* Table layout */
table {
	border-collapse: collapse;
}

th,
td {
	border: 1px solid #9a9797;
	padding: 0px;
	text-align: center;
}

th {
	background-color: #f2f2f2;
	position: sticky;
	top: 0;
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
	background-color: #4169e1;
	color: white;
}

.blocked {
	background-color: white;
	color: red;
}

.qablocked {
	background-color: #fbbb42;
	color: black;
}

.testing {
	background-color: #ffd700;
	color: black;
}

.open {
	background-color: white;
	color: gray;
}

.hide {
	background-color: white;
	color: white;
}

.blwh {
	background-color: white;
	color: #c8c6c6;
}

.readyqa {
	background-color: #93da6e;
	color: #12630b;
}

.review {
	background-color: blue;
	color: white;
}

.reopened {
	background-color: white;
	color: red;
}

.fixed-column {
	position: sticky;
	left: 0;
	background-color: white;
}

p {
	margin: 0px;
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
	background-color: #f0f0f0;
}

.bg-february {
	background-color: #f5f5f5;
}

.bg-march {
	background-color: #f0ffff;
}

.bg-april {
	background-color: #f0e68c;
}

.bg-may {
	background-color: #fafad2;
}

.bg-june {
	background-color: #ffefd5;
}

.bg-july {
	background-color: #ffdab9;
}

.bg-august {
	background-color: #fffacd;
}

.bg-september {
	background-color: #f0fff0;
}

.bg-october {
	background-color: #fff5ee;
}

.bg-november {
	background-color: #f5fffa;
}

.bg-december {
	background-color: #ffe4e1;
}
</style>`;
