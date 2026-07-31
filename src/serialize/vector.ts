import type { Vector } from '../pb2Objects/entity-types.js';
import { toPB3String } from './serialize.js';

export const serializeVector = (vector: Vector): string => {
	const code = `${vector.uid} = new Vector({ x: ${vector.position.x}, y: ${vector.position.y}, dx: ${vector.dx}, dy: ${vector.dy} });`;

	const editor_object = {
		id: vector.uid,
		operation: 'create',
		constructor: 'new Vector',
		x: `${vector.position.x}`,
		y: `${vector.position.y}`,
		dx: `${vector.dx}`,
		dy: `${vector.dy}`,
		_visible: '1',
		_locked: '0',
		_disabled: '0',
	};

	return toPB3String({ code: code, jsonObject: JSON.stringify(editor_object) });
};
