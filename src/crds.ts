import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

interface JiraCredentials {
	protocol: string;
	host: string;
	username: string;
	password: string;
	apiVersion: string;
	strictSSL: boolean;
}

/**
 * @description Jira API credentials and configuration from environment variables
 */
export const crds: JiraCredentials = {
	protocol: process.env.JIRA_PROTOCOL || '',
	host: process.env.JIRA_HOST || '',
	username: process.env.JIRA_USERNAME || '',
	password: process.env.JIRA_PASSWORD || '',
	apiVersion: process.env.JIRA_API_VERSION || '2',
	strictSSL: true
};

// Validate required environment variables
const requiredEnvVars = ['JIRA_PROTOCOL', 'JIRA_HOST', 'JIRA_USERNAME', 'JIRA_PASSWORD'];
requiredEnvVars.forEach((varName) => {
	if (!process.env[varName]) {
		throw new Error(`Missing required environment variable: ${varName}`);
	}
});
