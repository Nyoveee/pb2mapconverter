/*
    This file houses random but useful types.
*/

export interface Position {
	x: number;
	y: number;
}

export interface WorldBoundary {
	min: Position;
	max: Position;
}

export interface XLMParseOutput {
	root: Record<string, ParsedPB2XMLObject[]>;
}

export interface ParsedPB2XMLObject {
	$: Record<string, string>;
}

export interface Geometry {
	x: number;
	y: number;
	w: number;
	h: number;
}

// PB2's UID are not valid UIDs for PB3, due to # and * characters.
export const reformatPB2UID = (uid: string | undefined): string => {
	const string = uid ?? '';

	if (string === '') {
		return string;
	}

	let newUid = string.replace(/#/g, '').replace(/\*/g, '_');

	if (/^\d/.test(newUid)) {
		newUid = 'oleuid_' + newUid;
	}

	return newUid;
};

export const parsePB2MaxCalls = (maxcalls: string | undefined): number => {
	let calls = Number(maxcalls ?? 1);

	if (calls === -1) {
		calls = Infinity;
	}

	return calls;
};

// in PB2, references to other entities can either be undefined or '-1'.
export const parsePB2UIDReference = (uid: string | undefined): string | null => {
	const reformatedUid = reformatPB2UID(uid);
	return reformatedUid === '' || reformatedUid === '-1' ? null : reformatedUid;
};

/**
 * -1 = left
 * 1 = right
 */
export type Side = -1 | 1;

export type BooleanAsString = `${boolean}`;
