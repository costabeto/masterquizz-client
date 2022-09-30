export interface IUser {
	name: string;
	id: string;
}

export interface IRoundResultAnswer {
	user: string;
	name: string;
	answer: string;
}

export interface IRoundResult {
	round: number;
	question: string;
	correctAnswer: string;
	answers: IRoundResultAnswer[];
}

export interface IOption {
	[x: string]: string;
}

export interface IRound {
	question: string;
	options: IOption;
}

export interface IGameResultAnswer {
	user: string;
	name: string;
	answer: string;
}

export interface IGameResult {
	round: number;
	question: string;
	correctAnswer: string;
	answers: IGameResultAnswer[];
}
