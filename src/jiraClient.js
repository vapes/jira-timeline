/**
 * @description Jira API client configuration and initialization
 */
import JiraApi from 'jira-client';
import { crds } from './crds.js';

const jira = new JiraApi(crds);
export default jira;
