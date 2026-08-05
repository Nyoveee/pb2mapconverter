import type { EditorObject, ExecuteMethod } from '../pb2Objects/entity-types.js';

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

// Q: Why a map like this instead of transforming all special characters to something like '_' ?
// Answer: There's a possibility that two strings using different special characters may result in the same string. (we want this mapping to be injective)
// EG: #potato tomato and #potato@tomato
const ASCII_SPECIAL_MAP: Record<string, string> = {
	// Whitespace & Controls
	' ': '_space_',
	'\t': '_tab_',
	'\n': '_newline_',
	'\r': '_return_',

	// Common Punctuation
	'.': '_dot_',
	',': '_comma_',
	';': '_semi_',
	':': '_colon_',
	'!': '_excl_',
	'?': '_quest_',
	"'": '_apos_',
	'"': '_quote_',
	'`': '_backtick_',

	// Math & Symbols
	'+': '_plus_',
	'-': '_minus_',
	'*': '_',
	'/': '_slash_',
	'=': '_equal_',
	'%': '_percent_',
	'^': '_caret_',
	'&': '_amp_',
	'|': '_pipe_',
	'~': '_tilde_',

	// Brackets & Enclosures
	'(': '_lparen_',
	')': '_rparen_',
	'[': '_lbracket_',
	']': '_rbracket_',
	'{': '_lbrace_',
	'}': '_rbrace_',
	'<': '_lt_',
	'>': '_gt_',

	// Currency & Identity
	$: '_dollar_',
	'#': '_hash_',
	'@': '_at_',
	'\\': '_bslash_',
	_: '_under_',
};

// PB2's UID are not valid UIDs for PB3, due to # and * characters.
export const reformatPB2UID = (uid: string | undefined): string => {
	let string = uid ?? '';

	if (string === '') {
		return string;
	}

	// Remove initial #
	string = string.startsWith('#') ? string.slice(1) : string;

	let newUid = '';

	// Sanitize string..
	for (const char of string) {
		if (ASCII_SPECIAL_MAP[char] !== undefined) {
			// Map special char to 'X' + lowercase identifier
			newUid += ASCII_SPECIAL_MAP[char];
		} else {
			// Keep existing a-z, A-Z, 0-9 exactly as they are
			newUid += char;
		}
	}

	// Ensure resulting string is a valid JS identifier..
	if (/^\d/.test(newUid)) {
		newUid = 'uid_' + newUid;
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

// In PB2, UID references may use indexes instead of the standard uid. therefore,
// if it's an index, we transform it into a special identifier in the format of `$@{type}_${reference}`.
// For an example, assuming trigger action 0 (force movable A to region B), with param A of '1' and param of '10',
// we will transform param A to '@movable_1' and '@region_10'.

// the reason why we transform these UIDs into a sentinel values instead of resolving it into the corresponding UIDs is because
// there are also trigger references, which this function is still processing. therefore, the list of triggers is not finalized and
// we cannot immediately resolve the index into UIDs.

// references to other entities can also either be undefined or '-1', indicating no reference.
export const parsePB2UIDReference = (reference: string | undefined, type: TriggerReferenceType): string | null => {
	if (reference === undefined || reference === '-1') {
		return null;
	}

	if (isNumericString(reference)) {
		return `@${type}_${reference}`;
	} else {
		return reformatPB2UID(reference);
	}
};

/**
 * -1 = left
 * 1 = right
 */
export type Side = -1 | 1;
export type BooleanAsString = `${boolean}`;
export type Vision = 'pb2Vision.VISION_DIRECTED_TRACE' | 'pb2Vision.VISION_EVERYTHING';

export const escapeSingleQuotes = (str: string): string => {
	// Replaces all single quotes with an escaped version
	return str.replace(/'/g, "\\'");
};

// contains all types that is possible to be referenced by an trigger.
export const ALLOWED_TRIGGER_REFERENCES = ['movable', 'region', 'player', 'gun', 'trigger', 'timer'] as const;
export type TriggerReferenceType = (typeof ALLOWED_TRIGGER_REFERENCES)[number];

export const isNumericString = (val: string): boolean => {
	// Empty strings or spaces return 0 with Number(), so block them first
	if (val.trim() === '') return false;

	return !Number.isNaN(Number(val));
};

export const isExecuteMethod = (object: EditorObject): object is ExecuteMethod => {
	return 'functionName' in object;
};

export const DM_SKIN_IDENTIFIER = 'PB2_DEATHMATCH_SKIN';
export const DM_SKIN_VALUE = 'PB2_DM_SKIN';
