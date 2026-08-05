/**
 * A trigger group is essientially a function with arguments. The function body are it's children.
 * A serialized trigger group source code is multi-line, so we need to account for that.
 */
import type { TriggerGroupEntity } from '../pb2Objects/entity-types.js';
import { toPB3String } from './serialize.js';

export const serializeTriggerGroup = (triggerGroup: TriggerGroupEntity): string => {
	// ----------------
	// Line 1..
	// ----------------
	const triggerArguments = triggerGroup.arguments.length === 0 ? '' : ` ${triggerGroup.arguments.join(', ')} `;
	const codeOne = `${triggerGroup.uid} = (${triggerArguments})=>`;
	const editor_object_one = {
		operation: 'layer_definition',
		id: triggerGroup.uid,
		availability: 'global',
		arguments: triggerArguments,
		is_open: true,
		close_when_possible: false,
		enabled: '1',
		max_calls: `${triggerGroup.maxCalls}`,
		auto_spawn: triggerGroup.autoExecute ? '1' : '0',
		auto_spawn_arguments: triggerArguments,
		fail_call_callback: 'null',
		fail_call_callback_same_arguments: '1',
		children_properties_to_rewrite: '',
		x: `${triggerGroup.position.x}`,
		y: `${triggerGroup.position.y}`,
		_visible: '1',
		_locked: '0',
		_disabled: triggerGroup.enabled ? '0' : '1',
		_test_call: 'TestExec',
		_test_call_argument_values: '',
	};

	const lineOne = toPB3String({ code: codeOne, jsonObject: JSON.stringify(editor_object_one) });

	// ----------------
	// Line 2..
	// ----------------
	const codeTwo = `{`;
	const editor_object_two = { operation: 'open_layer_bracket' };

	const lineTwo = toPB3String({ code: codeTwo, jsonObject: JSON.stringify(editor_object_two) });

	// ---------------
	// Multi-line.. body of the function..
	// ---------------
	let functionBody = '';

	for (const child of triggerGroup.children) {
		functionBody += child.serialize();
	}

	// ----------------
	// Last line..
	// ----------------
	let codeThree = `};${triggerGroup.uid}=_pb2T(${triggerGroup.uid},1,${triggerGroup.maxCalls},null,1);`;

	if (triggerGroup.autoExecute) {
		codeThree += `${triggerGroup.uid}(${triggerArguments});`;
	}

	const editor_object_three = { operation: 'close_layer_bracket' };

	const lineThree = toPB3String({ code: codeThree, jsonObject: JSON.stringify(editor_object_three) });

	return lineOne + lineTwo + functionBody + lineThree;
};
