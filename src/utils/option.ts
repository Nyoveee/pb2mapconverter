import { z } from 'zod';

/*
    This is the expected structure of options sent over by the frontend.

    Key names are defined by the value in the 'data-option' attribute for each button,
    whilst the possible values are defined by the 'data-toggle-on' and 'data-toggle-off' attributes respectively.
**/
// export interface MapConversionOption

const optionSchema = z.object({
	movable_sounds: z.enum(['Yes', 'No']),
	antigravity: z.enum(['Entity', 'Static Decoration']),
	generate_terrain: z.enum(['Yes', 'No']),
	acid_type: z.enum(['Corrosive', 'Toxic']),
	use_pb2_module: z.enum(['Yes', 'No']),
});

export type MapConversionOption = z.infer<typeof optionSchema>;

export const defaultOptions: MapConversionOption = {
	movable_sounds: 'Yes',
	antigravity: 'Entity',
	generate_terrain: 'Yes',
	acid_type: 'Corrosive',
	use_pb2_module: 'Yes',
};

export const validateOptions = (requestOption: unknown): MapConversionOption => {
	try {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- will be validated by zod down the line.
		const parsedInput = typeof requestOption === 'string' ? JSON.parse(requestOption) : requestOption;
		return optionSchema.parse(parsedInput);
	} catch (error: unknown) {
		const errorMessage = error instanceof Error ? error.message : String(error);
		console.warn(`Parsing of options in the request body failed, error:\n${errorMessage}\nFalling back to default options..`);
		return defaultOptions;
	}
};
