import type { PB3Entity } from '#pb2Objects/entity-types.js';
import { toPB3String } from './serialize.js';

export const serializePB3Entity = (pb3Entity: PB3Entity): string => {
	const code = `
        pb2Entity.CreateEntity({ 
            x: ${pb3Entity.position.x}, 
            y: ${pb3Entity.position.y}, 
            type: ${pb3Entity.type}, 
            side: ${pb3Entity.direction}, 
            driver_can_enter: true, 
            driver_can_leave: true, 
            scale: ${pb3Entity.scale}, 
            multiply_health: ${pb3Entity.healthScale}
        });
    `;

	const editor_object = {
		operation: 'create',
		constructor: 'pb2Entity.CreateEntity',
		id: '',
		x: `${pb3Entity.position.x}`,
		y: `${pb3Entity.position.y}`,
		type: pb3Entity.type,
		team: 'null',
		creator_ragdoll: 'null',
		style_id: pb3Entity.styleId,
		tox: '0',
		toy: '0',
		side: `${pb3Entity.direction}`,
		rotation: '0 / 180 * Math.PI',
		onDeath: 'null',
		driver_can_enter: 'true',
		driver_can_leave: 'true',
		scale: `${pb3Entity.scale}`,
		multiply_health: `${pb3Entity.healthScale}`,
		_visible: '1',
		_locked: '0',
		_disabled: '0',
		gun: 'null',
		range: 'undefined',
		strength: '1',
		mass_cap_scale: '1',
		cooldown_duration_scale: '1',
		can_be_damaged: 'true',
		act_x: '0',
		act_y: '0',
		time_to_live: '0',
		...(pb3Entity.type === 'pb2Entity.TYPE_ANTIGRAVITY '
			? {
					range: '0',
					strength: '0',
					mass_cap_scale: '1',
					cooldown_duration_scale: '1',
					can_be_damaged: 'true',
				}
			: {}),
	};

	return toPB3String({ code: code, jsonObject: JSON.stringify(editor_object) });
};
