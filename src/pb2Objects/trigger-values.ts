import { reformatPB2UID } from '#utils/types.js';

const PB2TriggerActionToExecuteMethod = {
	// Force Movable ‘A’ to Region ‘B’
	'0': {
		functionName: 'MoveMovableToRegion',
		arguments: (argumentA: string, argumentB: string) => {
			return [reformatPB2UID(argumentA), reformatPB2UID(argumentB), 'null'];
		},
	},
	// Change Speed of Movable 'A' to value 'B'
	'1': {
		functionName: 'SetMovableMoveSpeed',
		arguments: (argumentA: string, argumentB: string) => {
			return [reformatPB2UID(argumentA), argumentB];
		},
	},
	// Quickly move Region with name 'A' to the position of the region with name 'B'
	'2': {
		functionName: 'MoveRegionToRegion_PB2Preset',
		arguments: (argumentA: string, argumentB: string) => {
			return [reformatPB2UID(argumentA), reformatPB2UID(argumentB)];
		},
	},
	// Make damage in Region 'B' with power of 'A' hit points.
	'6': {
		functionName: 'DamageInRegion_PB2Preset',
		arguments: (argumentA: string, argumentB: string) => {
			return [reformatPB2UID(argumentB), argumentA];
		},
	},
	// Kill all Characters at Region 'B' which are not allied to Character 'A'
	'11': {
		functionName: 'KillAllCharactersInRegion_PB2Preset',
		arguments: (argumentA: string, argumentB: string) => {
			return [reformatPB2UID(argumentB), reformatPB2UID(argumentA)];
		},
	},
	// Destroy all vehicles in Region 'A'
	'12': {
		functionName: 'DestroyAllEntitiesInRegion_PB2Preset',
		arguments: (argumentA: string) => {
			return [reformatPB2UID(argumentA)];
		},
	},
	//	Move Character 'A' to the region 'B' (if Character alive)
	'14': {
		functionName: 'MoveCharacterToPositionIfAlive_PB2Preset',
		arguments: (argumentA: string, argumentB: string) => {
			return [reformatPB2UID(argumentA), reformatPB2UID(argumentB)];
		},
	},
	// Move Gun 'A' to the Region 'B'
	'15': {
		functionName: 'MoveGunToRegion_PB2Preset',
		arguments: (argumentA: string, argumentB: string) => {
			return [reformatPB2UID(argumentA), reformatPB2UID(argumentB)];
		},
	},
	// Make an explosion with power 'A' at Region 'B'
	'24': {
		functionName: 'MakeExplosion_PB2Preset',
		arguments: (argumentA: string, argumentB: string) => {
			return [argumentA, reformatPB2UID(argumentB)];
		},
	},
	// Teleport all players from Region 'A' to Region 'B'
	'30': {
		functionName: 'TeleportAllPlayers_PB2Preset',
		arguments: (argumentA: string, argumentB: string) => {
			return [reformatPB2UID(argumentA), reformatPB2UID(argumentB)];
		},
	},
	// Teleport all players from Region 'A' to Region 'B' and invert speed by X axis (used to avoid loop teleportation)
	// I don't know how to reliably invert X speed yet, so defaults back to 30.
	'31': {
		functionName: 'TeleportAllPlayers_PB2Preset',
		arguments: (argumentA: string, argumentB: string) => {
			return [reformatPB2UID(argumentA), reformatPB2UID(argumentB)];
		},
	},
	// Move Region 'A' to Player 'B'
	'80': {
		functionName: 'MoveRegionToPosition_PB2Preset',
		arguments: (argumentA: string, argumentB: string) => {
			return [reformatPB2UID(argumentA), reformatPB2UID(argumentB)];
		},
	},
	// Move Region 'A' relative to current position along X
	'83': {
		functionName: 'MoveRegionByOffset_PB2Preset',
		arguments: (argumentA: string, argumentB: string) => {
			return [reformatPB2UID(argumentA), argumentB, '0'];
		},
	},
	// Move Region 'A' relative to current position along Y
	'84': {
		functionName: 'MoveRegionByOffset_PB2Preset',
		arguments: (argumentA: string, argumentB: string) => {
			return [reformatPB2UID(argumentA), '0', reformatPB2UID(argumentB)];
		},
	},
	// Move Region 'A' to Movable 'B'
	'98': {
		functionName: 'MoveRegionToMovable_PB2Preset',
		arguments: (argumentA: string, argumentB: string) => {
			return [reformatPB2UID(argumentA), reformatPB2UID(argumentB)];
		},
	},
	// Move Region 'A' to Gun 'B'
	'323': {
		functionName: 'MoveRegionToPosition_PB2Preset',
		arguments: (argumentA: string, argumentB: string) => {
			return [reformatPB2UID(argumentA), reformatPB2UID(argumentB)];
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
