import type { ExecuteMethod } from '#pb2Objects/entity-types.js';
import { toPB3String } from './serialize.js';

export const serializeExecuteMethod = (entity: ExecuteMethod): string => {
	const fullFunctionName = `globalThis.${entity.functionName}`;
	const executeArguments = entity.arguments.join(', ');
	const code = `${fullFunctionName}(${executeArguments});`;

	const attributeObject: Record<string, string> = {};

	for (const [index, argument] of entity.arguments.entries()) {
		attributeObject[`attr${index}`] = argument;
	}

	const editor_object = {
		operation: 'call_method',
		method: fullFunctionName,
		argument_values: '',
		keep_at_the_bottom: '0',
		x: `${entity.position.x}`,
		y: `${entity.position.y}`,
		_visible: '1',
		_locked: '0',
		_disabled: '0',
		...attributeObject,
	};

	return toPB3String({ code: code, jsonObject: JSON.stringify(editor_object) });
};
