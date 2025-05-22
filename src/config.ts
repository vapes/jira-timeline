import dotenv from 'dotenv';

// Загружаем переменные окружения из .env файла
dotenv.config();

// Получаем URL Jira из переменных окружения или используем значение по умолчанию
export const jiraHost = process.env.JIRA_HOST || 'jira.example.com';
export const jiraProtocol = process.env.JIRA_PROTOCOL || 'https';

// Конфигурация для статистики
export const highReopenedPercent = 20; // Процент переоткрытых задач для выделения красным
