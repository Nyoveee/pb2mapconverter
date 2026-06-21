import type { PB3Entity } from '#pb2Objects/entity-types.js';
import { toPB3String } from './serialize.js';

export const serializeVehicle = (vehicle: PB3Entity): string => {
	const code = `
        pb2Entity.CreateEntity({ 
            x: ${vehicle.position.x}, 
            y: ${vehicle.position.y}, 
            type: ${vehicle.type}, 
            side: ${vehicle.direction}, 
            driver_can_enter: true, 
            driver_can_leave: true, 
            scale: ${vehicle.scale}, 
            multiply_health: ${vehicle.healthScale} 
        });
    `;

	const editor_object = {
		operation: 'create',
		constructor: 'pb2Entity.CreateEntity',
		id: '',
		x: `${vehicle.position.x}`,
		y: `${vehicle.position.y}`,
		type: vehicle.type,
		team: 'null',
		creator_ragdoll: 'null',
		style_id: vehicle.styleId,
		tox: '0',
		toy: '0',
		side: `${vehicle.direction}`,
		rotation: '0 / 180 * Math.PI',
		onDeath: 'null',
		driver_can_enter: 'true',
		driver_can_leave: 'true',
		scale: `${vehicle.scale}`,
		multiply_health: `${vehicle.healthScale}`,
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
	};

	return toPB3String({ code: code, jsonObject: JSON.stringify(editor_object) });
};
