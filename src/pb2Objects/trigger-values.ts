import { reformatPB2UID } from '#utils/types.js';

const PB2TriggerActionToExecuteMethod = {
	'0': {
		functionName: 'MoveMovableToRegion',
		arguments: (argumentA: string, argumentB: string) => {
			return [reformatPB2UID(argumentA), reformatPB2UID(argumentB), 'null'];
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
