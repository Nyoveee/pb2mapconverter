import fs from 'fs/promises';
import path from 'node:path';
import { describe, expect, test, vi } from 'vitest';

import convertPB2XMLFile from '#process.js';

const retrieveMapContent = async (mapName: string) => {
	const testMapDirectory = path.join(process.cwd(), 'src', '__tests__', 'maps');
	const testMap = path.join(testMapDirectory, mapName + '.xml');

	const fileContent = await fs.readFile(testMap, 'utf-8');
	return await convertPB2XMLFile(fileContent);
};

const retrieveExpectedParsedMapResult = async (mapName: string) => {
	const expectedResultsDirectory = path.join(process.cwd(), 'src', '__tests__', 'expected');
	const expectedResultsFile = path.join(expectedResultsDirectory, mapName + '.js');

	return await fs.readFile(expectedResultsFile, 'utf-8');
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- useful function for debugging.
const writeResult = async (mapName: string, result: string) => {
	const testMapDirectory = path.join(process.cwd(), 'src', '__tests__', 'expected');
	const testMap = path.join(testMapDirectory, mapName + '.js');

	await fs.writeFile(testMap, result);
};

// Handles CRLF and LF difference.
const normalize = (str: string) => str.replace(/\r\n/g, '\n');

const verifyParsingOf = vi.defineHelper(async (mapName: string) => {
	const result = await retrieveMapContent(mapName);

	expect(result).toBeDefined();

	if (result === undefined) {
		return;
	}

	const expected = await retrieveExpectedParsedMapResult(mapName);

	expect(normalize(result)).toBe(normalize(expected));
});

describe('static object parsing', () => {
	test('simple parsing verification', async () => {
		await verifyParsingOf('simple');
	});

	test('background parsing test', async () => {
		await verifyParsingOf('background');
	});

	test('water parsing test', async () => {
		await verifyParsingOf('water');
	});

	test('movable parsing verification', async () => {
		await verifyParsingOf('movable');
	});

	test('walls parsing verification', async () => {
		await verifyParsingOf('walls');
	});

	test('characters parsing verification', async () => {
		await verifyParsingOf('character');
	});

	test('lamps parsing verification', async () => {
		await verifyParsingOf('lamps');
	});

	test('pusher parsing verification', async () => {
		await verifyParsingOf('pushers');
	});

	test.todo('vehicles parsing verification');
	test.todo('decoration parsing verification');
	test.todo('engine mark parsing verification');
});

describe.todo('trigger execution graph');
