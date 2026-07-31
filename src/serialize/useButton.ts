import type { UseButtonEntity } from '../pb2Objects/entity-types.js';
import { toPB3String } from './serialize.js';

const DEFAULT_EDITOR_OBJECT = {
	operation: 'create',
	constructor: 'pb2UsableSwitch.CreateSwitch',
	model_frame: '0',
	base_color: 'new pb2HighRangeColor( 0x7f7f7f )',
	glow_color: 'new pb2HighRangeColor( 0x007f00 )',
	text_color: 'new pb2HighRangeColor( 0x7f7f7f )',
	usable_glow_intensity: '1',
	is_usable: 'true',
	press_timeout: '0',
	use_sound: "'s_t_switchB'",
	use_sound_pitch: '1',
	use_sound_volume: '1',
	fail_sound: "'s_t_switch_deniedB'",
	fail_sound_pitch: '1',
	fail_sound_volume: '1',
	_visible: '1',
	_locked: '0',
	_disabled: '0',
};

export const serializeUseButton = (useButton: UseButtonEntity) => {
	const code = `pb2UsableSwitch.CreateSwitch({
		x: ${useButton.position.x},
		y: -${useButton.position.y},
		model_frame: 0,
		base_color: new pb2HighRangeColor(0x7f7f7f),
		glow_color: new pb2HighRangeColor(0x007f00),
		text_color: new pb2HighRangeColor(0x7f7f7f),
		usable_glow_intensity: 1,
		attachment: ${useButton.attachedMovableUID},
		is_usable: true,
		press_timeout: 0,
		onUse: ${useButton.triggerToExecuteUID},
		use_sound: 's_t_switchB',
		use_sound_pitch: 1,
		use_sound_volume: 1,
		fail_sound: 's_t_switch_deniedB',
		fail_sound_pitch: 1,
		fail_sound_volume: 1,
	});`;

	const editor_object = {
		...DEFAULT_EDITOR_OBJECT,
		id: useButton.uid,
		x: `${useButton.position.x}`,
		y: `${useButton.position.y}`,
		attachment: `${useButton.attachedMovableUID}`,
		onUse: `${useButton.triggerToExecuteUID}`,
	};

	return toPB3String({ code: code, jsonObject: JSON.stringify(editor_object) });
};
