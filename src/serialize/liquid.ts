import type { LiquidKindEntity } from '../pb2Objects/entity-types.js';
import type { MapConversionOption } from '../utils/option.js';
import { toPB3String } from './serialize.js';

const acidColor = '0x66ff00';
const waterColor = '0x003344';

export const serializeLiquidKind = (liquidKind: LiquidKindEntity, option: MapConversionOption) => {
	const opacity = liquidKind.actAsWater ? 0.6 : 0;

	const liquid_type =
		liquidKind.damage > 0
			? // Acid?
				option.acid_type === 'Corrosive'
				? 'pb2WaterClass.TYPE_CORROSIVE'
				: 'pb2WaterClass.TYPE_TOXIC'
			: // Water
				'pb2WaterClass.TYPE_WATER';

	const code = `
        ${liquidKind.uid} = pb2WaterClass.DeclareWaterClass({ 
            reflection: 0.8, 
            color: ${liquidKind.damage > 0 ? acidColor : waterColor}, 
            opacity: ${opacity}, 
            glow: false, 
            allow_fixed: true, 
            viscosity: 1, 
            density: 1, 
            extend_left: false, 
            extend_right: false, 
            cover_decals: false, 
            type: ${liquid_type} 
        });
    `;

	const editor_object = {
		operation: 'create',
		constructor: 'pb2WaterClass.DeclareWaterClass',
		id: liquidKind.uid,
		reflection: '0.8',
		color: liquidKind.damage > 0 ? acidColor : waterColor,
		opacity: `${opacity}`,
		glow: 'false',
		allow_fixed: 'true',
		viscosity: '1',
		density: '1',
		depth: 'undefined',
		depth_front: 'undefined',
		extend_left: 'false',
		extend_right: 'false',
		cover_decals: 'false',
		type: liquid_type,
		damage_scale: `${liquidKind.damage}`,
		fire_color: 'new pb2HighRangeColor( 0x723f26 )',
		x: `${liquidKind.position.x}`,
		y: `${liquidKind.position.y}`,
		_visible: '1',
		_locked: '0',
		_disabled: '0',
	};

	return toPB3String({ code: code, jsonObject: JSON.stringify(editor_object) });
};
