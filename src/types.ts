export interface Dates {
	startDate: Date;
	endDate: Date;
}

export interface JiraIssue {
	key: string;
	fields: {
		customfield_10106?: number;
		timeoriginalestimate?: number;
		summary: string;
		customfield_10801?: {
			value: string;
		};
		assignee?: {
			displayName: string;
		};
	};
}

export interface IssueResult {
	issueKey: string;
	issueSummary: string;
	statusHistory: Array<{
		date: string;
		to: string;
		author: string;
	}>;
	team: string;
	assignee: string;
	estimate: string;
	storyPoints: string;
}

export interface UserStatistics {
	name: string;
	inProgressCount: number;
	reopenedAfterInProgressCount: number;
	reopenedCount: number;
	inTestingCount: number;
	reopenedAfterTestingCount: number;
	reopenedAfterInProgressPercent: string;
	reopenedAfterTestingPercent: string;
	reopenedTickets: Array<{ key: string; summary: string; date: string }>;
}

export type TeamName = 'Animator' | 'QA' | 'Content' | 'BE' | 'TAM' | 'Sound' | 'Art' | 'FE' | 'Math';
export type StatusName =
	| 'In Progress'
	| 'Blocked'
	| 'In Testing'
	| 'Code Review'
	| 'Ready for QA'
	| 'QA Passed'
	| 'QA Blocked'
	| 'Open'
	| 'Created'
	| 'Reopened';
