import { colorToPB2Hex, hexToColor } from '../utils/color.js';
import { escapeSingleQuotes, parsePB2UIDReference, reformatPB2UID, type TriggerReferenceType } from '../utils/types.js';

const PB2TriggerActionToExecuteMethod = {
	// Force Movable ‘A’ to Region ‘B’
	'0': {
		functionName: 'MoveMovableToRegion',
		arguments: (argumentA: string, argumentB: string) => {
			return [parseUIDReference(argumentA, 'movable'), parseUIDReference(argumentB, 'region'), 'null'];
		},
	},
	// Change Speed of Movable 'A' to value 'B'
	'1': {
		functionName: 'SetMovableMoveSpeed',
		arguments: (argumentA: string, argumentB: string) => {
			return [parseUIDReference(argumentA, 'movable'), argumentB];
		},
	},
	// Quickly move Region with name 'A' to the position of the region with name 'B'
	'2': {
		functionName: 'MoveRegionToRegion_PB2Preset',
		arguments: (argumentA: string, argumentB: string) => {
			return [parseUIDReference(argumentA, 'region'), parseUIDReference(argumentB, 'region')];
		},
	},
	// Make damage in Region 'B' with power of 'A' hit points.
	'6': {
		functionName: 'DamageInRegion_PB2Preset',
		arguments: (argumentA: string, argumentB: string) => {
			return [parseUIDReference(argumentB, 'region'), argumentA];
		},
	},
	// Kill all Characters at Region 'B' which are not allied to Character 'A'
	'11': {
		functionName: 'KillAllCharactersInRegion_PB2Preset',
		arguments: (argumentA: string, argumentB: string) => {
			return [parseUIDReference(argumentB, 'region'), parseUIDReference(argumentA, 'player')];
		},
	},
	// Destroy all vehicles in Region 'A'
	'12': {
		functionName: 'DestroyAllEntitiesInRegion_PB2Preset',
		arguments: (argumentA: string) => {
			return [parseUIDReference(argumentA, 'region')];
		},
	},
	//	Move Character 'A' to the region 'B' (if Character alive)
	'14': {
		functionName: 'MoveCharacterToPositionIfAlive_PB2Preset',
		arguments: (argumentA: string, argumentB: string) => {
			return [parseUIDReference(argumentA, 'player'), parseUIDReference(argumentB, 'region')];
		},
	},
	// Move Gun 'A' to the Region 'B'
	'15': {
		functionName: 'MoveGunToRegion_PB2Preset',
		arguments: (argumentA: string, argumentB: string) => {
			return [parseUIDReference(argumentA, 'gun'), parseUIDReference(argumentB, 'region')];
		},
	},
	// Move Barrel 'A' to the Region 'B' (if Barrel not exploded)
	'16': {
		functionName: 'MoveEntityToPosition_PB2Preset',
		arguments: (argumentA: string, argumentB: string) => {
			return [reformatPB2UID(argumentA), parseUIDReference(argumentB, 'region')];
		},
	},
	// Deactivate Trigger 'A'
	'19': {
		functionName: 'DeactivateTrigger_PB2Preset',
		arguments: (argumentA: string) => {
			return [parseUIDReference(argumentA, 'trigger')];
		},
	},
	// Activate Trigger 'A'
	'20': {
		functionName: 'ActivateTrigger_PB2Preset',
		arguments: (argumentA: string) => {
			return [parseUIDReference(argumentA, 'trigger')];
		},
	},
	// Set number of remain calls of Trigger 'A' to 0
	'21': {
		functionName: 'SetTriggerMaxCalls_PB2Preset',
		arguments: (argumentA: string) => {
			return [parseUIDReference(argumentA, 'trigger'), '0'];
		},
	},
	// Set number of remain calls of Trigger 'A' to value 'B'
	'22': {
		functionName: 'SetTriggerMaxCalls_PB2Preset',
		arguments: (argumentA: string, argumentB: string) => {
			return [parseUIDReference(argumentA, 'trigger'), argumentB];
		},
	},
	// Make an explosion with power 'A' at Region 'B'
	'24': {
		functionName: 'MakeExplosion_PB2Preset',
		arguments: (argumentA: string, argumentB: string) => {
			return [argumentA, parseUIDReference(argumentB, 'region')];
		},
	},
	// Activate Timer 'A'
	'25': {
		functionName: 'ActivateTimer_PB2Preset',
		arguments: (argumentA: string) => {
			return [parseUIDReference(argumentA, 'timer')];
		},
	},
	// Deactivate Timer 'A'
	'26': {
		functionName: 'DeactivateTimer_PB2Preset',
		arguments: (argumentA: string) => {
			return [parseUIDReference(argumentA, 'timer')];
		},
	},
	// Set the frequency of calls of Timer 'A' to value 'B'
	'27': {
		functionName: 'SetTimerMaxCalls_PB2Preset',
		arguments: (argumentA: string, argumentB: string) => {
			return [parseUIDReference(argumentA, 'timer'), argumentB];
		},
	},
	// Reset current phase of between-call waiting of Timer 'A'
	'44': {
		functionName: 'ResetTimerElapsedTime_PB2Preset',
		arguments: (argumentA: string) => {
			return [parseUIDReference(argumentA, 'timer')];
		},
	},
	// Set remain calls number of Timer 'A' to value 'B'.
	'46': {
		functionName: 'SetTimerMaxCalls_PB2Preset',
		arguments: (argumentA: string, argumentB: string) => {
			return [parseUIDReference(argumentA, 'timer'), argumentB];
		},
	},
	// Teleport all players from Region 'A' to Region 'B'
	'30': {
		functionName: 'TeleportAllPlayers_PB2Preset',
		arguments: (argumentA: string, argumentB: string) => {
			return [parseUIDReference(argumentA, 'region'), parseUIDReference(argumentB, 'region')];
		},
	},
	// Teleport all players from Region 'A' to Region 'B' and invert speed by X axis (used to avoid loop teleportation)
	// I don't know how to reliably invert X speed yet, so defaults back to 30.
	'31': {
		functionName: 'TeleportAllPlayers_PB2Preset',
		arguments: (argumentA: string, argumentB: string) => {
			return [parseUIDReference(argumentA, 'region'), parseUIDReference(argumentB, 'region')];
		},
	},
	// Set game speed to 'A' frames per second (default game speed is 30. Does not influence rendering
	'39': {
		functionName: 'SetGameFPS_PB2Preset',
		arguments: (argumentA: string) => {
			return [argumentA];
		},
	},
	// Show text 'A' in chat with color 'B'
	'42': {
		functionName: 'SendChat_PB2Preset',
		arguments: (argumentA: string, argumentB: string) => {
			// argument B is either hexcode string, or an element in [0, 1, 2, 3, 4];
			let speakerName;
			let hexColor = 'new pb2HighRangeColor( 0xffffff )';
			let messageHexColor = 'new pb2HighRangeColor( 0xffffff )';

			switch (argumentB) {
				case '0':
					speakerName = `'EXOS'`;
					hexColor = 'new pb2HighRangeColor( 0xaaddff )';
					break;
				case '1':
					speakerName = `'Marine'`; // sorry i cba xD
					hexColor = 'new pb2HighRangeColor( 0xaaffaa )';
					break;
				case '2':
					speakerName = `'Noir Lime'`;
					hexColor = 'new pb2HighRangeColor( 0xddffaa )';
					break;
				case '3':
					speakerName = `'Proxy'`;
					hexColor = 'new pb2HighRangeColor( 0xffaaff )';
					break;
				case '4':
					speakerName = `'Civil Security'`;
					hexColor = 'new pb2HighRangeColor( 0xffaaaa )';
					break;
				default:
					speakerName = `''`;
					messageHexColor = `new pb2HighRangeColor( ${colorToPB2Hex(hexToColor(argumentB))} )`;
					break;
			}

			return [speakerName, `'${escapeSingleQuotes(argumentA)}'`, hexColor, messageHexColor];
		},
	},
	// Set Character 'A' current and max hit points to value 'B'
	'59': {
		functionName: 'SetCharacterHealth_PB2Preset',
		arguments: (argumentA: string, argumentB: string) => {
			return [parseUIDReference(argumentA, 'player'), argumentB];
		},
	},
	// Move Region 'A' to Player 'B'
	'80': {
		functionName: 'MoveRegionToPosition_PB2Preset',
		arguments: (argumentA: string, argumentB: string) => {
			return [parseUIDReference(argumentA, 'region'), parseUIDReference(argumentB, 'player')];
		},
	},
	// Move Region 'A' relative to current position along X
	'83': {
		functionName: 'MoveRegionByOffset_PB2Preset',
		arguments: (argumentA: string, argumentB: string) => {
			return [parseUIDReference(argumentA, 'region'), argumentB, '0'];
		},
	},
	// Move Region 'A' relative to current position along Y
	'84': {
		functionName: 'MoveRegionByOffset_PB2Preset',
		arguments: (argumentA: string, argumentB: string) => {
			return [parseUIDReference(argumentA, 'region'), '0', argumentB];
		},
	},
	// Move Region 'A' to Movable 'B'
	'98': {
		functionName: 'MoveRegionToMovable_PB2Preset',
		arguments: (argumentA: string, argumentB: string) => {
			return [parseUIDReference(argumentA, 'region'), parseUIDReference(argumentB, 'movable')];
		},
	},
	// Execute Trigger 'A'
	'99': {
		functionName: 'ExecuteTrigger_PB2Preset',
		arguments: (argumentA: string) => {
			return [parseUIDReference(argumentA, 'trigger')];
		},
	},
	// Heal player 'A' by 'B' hit points
	'255': {
		functionName: 'HealChracter_PB2Preset',
		arguments: (argumentA: string, argumentB: string) => {
			return [parseUIDReference(argumentA, 'player'), argumentB];
		},
	},
	// Move Region 'A' to Gun 'B'
	'323': {
		functionName: 'MoveRegionToPosition_PB2Preset',
		arguments: (argumentA: string, argumentB: string) => {
			return [parseUIDReference(argumentA, 'region'), parseUIDReference(argumentB, 'gun')];
		},
	},
};

function isValidKey(key: string): key is keyof typeof PB2TriggerActionToExecuteMethod {
	return key in PB2TriggerActionToExecuteMethod;
}

export const getAssociatedExecuteMethodProperties = (actionType: string, argumentA: string, argumentB: string) => {
	if (!isValidKey(actionType)) {
		return null;
	}

	const properties = PB2TriggerActionToExecuteMethod[actionType];

	return {
		functionName: properties.functionName,
		arguments: properties.arguments(argumentA, argumentB),
	};
};

const parseUIDReference = (argument: string, type: TriggerReferenceType) => {
	const uid = parsePB2UIDReference(argument, type);
	return uid ?? '-1';
};
