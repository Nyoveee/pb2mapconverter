import type { Script } from '../pb2Objects/entity-types.js';

export const serializeScript = (script: Script): string => {
	const editor_object = {
		operation: 'code',
		snippet_color: '0xffffff',
		code: script.code,
		x: script.position.x.toString(),
		y: script.position.y.toString(),
		_visible: '1',
		_locked: '0',
		_disabled: '0',
	};

	return `${script.code}//->Ditto->//${JSON.stringify(editor_object)}\n`;
};
