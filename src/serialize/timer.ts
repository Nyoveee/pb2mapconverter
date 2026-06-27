import type { TimerEntity } from '#pb2Objects/entity-types.js';
import { toPB3String } from './serialize.js';

export const serializeTimer = (timer: TimerEntity): string => {
	const triggerToExecute = timer.triggerToExecuteUID === null ? 'null' : `(...a)=>${timer.triggerToExecuteUID}(...a)`;

	let code = `
        ${timer.uid} = pb2Timer.CreateTimer( ${triggerToExecute}, ${timer.delay}, pb2Timer.TYPE_GAME_TIMESCALE, undefined ).SetCalls(${timer.maxCalls})
    `;

	if (!timer.enabled) {
		code += '.Stop()';
	}

	code += ';';

	const editor_object = {
		id: timer.uid,
		operation: 'create',
		constructor: 'pb2Timer.CreateTimer',
		inline: 'false',
		time_to_wait: `${timer.delay}`,
		type: 'pb2Timer.TYPE_GAME_TIMESCALE',
		calls: `${timer.maxCalls}`,
		position_container: 'null',
		callback: `${timer.triggerToExecuteUID}`,
		x: `${timer.position.x}`,
		y: `${timer.position.y}`,
		_visible: '1',
		_locked: '0',
		_disabled: '0',
		enabled: `${timer.enabled}`,
	};

	return toPB3String({ code: code, jsonObject: JSON.stringify(editor_object) });
};
