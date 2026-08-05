import type { Variable } from '../pb2Objects/entity-types.js';
import { serializeSpacer, toPB3String } from './serialize.js';

export const serializeVariable = (variable: Variable): string => {
	const code = `let ${variable.uid} = ${variable.value}`;

	const editor_object = {
		operation: 'var',
		id: variable.uid,
		value: variable.value,
		x: '0',
		y: '0',
		_visible: '1',
		_locked: '0',
		_disabled: '0',
	};

	const result = variable.comment ? serializeSpacer() + variable.comment : '';
	return result + toPB3String({ code: code, jsonObject: JSON.stringify(editor_object) });
};
