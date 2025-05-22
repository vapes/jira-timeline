/**
 * @description Jira API client configuration and initialization
 */
import JiraApi from 'jira-client';
import { crds } from './crds';

const jira: JiraApi = new JiraApi(crds);
export default jira;
