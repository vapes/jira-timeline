/**
 * @description Client-side JavaScript code
 */
export const clientScripts = `
<script>
  function showTab(tabName) {
      // Скрываем все табы
      document.querySelectorAll('.tab-content').forEach(tab => {
          tab.style.display = 'none';
      });
      
      // Показываем выбранный таб
      document.getElementById(tabName).style.display = 'block';
      
      // Убираем активный класс у всех кнопок
      document.querySelectorAll('.tab-button').forEach(button => {
          button.classList.remove('active');
      });
      
      // Добавляем активный класс нажатой кнопке
      document.querySelector(\`[data-tab="\${tabName}"]\`).classList.add('active');
  }
  
  function toggleTicketsList(userId) {
      const ticketsList = document.getElementById('tickets-list-' + userId);
      const toggleIcon = document.getElementById('toggle-icon-' + userId);
      
      if (ticketsList.style.display === 'none' || !ticketsList.style.display) {
          ticketsList.style.display = 'block';
          toggleIcon.textContent = '▼';
          toggleIcon.classList.add('expanded');
      } else {
          ticketsList.style.display = 'none';
          toggleIcon.textContent = '►';
          toggleIcon.classList.remove('expanded');
      }
  }
  
  // При загрузке страницы показываем первую вкладку
  window.onload = function() {
      showTab('timeline-tab');
  }
</script>
`;
