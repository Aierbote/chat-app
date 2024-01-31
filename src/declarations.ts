interface TUser {
	[email: string]: {
		counter: number;
		lastAccess: Date;
	};
}

interface TUsers {
	[name: string]: TUser;
}

interface TMessage {
	author: string;
	content: string;
	date: Date;
}

export type { TUser, TUsers, TMessage };
