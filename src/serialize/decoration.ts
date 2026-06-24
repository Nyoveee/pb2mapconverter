import type { DecorationEntity } from '#pb2Objects/entity-types.js';
import { toPB3String } from './serialize.js';

export const serializeDecoration = (decoration: DecorationEntity): string => {
	const code = `
    ${decoration.uid} = pb2Decoration.CreateDecoration({ 
        x: ${decoration.position.x}, 
        y: ${decoration.position.y}, 
        is_static: true, 
        source: '${decoration.userDataId}'/*${decoration.previewName}*/, 
        model_source: null, 
        use_offset: true, 
        offsetX: ${decoration.textureXOffset}, 
        offsetY: ${decoration.textureYOffset}, 
        scaleX: ${decoration.scaleX}, 
        scaleY: ${decoration.scaleY}, 
        rotationZ: ${decoration.rotationZ} / 180 * Math.PI 
    });`;

	const editor_object = {
		operation: 'create',
		constructor: 'pb2Decoration.CreateDecoration',
		id: decoration.uid,
		x: `${decoration.position.x}`,
		y: `${decoration.position.y}`,
		z: '0',
		is_static: 'true',
		source: `'${decoration.userDataId}'/*${decoration.previewName}*/`,
		model_source: 'null',
		source_glow: 'null',
		layer: 'pb2Decoration.LAYER_WORLD',
		scaleX: `${decoration.scaleX}`,
		scaleY: `${decoration.scaleY}`,
		scaleZ: '1',
		rotationZ: `${decoration.rotationZ} / 180 * Math.PI`,
		rotationX: '0',
		rotationY: '0',
		use_offset: 'true',
		offsetX: `${decoration.textureXOffset}`,
		offsetY: `${decoration.textureYOffset}`,
		offsetZ: '0',
		attachment_mode: 'pb2Decoration.ATTACHMENT_DISABLED',
		attachment_obj: 'null',
		attachment_mesh_id: '0',
		relative_to_mesh: 'null',
		hide_relative_to_mesh: 'false',
		inherit_effects: 'true',
		visible: 'true',
		default_visibility: 'true',
		inverse_filter: '[]',
		blending: 'pb2Decoration.BLENDING_NORMAL',
		shading: 'pb2Decoration.SHADING_INITIAL',
		pixelated: 'false',
		color_mult: 'new pb2HighRangeColor( 0xffffff )',
		color_mult_glow: 'new pb2HighRangeColor( 0xffffff )',
		alpha: '1',
		glowing_intensity: 'undefined',
		_visible: '1',
		_locked: '0',
		_disabled: '0',
	};

	return toPB3String({ code: code, jsonObject: JSON.stringify(editor_object) });
};
