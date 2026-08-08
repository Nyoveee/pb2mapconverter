/* 
    This file contains a typed representation of a parsed PB2 map.

    This is useful in a way to process and handle constraints like asset requirements,
    triggers, etc..
*/
import {
	ALLOWED_TRIGGER_REFERENCES,
	DM_SKIN_IDENTIFIER,
	DM_SKIN_VALUE,
	isExecuteMethod,
	parsePB2MaxCalls,
	parsePB2UIDReference,
	reformatPB2UID,
	type BooleanAsString,
	type ParsedPB2XMLObject,
	type Position,
	type TriggerReferenceType,
	type WorldBoundary,
	type XLMParseOutput,
} from './utils/types.js';
import type {
	SurfaceEntity,
	LiquidKindEntity,
	TeamEntity,
	WallEntity,
	BackgroundEntity,
	MovableEntity,
	WaterEntity,
	LampEntity,
	GunEntity,
	CharacterEntity,
	SkinEntity,
	AIPresetEntity,
	PointEntity,
	RegionEntity,
	UseButtonEntity,
	TriggerGroupEntity,
	ExecuteMethod,
	Vector,
	PusherEntity,
	PB3Entity,
	DecorationEntity,
	TimerEntity,
	EditorObject,
	Script,
	Variable,
} from './pb2Objects/entity-types.js';
import { getBackgroundKey, type BackgroundIdentifierStr } from './pb2Objects/surface.js';
import { getLiquidKindKey, type LiquidIdentifierStr } from './pb2Objects/liquid.js';

import { getCenterPosition, parseGeometry, updateWorldBoundary } from './utils/math.js';
import { movableSoundPreset, movableSoundPresetVarName, PB3StandardFooter, PB3StandardMapHeader, serializeComment, serializeSpacer } from './serialize/serialize.js';
import { serializeBox } from './serialize/box.js';
import { serializeLamp } from './serialize/lamp.js';
import { serializeGun } from './serialize/gun.js';
import { doubleColor, hexToColor, isValidHexCode, whiteColor, type Color } from './utils/color.js';
import { serializeLiquidKind } from './serialize/liquid.js';
import { createPB2BackgroundSurface, createPB2MovableSurface_isVisible, createPB2WallSurface, pb2ShadowBackgroundMaterial } from './pb2Objects/surface-map.js';
import { serializeTeam } from './serialize/team.js';
import { serializeSkin } from './serialize/skin.js';
import { serializeAIPreset } from './serialize/ai-preset.js';
import { serializeCharacter } from './serialize/character.js';
import {
	EDITOR_ICON_HEIGHT,
	EDITOR_ICON_WIDTH,
	getPB3EntityDetails,
	iconHeightGap,
	isRegionAUSEButton,
	NO_ACTIVATION_METHOD,
	PB2DecorToPB3Decor,
	PB2GunModelToPB3,
	PB2GunModelToPB3Gadget,
	PB2SkinToPB3,
	PUSHER,
	teamNames,
} from './pb2Objects/special-values.js';
import { serializePoint } from './serialize/point.js';
import { serializeUseButton } from './serialize/useButton.js';
import { serializeVector } from './serialize/vector.js';
import { serializeExecuteMethod } from './serialize/executeMethod.js';
import { serializeTriggerGroup } from './serialize/triggerGroup.js';
import { serializePB3Entity } from './serialize/pb3Entity.js';
import { serializeDecoration } from './serialize/decoration.js';
import { getAssociatedExecuteMethodProperties } from './pb2Objects/trigger-values.js';
import { serializeTimer } from './serialize/timer.js';
import type { MapConversionOption } from './utils/option.js';
import { serializeScript } from './serialize/script.js';
import {
	createForceRegenScript,
	createMapConfigureScript,
	createPB2ModuleEndScript,
	createPB2ModuleStartScript,
	createSpawnGrenadesScript,
	getGrenadeSpawnPointUID,
} from './pb2Objects/script.js';
import { serializeVariable } from './serialize/variable.js';

export class PB3Map {
	// ============================================================================================

	// PB2 Objects
	private walls: WallEntity[] = [];
	private backgrounds: BackgroundEntity[] = [];
	private lamps: LampEntity[] = [];
	private guns: GunEntity[] = [];
	private waters: WaterEntity[] = [];
	private movables: MovableEntity[] = [];
	private characters: CharacterEntity[] = [];
	private regions: RegionEntity[] = [];
	private pushers: PusherEntity[] = [];
	private decorations: DecorationEntity[] = [];

	// Derived PB3 Objects.. (assets, execute method, comments, etc..)
	private wallSurfaces: Record<number, SurfaceEntity> = {}; // maps every unique PB2 wall material (an id) with a created wall surface.
	private backgroundSurfaces: Record<BackgroundIdentifierStr, SurfaceEntity> = {}; // maps every unique PB2 background material + color mult with a created background surface.
	private liquidKinds: Record<LiquidIdentifierStr, LiquidKindEntity> = {}; // maps every unique PB2 water property with a created liquid kind.
	private movableSurfaces: Partial<Record<BooleanAsString, SurfaceEntity>> = {}; // maps every unique PB2 door "look" with a movable surface.
	private teams: Record<number, TeamEntity> = {}; // maps every unique PB2 team number property with a created team.
	private skins: Record<number, SkinEntity> = {};
	private aiPresets: Record<number, AIPresetEntity> = {};

	private variables: Variable[] = [];
	private useButtons: UseButtonEntity[] = [];
	private points: PointEntity[] = [];
	private triggerGroups: TriggerGroupEntity[] = [];
	private pb3Entities: PB3Entity[] = [];
	private timers: TimerEntity[] = [];

	// Metadata
	private options: MapConversionOption;
	private worldBoundary: WorldBoundary = { min: { x: Infinity, y: Infinity }, max: { x: -Infinity, y: -Infinity } };
	private hasGrenades = false;
	private usedUIDs: Record<string, number> = {};
	private allUIDs: Set<string> = new Set<string>();
	private scriptIndex = 0;

	// ============================================================================================

	// Constructs a valid representation of the PB2 map, given an opaque parsed XML object.
	constructor(xmlFile: XLMParseOutput, options: MapConversionOption) {
		this.options = options;

		// --------------------------------------------------
		// 1. We focus on parsing all PB2 objects..
		// --------------------------------------------------
		for (const [pb2ObjectName, pb2Objects] of Object.entries(xmlFile.root)) {
			// @TODO: Validation w/ zod? and more concrete type. (maybe overkill)
			const parsedPB2Objects = pb2Objects;

			// Using some form of function object map *may* be more elegant (need to factor in dealing with types).. but let's do this for now.
			switch (pb2ObjectName) {
				case 'box':
					this.walls.push(...this.parsePB2Walls(parsedPB2Objects));
					break;
				case 'bg':
					this.backgrounds.push(...this.parsePB2Background(parsedPB2Objects));
					break;
				case 'lamp':
					this.lamps.push(...this.parsePB2Lamp(parsedPB2Objects));
					break;
				case 'gun':
					this.guns.push(...this.parsePB2Gun(parsedPB2Objects));
					break;
				case 'water':
					this.waters.push(...this.parsePB2Water(parsedPB2Objects));
					break;
				case 'door':
					this.movables.push(...this.parsePB2Movable(parsedPB2Objects));
					break;
				case 'player':
				case 'enemy':
					this.characters.push(...this.parsePB2Character(parsedPB2Objects, pb2ObjectName === 'player'));
					break;
				case 'region':
					this.regions.push(...this.parsePB2Region(parsedPB2Objects));
					break;
				case 'pushf':
					this.pushers.push(...this.parsePB2Pusher(parsedPB2Objects));
					break;
				case 'vehicle':
				case 'barrel':
					this.pb3Entities.push(...this.parsePB3Entity(parsedPB2Objects));
					break;
				case 'decor':
					this.decorations.push(...this.parseDecorations(parsedPB2Objects));
					break;
				case 'trigger':
					this.triggerGroups.push(...this.parsePB2Triggers(parsedPB2Objects));
					break;
				case 'timer':
					this.timers.push(...this.parsePB2Timers(parsedPB2Objects));
					break;
				default:
			}
		}

		// --------------------------------------------------
		// 2. We process all parsed PB2 objects, creating the derived PB3 objects if required.
		// --------------------------------------------------

		// Create all required surface objects.. used by walls, backgrounds and movable.
		this.createSurfaces();

		// Create all required liquid kinds.. used by water.
		this.createLiquidKinds();

		// Create all assets related to characters and guns (skins, teams and AI presets).
		this.createSkinsTeamsAndAIPresets();

		// Resolve all index based references.
		this.resolveUIDIndexReference();

		// Create trigger groups that attempt to emulate PB2 pushers via sub push force execute method.
		this.createPusherTriggerGroups();

		// This collates all UIDs, and verifies if any UID references are invalid.
		this.finalizeUIDReferences();

		// This converts the map to be compatible with Prosu's PB2 MP module, by grouping dynamic objects into coop_restart.
		if (this.options.use_pb2_module === 'Yes') {
			this.convertToPB2MPModuleCompatible();
		}
	}

	// Serializes the current PB2 map intp PB3 source code.
	public serializeToPB3SourceCode = (): string => {
		let pb3SourceCode = '';

		// -------------------------------
		// 1. We declare all UID.. this is the `global vars declaration` section
		// -------------------------------
		const globalNames: string[] = [];

		if (this.options.movable_sounds === 'Yes') {
			globalNames.push(movableSoundPresetVarName);
		}

		globalNames.push(...this.allUIDs);

		if (globalNames.length > 0) {
			pb3SourceCode += `var ${globalNames.join(', ')};`;
		}

		// -------------------------------
		// 2. We append necessary headers (loading module, custom scripts, etc..)
		// -------------------------------
		this.triggerGroups.map((triggerGroup) => (pb3SourceCode += `${triggerGroup.uid}=()=>_pb2TU('${triggerGroup.uid}');`));
		pb3SourceCode += `//->Ditto->//{"operation":"define_global_vars"}\n`;

		pb3SourceCode += serializeSpacer();
		pb3SourceCode += serializeComment('Map initialization');

		pb3SourceCode += PB3StandardMapHeader;

		if (this.options.movable_sounds === 'Yes') {
			pb3SourceCode += movableSoundPreset;
		}

		// top-left corner
		const minX = this.worldBoundary.min.x;
		const minY = this.worldBoundary.min.y;

		pb3SourceCode += createMapConfigureScript(minX + EDITOR_ICON_WIDTH * this.scriptIndex++, minY + iconHeightGap.script).serialize();

		if (this.options.use_pb2_module === 'Yes') {
			pb3SourceCode += createPB2ModuleStartScript(minX + EDITOR_ICON_WIDTH * this.scriptIndex++, minY + iconHeightGap.script).serialize();
		}

		// -------------------------------
		// 3. We start serializing the individual game objects..
		// -------------------------------

		for (const variable of this.variables) {
			pb3SourceCode += variable.serialize();
		}

		pb3SourceCode += serializeSpacer();
		pb3SourceCode += serializeComment('Resources');

		// Order matters.. we first serialize "assets" like objects..
		for (const [_, surface] of Object.entries(this.wallSurfaces)) {
			pb3SourceCode += surface.serialize();
		}

		for (const [_, surface] of Object.entries(this.backgroundSurfaces)) {
			pb3SourceCode += surface.serialize();
		}

		for (const [_, surface] of Object.entries(this.movableSurfaces)) {
			pb3SourceCode += surface.serialize();
		}

		for (const [_, liquidKind] of Object.entries(this.liquidKinds)) {
			pb3SourceCode += liquidKind.serialize();
		}

		for (const [_, team] of Object.entries(this.teams)) {
			pb3SourceCode += team.serialize();
		}

		for (const [_, skin] of Object.entries(this.skins)) {
			pb3SourceCode += skin.serialize();
		}

		for (const [_, aiPreset] of Object.entries(this.aiPresets)) {
			pb3SourceCode += aiPreset.serialize();
		}

		pb3SourceCode += serializeSpacer();
		pb3SourceCode += serializeComment('Static object instances');

		for (const point of this.points) {
			pb3SourceCode += point.serialize();
		}

		// We then serialize object instances..
		for (const wall of this.walls) {
			pb3SourceCode += wall.serialize();
		}

		for (const background of this.backgrounds) {
			pb3SourceCode += background.serialize();
		}

		for (const water of this.waters) {
			pb3SourceCode += water.serialize();
		}

		for (const lamp of this.lamps) {
			pb3SourceCode += lamp.serialize();
		}

		for (const decoration of this.decorations) {
			pb3SourceCode += decoration.serialize();
		}

		pb3SourceCode += serializeSpacer();
		pb3SourceCode += serializeComment('Dynamic object instances');

		for (const char of this.characters) {
			pb3SourceCode += char.serialize();
		}

		for (const movable of this.movables) {
			pb3SourceCode += movable.serialize();
		}

		for (const region of this.regions) {
			pb3SourceCode += region.serialize();
		}

		for (const useButton of this.useButtons) {
			pb3SourceCode += useButton.serialize();
		}

		for (const gun of this.guns) {
			pb3SourceCode += gun.serialize();
		}

		for (const pb3Entity of this.pb3Entities) {
			pb3SourceCode += pb3Entity.serialize();
		}

		for (const timer of this.timers) {
			pb3SourceCode += timer.serialize();
		}

		for (const triggerGroup of this.triggerGroups) {
			pb3SourceCode += triggerGroup.serialize();
		}

		// -------------------------------
		// 4. We append necessary footers (custom scripts, finalizeWorld, etc..)
		// -------------------------------

		pb3SourceCode += serializeSpacer();
		pb3SourceCode += serializeComment('Post map scripts');

		if (this.hasGrenades) {
			pb3SourceCode += createSpawnGrenadesScript(minX + EDITOR_ICON_WIDTH * this.scriptIndex++, minY + iconHeightGap.script).serialize();
		}

		if (this.options.use_pb2_module === 'No') {
			pb3SourceCode += this.createMovableSpeedScript(minX + EDITOR_ICON_WIDTH * this.scriptIndex++, minY + iconHeightGap.script).serialize();
			pb3SourceCode += createForceRegenScript(minX + EDITOR_ICON_WIDTH * this.scriptIndex++, minY + iconHeightGap.script).serialize();
		} else {
			// if yes, these scripts are already in coop_restart trigger and coop_post_restart trigger and are serialized.
			pb3SourceCode += createPB2ModuleEndScript(minX + EDITOR_ICON_WIDTH * this.scriptIndex++, minY + iconHeightGap.script).serialize();
		}

		pb3SourceCode += PB3StandardFooter;
		return pb3SourceCode;
	};

	private createSurfaces = () => {
		// We don't reuse existing surfaces if possible (hence the naming convention getOrCreate)
		for (const wall of this.walls) {
			wall.surfaceUID = this.getOrCreateWallSurface(wall.materialIndex).uid;
		}

		for (const background of this.backgrounds) {
			background.surfaceUID = this.getOrCreateBackgroundSurface(background.backgroundMaterialIndex, background.colorMultiplier).uid;
		}

		for (const movable of this.movables) {
			movable.surfaceUID = this.getOrCreateMovableSurface(movable.visible).uid;
		}
	};

	private createLiquidKinds = () => {
		for (const water of this.waters) {
			water.liquidKindUID = this.getOrCreateLiquidKind(water.damage, water.actAsWater).uid;
		}
	};

	private createSkinsTeamsAndAIPresets = () => {
		for (const gun of this.guns) {
			if (gun.team === -1) {
				gun.teamUID = null;
			} else {
				gun.teamUID = this.getOrCreateTeam(gun.team).uid;
			}
		}

		for (let i = this.characters.length - 1; i >= 0; i--) {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- Index is calculated from length, it couldn't be undefined.
			const character = this.characters[i]!;

			if (character.pb2SkinId === -1 && this.options.use_pb2_module === 'Yes') {
				// use MP's DM skin variable name..
				character.skinUID = DM_SKIN_IDENTIFIER;
			} else {
				// get / create a new PB3 skin..
				const skin = this.getOrCreateSkin(character.pb2SkinId);

				// null, this means that this character should be removed. eg: drone controllers.
				if (!skin) {
					this.characters.splice(i, 1);
					continue;
				}

				character.skinUID = skin.uid;
			}

			character.teamUID = this.getOrCreateTeam(character.pb2TeamId).uid;

			if (!character.isAIInactive) {
				character.aiPresetUID = this.getOrCreateAIPreset().uid;
			}
		}
	};

	private getOrCreateWallSurface = (materialIndex: number): SurfaceEntity => {
		let entity = this.wallSurfaces[materialIndex];
		const count = Object.keys(this.wallSurfaces).length;

		if (entity === undefined) {
			entity = createPB2WallSurface(materialIndex, this.getAppropriatePosition('surfaceWall', count), this.getUniqueUID('wallSurface'), this.options);
			this.wallSurfaces[materialIndex] = entity;
		}

		return entity;
	};

	private getOrCreateBackgroundSurface = (materialIndex: number, colorMultiplier: Color): SurfaceEntity => {
		// We use a combination of material id and color multiplier as a unique key to an associated surface.
		const key = getBackgroundKey({ materialId: materialIndex, colorMultiplier });
		const count = Object.keys(this.backgroundSurfaces).length;

		let entity = this.backgroundSurfaces[key];
		if (entity === undefined) {
			entity = createPB2BackgroundSurface(
				materialIndex,
				colorMultiplier,
				this.getAppropriatePosition('surfaceBg', count),
				this.getUniqueUID('backgroundSurface'),
				this.options,
			);
			this.backgroundSurfaces[key] = entity;
		}
		return entity;
	};

	private getOrCreateLiquidKind = (damage: number, actAsWater: boolean): LiquidKindEntity => {
		// We use a combination of damage and actAsWater as a unique key to an associated liquid.
		const key = getLiquidKindKey({ damage, actAsWater });
		let entity = this.liquidKinds[key];

		if (entity === undefined) {
			const options = this.options; // closure :)
			const count = Object.keys(this.liquidKinds).length;

			entity = {
				position: this.getAppropriatePosition('liquidKind', count),
				uid: this.getUniqueUID('liquidKind'),
				damage,
				actAsWater,
				serialize() {
					return serializeLiquidKind(this, options);
				},
			};

			this.liquidKinds[key] = entity;
		}

		return entity;
	};

	private getOrCreateMovableSurface = (visible: boolean): SurfaceEntity => {
		const key = visible.toString() as BooleanAsString;
		let entity = this.movableSurfaces[key];
		if (entity === undefined) {
			entity = createPB2MovableSurface_isVisible(visible, this.worldBoundary, this.options);
			this.movableSurfaces[key] = entity;
		}
		return entity;
	};

	private getOrCreateTeam = (teamNumber: number): TeamEntity => {
		let entity = this.teams[teamNumber];

		if (entity === undefined) {
			const count = Object.keys(this.teams).length;
			entity = {
				position: this.getAppropriatePosition('team', count),
				uid: this.getUniqueUID('team'),
				name: teamNames[teamNumber] ?? `Team ${teamNumber}`,
				serialize() {
					return serializeTeam(this);
				},
			};
			this.teams[teamNumber] = entity;
		}

		return entity;
	};

	private getOrCreateSkin = (characterSkinIndex: number): SkinEntity | null => {
		let pb3Model = PB2SkinToPB3[characterSkinIndex];

		// this character should be removed. (eg. drone controllers)
		if (pb3Model === null) {
			return null;
		}

		// this character's model is no equivalent, falling back to marine skin..
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- Indexing a hardcoded map, 1 is guaranteed to exist.
		pb3Model ??= PB2SkinToPB3[1]!;

		let entity = this.skins[pb3Model];
		if (entity === undefined) {
			const count = Object.keys(this.skins).length;
			entity = {
				position: this.getAppropriatePosition('skin', count),
				uid: this.getUniqueUID('skin'),
				pb2Model: characterSkinIndex,
				pb3Model,
				serialize() {
					return serializeSkin(this);
				},
			};
			this.skins[pb3Model] = entity;
		}
		return entity;
	};

	// AI preset is a special case, we really only need one as of now.
	// However, we architecture in such a way that it is extendable.
	private getOrCreateAIPreset = (): AIPresetEntity => {
		const key = 0;
		let entity = this.aiPresets[key];

		if (entity === undefined) {
			const count = Object.keys(this.aiPresets).length;
			entity = {
				position: this.getAppropriatePosition('aiPreset', count),
				uid: this.getUniqueUID('aiPreset'),
				serialize() {
					return serializeAIPreset(this);
				},
			};
			this.aiPresets[key] = entity;
		}
		return entity;
	};

	private parsePB2Timers = (pb2Objects: ParsedPB2XMLObject[]): TimerEntity[] => {
		const timers: TimerEntity[] = [];

		for (const pb2Object of pb2Objects) {
			const position: Position = {
				x: Number(pb2Object.$.x ?? 0),
				y: Number(pb2Object.$.y ?? 0),
			};

			timers.push({
				uid: reformatPB2UID(pb2Object.$.uid),
				position: position,
				enabled: (pb2Object.$.enabled ?? 'true') === 'true',
				maxCalls: parsePB2MaxCalls(pb2Object.$.maxcalls),
				triggerToExecuteUID: parsePB2UIDReference(pb2Object.$.target, 'trigger'),
				delay: Number(pb2Object.$.delay ?? 30),
				serialize() {
					return serializeTimer(this);
				},
			});
		}

		return timers;
	};

	private parsePB2Triggers = (pb2Objects: ParsedPB2XMLObject[]): TriggerGroupEntity[] => {
		const triggers: TriggerGroupEntity[] = [];

		for (const pb2Object of pb2Objects) {
			const executeMethods: ExecuteMethod[] = [];
			const position: Position = {
				x: Number(pb2Object.$.x ?? 0),
				y: Number(pb2Object.$.y ?? 0),
			};

			const enabled = (pb2Object.$.enabled ?? 'true') === 'true';

			// We iterate through all properties of the trigger, getting all trigger actions.
			// I assume that the PB2 xml always order trigger actions in ascending order.
			for (const property in pb2Object.$) {
				// Attempt to retrieve the set of trigger action information from property..
				const result = /actions_(\d+)_type/.exec(property);

				if (!result) {
					continue;
				}

				const actionType = pb2Object.$[result[0]];
				const argumentA = pb2Object.$[`actions_${result[1]}_targetA`];
				const argumentB = pb2Object.$[`actions_${result[1]}_targetB`];

				if (actionType === undefined || argumentA === undefined || argumentB === undefined) {
					continue;
				}

				const executeMethodProperties = getAssociatedExecuteMethodProperties(actionType, argumentA, argumentB);

				// Not a supported trigger action
				if (executeMethodProperties === null) {
					continue;
				}

				executeMethods.push({
					uid: '',
					position: {
						x: position.x + EDITOR_ICON_WIDTH * (executeMethods.length + 1),
						y: position.y,
					},
					...executeMethodProperties,
					serialize() {
						return serializeExecuteMethod(this);
					},
				});
			}

			triggers.push({
				uid: reformatPB2UID(pb2Object.$.uid),
				position: position,
				children: executeMethods,
				arguments: [],
				maxCalls: parsePB2MaxCalls(pb2Object.$.maxcalls),
				enabled: enabled,
				autoExecute: false,
				serialize() {
					return serializeTriggerGroup(this);
				},
			});
		}

		return triggers;
	};

	private createMovableSpeedScript = (x: number, y: number): Script => {
		let code = `
/* 
	PB2 Script | Set all movable's initial speed 

    This script sets the initial speed of all movables.
*/
`;
		for (const movable of this.movables) {
			code += `${movable.uid}.SetSpeed(${movable.speed});\n`;
		}

		return {
			uid: '',
			position: {
				x: x,
				y: y,
			},
			code: code,
			serialize() {
				return serializeScript(this);
			},
		};
	};

	private convertToPB2MPModuleCompatible = () => {
		// 1. Create DM Skin variable.
		this.variables.push({
			uid: DM_SKIN_IDENTIFIER,
			value: `'${DM_SKIN_VALUE}'`,
			comment: serializeComment(`Set player's skin to this variable if you want them to use their own skins in COOP.`),
			serialize() {
				return serializeVariable(this);
			},
		});

		// 2. Move all dynamic objects into trigger action `coop_restart` that auto-execute
		const coop_restart_position = {
			x: this.worldBoundary.min.x + EDITOR_ICON_WIDTH * this.scriptIndex++,
			y: this.worldBoundary.min.y + iconHeightGap.script,
		};

		const coop_restart_children: EditorObject[] = [
			...this.movables,
			...this.backgrounds.filter((background) => background.attachedMovableUID),
			...this.regions,
			...this.useButtons,
			...this.guns,
			...this.timers,
			...this.triggerGroups,
			...this.characters.filter((character) => !character.isPlayer),
			...this.pb3Entities,
			this.createMovableSpeedScript(this.worldBoundary.min.x + EDITOR_ICON_WIDTH * this.scriptIndex++, this.worldBoundary.min.y + iconHeightGap.script),
		];

		// We have moved them.
		this.movables = [];
		this.backgrounds = this.backgrounds.filter((background) => !background.attachedMovableUID);
		this.regions = [];
		this.useButtons = [];
		this.guns = [];
		this.timers = [];
		this.triggerGroups = [];
		this.characters = this.characters.filter((character) => character.isPlayer);
		this.pb3Entities = [];

		this.triggerGroups.push({
			uid: 'globalThis.coop_restart',
			position: coop_restart_position,
			children: coop_restart_children,
			arguments: [],
			enabled: true,
			maxCalls: Infinity,
			autoExecute: true,
			serialize() {
				return serializeTriggerGroup(this);
			},
		});

		// 3. Create trigger action `coop_post_restart` that auto-execute, containing our force regen script.
		this.triggerGroups.push({
			uid: 'globalThis.coop_post_restart',
			position: {
				x: this.worldBoundary.min.x + EDITOR_ICON_WIDTH * this.scriptIndex++,
				y: this.worldBoundary.min.y + iconHeightGap.script,
			},
			children: [
				// prettier-ignore
				createForceRegenScript(
					this.worldBoundary.min.x + EDITOR_ICON_WIDTH * this.scriptIndex++,
					this.worldBoundary.min.y + iconHeightGap.script,
				),
			],
			arguments: [],
			enabled: true,
			maxCalls: Infinity,
			autoExecute: true,
			serialize() {
				return serializeTriggerGroup(this);
			},
		});

		// 4. these are new, include them in all uids.
		this.allUIDs.add('globalThis.coop_restart');
		this.allUIDs.add('globalThis.coop_post_restart');
	};

	private finalizeUIDReferences = () => {
		// ==========================================
		// 1. Collate all UIDs into one set
		// ==========================================
		let sources: EditorObject[] = [
			...Object.values(this.wallSurfaces),
			...Object.values(this.backgroundSurfaces),
			...Object.values(this.movableSurfaces),
			...Object.values(this.liquidKinds),
			...Object.values(this.teams),
			...Object.values(this.skins),
			...Object.values(this.aiPresets),
			...Object.values(this.lamps),
			...Object.values(this.guns),
			...Object.values(this.waters),
			...Object.values(this.movables),
			...Object.values(this.characters),
			...Object.values(this.regions),
			...Object.values(this.pb3Entities),
			...Object.values(this.decorations),
			...Object.values(this.timers),
			...Object.values(this.variables),
			...this.points,
		];

		for (const triggerGroup of this.triggerGroups) {
			sources.push(triggerGroup);

			for (const editorObject of triggerGroup.children) {
				if (editorObject.uid !== '') sources.push(editorObject);
			}
		}

		// remove all empty UIDs. (empty string are falsy)
		sources = sources.filter(Boolean);

		// add it to a set
		for (const item of sources) {
			this.allUIDs.add(item.uid);
		}

		// ==========================================
		// 2. Check for any invalid UID reference
		// ==========================================
		const nullIfInvalidUID = (uid: string) => {
			if (this.allUIDs.has(uid)) {
				return uid;
			} else {
				return null;
			}
		};

		for (const timer of this.timers) {
			timer.triggerToExecuteUID = timer.triggerToExecuteUID ? nullIfInvalidUID(timer.triggerToExecuteUID) : null;
		}

		for (const character of this.characters) {
			character.triggerToExecuteOnDeathUID = character.triggerToExecuteOnDeathUID ? nullIfInvalidUID(character.triggerToExecuteOnDeathUID) : null;
		}

		for (const region of this.regions) {
			region.triggerToExecuteUID = region.triggerToExecuteUID ? nullIfInvalidUID(region.triggerToExecuteUID) : null;
		}

		for (const useButton of this.useButtons) {
			useButton.triggerToExecuteUID = useButton.triggerToExecuteUID ? nullIfInvalidUID(useButton.triggerToExecuteUID) : null;
		}
	};

	private resolveUIDIndexReference = () => {
		const resolveUID = (argument: string) => {
			// We need to parse our sentinel references which indicates that they are index references..
			const typePattern = ALLOWED_TRIGGER_REFERENCES.join('|');
			const sentinelRegex = new RegExp(`^@(?<type>${typePattern})_(?<reference>\\d+)$`);

			const match = argument.match(sentinelRegex);

			if (!match?.groups) {
				return argument;
			}

			// Safe type assertion because the dynamic regex matches the array items exactly
			const type = match.groups.type as TriggerReferenceType;

			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- Regex group match pattern guarantees non null-ness.
			const reference = match.groups.reference!;
			const index = Number(reference);

			switch (type) {
				// Most common cases..
				case 'movable':
					return this.movables[index]?.uid ?? '0';
				case 'region':
					return this.regions[index]?.uid ?? '0';
				case 'player':
					return this.characters[index]?.uid ?? '0';
				case 'gun':
					return this.guns[index]?.uid ?? '0';
				case 'trigger':
					return this.triggerGroups[index]?.uid ?? '0';
				case 'timer':
					return this.timers[index]?.uid ?? '0';
			}
		};

		for (const timer of this.timers) {
			timer.triggerToExecuteUID = timer.triggerToExecuteUID ? resolveUID(timer.triggerToExecuteUID) : null;
		}

		for (const character of this.characters) {
			character.triggerToExecuteOnDeathUID = character.triggerToExecuteOnDeathUID ? resolveUID(character.triggerToExecuteOnDeathUID) : null;
		}

		for (const region of this.regions) {
			region.triggerToExecuteUID = region.triggerToExecuteUID ? resolveUID(region.triggerToExecuteUID) : null;
		}

		for (const useButton of this.useButtons) {
			useButton.triggerToExecuteUID = useButton.triggerToExecuteUID ? resolveUID(useButton.triggerToExecuteUID) : null;
		}

		for (const trigger of this.triggerGroups) {
			for (const child of trigger.children) {
				if (!isExecuteMethod(child)) {
					continue;
				}

				child.arguments = child.arguments.map((argument) => resolveUID(argument));
			}
		}
	};

	// Parses a given PB2 xml object into PB2 wall.
	// When parsing PB2 walls, also keep track of world boundary and materials.
	private parsePB2Walls = (pb2Objects: ParsedPB2XMLObject[]): WallEntity[] => {
		const walls: WallEntity[] = [];

		for (const pb2Object of pb2Objects) {
			const geometry = parseGeometry(pb2Object);
			const materialIndex = Number(pb2Object.$.m ?? 0);

			walls.push({
				uid: '',
				geometry: geometry,
				materialIndex: materialIndex,
				surfaceUID: 'null',
				serialize() {
					return serializeBox({ kind: 'wall', entity: this });
				},
			});

			updateWorldBoundary(this.worldBoundary, geometry);
		}

		return walls;
	};

	// Parses a given PB2 xml object into PB2 background.
	// When parsing PB2 background, also keep track of world boundary and required surface (material and color multiplier).
	private parsePB2Background = (pb2Objects: ParsedPB2XMLObject[]): BackgroundEntity[] => {
		const backgrounds: BackgroundEntity[] = [];

		for (const pb2Object of pb2Objects) {
			const geometry = parseGeometry(pb2Object);
			const materialIndex = Number(pb2Object.$.m ?? 0);

			// PB2 had a -1 shadow material type for their shadow map.
			// We don't support this background in PB3.
			if (materialIndex === pb2ShadowBackgroundMaterial) {
				continue;
			}

			let colorMultiplier: Color = whiteColor;

			// We attempt to parse PB2's color multiplier.
			if (isValidHexCode(pb2Object.$.c)) {
				// We actually need to double the parsed color multiplier. This is because in PB2, the color multiplier
				// actually ranges in the interval of [0, 2].
				// This means that in PB2, #FFFFFF actually multiplies the respective color component by a factor of 2,
				// resulting in a brighter look.

				// This is also where a limitation of the conversion happens. Because PB3 doesnt support >1 color multiplier factor,
				// we can never imitate color multipliers greater than #808080 in PB2.
				const parsedColorMultiplier = hexToColor(pb2Object.$.c);
				colorMultiplier = doubleColor(parsedColorMultiplier);
			}

			backgrounds.push({
				uid: '',
				geometry: geometry,
				backgroundMaterialIndex: materialIndex,
				textureXOffset: Number(pb2Object.$.u ?? 0),
				textureYOffset: Number(pb2Object.$.v ?? 0),
				drawInFront: Boolean(pb2Object.$.f ?? false),
				surfaceUID: 'null',
				attachedMovableUID: parsePB2UIDReference(pb2Object.$.a, 'movable'),
				colorMultiplier: colorMultiplier,
				serialize() {
					return serializeBox({ kind: 'background', entity: this });
				},
			});

			updateWorldBoundary(this.worldBoundary, geometry);
		}

		return backgrounds;
	};

	private parsePB2Lamp = (pb2Objects: ParsedPB2XMLObject[]): LampEntity[] => {
		const lamps: LampEntity[] = pb2Objects.map(({ $: props }) => ({
			uid: reformatPB2UID(props.uid),
			position: {
				x: Number(props.x ?? 0),
				y: Number(props.y ?? 0),
			},
			power: Number(props.power ?? 0),
			hasFlare: ['true', '1'].includes(props.flare ?? 'false'),
			serialize() {
				return serializeLamp(this);
			},
		}));
		lamps.forEach(({ position }) => updateWorldBoundary(this.worldBoundary, position));
		return lamps;
	};

	private parsePB2Gun = (pb2Objects: ParsedPB2XMLObject[]): GunEntity[] => {
		const guns: GunEntity[] = [];
		const grenadeModels = Object.keys(PB2GunModelToPB3Gadget);
		let grenadeCount = 0;

		for (const { $: props } of pb2Objects) {
			const teamNumber = Number(props.command ?? -1);
			const pb2Model = props.model ?? ''; // default = omit
			const isGrenade = grenadeModels.includes(pb2Model);

			const position = {
				x: Number(props.x ?? 0),
				y: Number(props.y ?? 0),
			};

			if (isGrenade) {
				this.points.push({
					uid: getGrenadeSpawnPointUID(grenadeCount++, PB2GunModelToPB3Gadget[pb2Model] ?? 'null'),
					position,
					serialize() {
						return serializePoint(this);
					},
				});
				this.hasGrenades = true;
				continue;
			}

			let pb3Model = PB2GunModelToPB3[pb2Model] ?? null;
			pb3Model ??= 'gun_rifle'; // default fallback weapon.

			guns.push({
				uid: reformatPB2UID(props.uid),
				position,
				pb2Model,
				pb3Model,
				team: teamNumber,
				upgrade: Number(props.upg ?? 0),
				teamUID: null,
				serialize() {
					return serializeGun(this);
				},
			} satisfies GunEntity);
		}

		guns.forEach(({ position }) => updateWorldBoundary(this.worldBoundary, position));
		return guns;
	};

	private parsePB2Water = (pb2Objects: ParsedPB2XMLObject[]): WaterEntity[] => {
		const waters: WaterEntity[] = [];

		for (const pb2Object of pb2Objects) {
			const geometry = parseGeometry(pb2Object);
			const damage = Number(pb2Object.$.damage ?? 0);
			const actAsWater = pb2Object.$.friction === undefined ? true : pb2Object.$.friction === 'true';

			waters.push({
				uid: reformatPB2UID(pb2Object.$.uid),
				geometry: geometry,
				damage: damage,
				actAsWater: actAsWater,
				liquidKindUID: 'null',
				serialize() {
					return serializeBox({ kind: 'water', entity: this });
				},
			});

			updateWorldBoundary(this.worldBoundary, geometry);
		}

		return waters;
	};

	private parsePB2Movable = (pb2Objects: ParsedPB2XMLObject[]): MovableEntity[] => {
		const movables: MovableEntity[] = [];

		for (const pb2Object of pb2Objects) {
			const geometry = parseGeometry(pb2Object);
			const visible = pb2Object.$.vis === undefined ? true : pb2Object.$.vis === 'true';
			const speed = Number(pb2Object.$.maxspeed ?? 10);

			movables.push({
				uid: reformatPB2UID(pb2Object.$.uid),
				geometry: geometry,
				visible: visible,
				speed: speed,
				surfaceUID: 'null',
				attachedMovableUID: parsePB2UIDReference(pb2Object.$.attach, 'movable'),
				serialize() {
					return serializeBox({ kind: 'movable', entity: this });
				},
			});

			updateWorldBoundary(this.worldBoundary, geometry);
		}

		return movables;
	};

	private parsePB2Region = (pb2Objects: ParsedPB2XMLObject[]): RegionEntity[] => {
		const regions: RegionEntity[] = [];

		for (const pb2Object of pb2Objects) {
			const geometry = parseGeometry(pb2Object);
			let activationClause = Number(pb2Object.$.use_on ?? 0);
			let triggerToExecuteUID = parsePB2UIDReference(pb2Object.$.use_target, 'trigger');
			const attachedMovableUID = parsePB2UIDReference(pb2Object.$.attach, 'movable');

			// If a PB2 region has a use button, we will create a USE button PB3 entity, inheriting the properties from the original region/
			// The other region will be preserved as it may be used by other triggers. @todo: make it configurable..
			if (isRegionAUSEButton(activationClause)) {
				this.useButtons.push({
					uid: '',
					position: getCenterPosition(geometry),
					triggerToExecuteUID: triggerToExecuteUID,
					attachedMovableUID: attachedMovableUID,
					serialize() {
						return serializeUseButton(this);
					},
				});

				// We strip away the trigger properties from the original region..
				activationClause = NO_ACTIVATION_METHOD;
				triggerToExecuteUID = null;
			}

			regions.push({
				uid: reformatPB2UID(pb2Object.$.uid),
				geometry: geometry,
				activationClause: activationClause,
				triggerToExecuteUID: triggerToExecuteUID,
				attachedMovableUID: attachedMovableUID,
				serialize() {
					return serializeBox({ kind: 'region', entity: this });
				},
			});

			updateWorldBoundary(this.worldBoundary, geometry);
		}

		return regions;
	};

	private parseDecorations = (pb2Objects: ParsedPB2XMLObject[]): DecorationEntity[] => {
		const decorations: DecorationEntity[] = [];

		for (const pb2Object of pb2Objects) {
			const model = pb2Object.$.model ?? 'null';

			// parse antigravity as entity instead..
			if (model === 'antigravity' && this.options.antigravity === 'Entity') {
				this.pb3Entities.push(...this.parsePB3Entity([pb2Object]));
				continue;
			}

			const properties = PB2DecorToPB3Decor[model];

			// Either custom decoration or some unsupported decorations..
			if (properties === undefined) {
				continue;
			}

			const decoration: DecorationEntity = {
				uid: reformatPB2UID(pb2Object.$.uid),
				position: { x: Number(pb2Object.$.x ?? 0), y: Number(pb2Object.$.y ?? 0) },
				attachedMovableUID: reformatPB2UID(pb2Object.$.attach),
				scaleY: Number(pb2Object.$.sy ?? 1),
				...properties,
				serialize() {
					return serializeDecoration(this);
				},
			};

			// We append user supplied initial rotation and scale..
			decoration.rotationZ += Number(pb2Object.$.r ?? 0);
			decoration.scaleX *= Number(pb2Object.$.sx ?? 1);

			decorations.push(decoration);

			updateWorldBoundary(this.worldBoundary, decoration.position);
		}

		return decorations;
	};

	private parsePB3Entity = (pb2Objects: ParsedPB2XMLObject[]): PB3Entity[] => {
		const vehicles: PB3Entity[] = [];

		for (const pb2Object of pb2Objects) {
			const model = pb2Object.$.model;

			const entityProperties = getPB3EntityDetails(model);

			if (entityProperties === undefined) {
				continue;
			}

			// PB2 store health in percentages.
			const healthScale = Number(pb2Object.$.hpp ?? 100) / 100;

			vehicles.push({
				uid: reformatPB2UID(pb2Object.$.uid),
				position: { x: Number(pb2Object.$.x ?? 0), y: Number(pb2Object.$.y ?? 0) },
				direction: Number(pb2Object.$.side) === -1 ? -1 : 1,
				healthScale,
				...entityProperties,
				serialize() {
					return serializePB3Entity(this);
				},
			});
		}

		return vehicles;
	};

	private parsePB2Pusher = (pb2Objects: ParsedPB2XMLObject[]): PusherEntity[] => {
		const pushers: PusherEntity[] = [];

		for (const pb2Object of pb2Objects) {
			const geometry = parseGeometry(pb2Object);
			const pushX = Number(pb2Object.$.tox ?? 0);
			const pushY = Number(pb2Object.$.toy ?? 0);
			const stabilityDamage = Number(pb2Object.$.stab ?? 0);
			const damage = Number(pb2Object.$.damage ?? 0);

			pushers.push({
				uid: reformatPB2UID(pb2Object.$.uid),
				geometry: geometry,
				dx: pushX,
				dy: pushY,
				stabliityDamage: stabilityDamage,
				damage: damage,
				attachedMovableUID: parsePB2UIDReference(pb2Object.$.attach, 'movable'),
			});

			updateWorldBoundary(this.worldBoundary, geometry);
		}

		return pushers;
	};

	private createPusherTriggerGroups = () => {
		const PUSHER_STRENGTH_MULTIPLIER = 35; // Pushers in PB2 are much stronger compared to PB3.
		const PUSHER_DAMAGE_MULTIPLIER = 0.12; // Pushers in PB2 are much weaker compared to PB3.

		// A pusher in PB3 can be simulated with the region sub-step push function.
		// We require 3 game objects
		// 1. Trigger group (to call the Execute method)
		// 2. Execute methods (1 - responsible for calling the region sub-step push function, 2 - responsible for calling region damage function)
		// 3. Vector (argument used to indicate pushing direction)
		for (const pusher of this.pushers) {
			const centerPosition = getCenterPosition(pusher.geometry);

			const triggerGroup: TriggerGroupEntity = {
				position: { x: centerPosition.x - EDITOR_ICON_WIDTH, y: centerPosition.y },
				uid: this.getUniqueUID('group_tool'),
				children: [],
				arguments: ['rigid_body', '_', 'GSPEED'],
				maxCalls: Infinity,
				enabled: true,
				autoExecute: false,
				serialize() {
					return serializeTriggerGroup(this);
				},
			};

			// Create vector and push execute method to emulate pushing effect..
			if (pusher.dx !== 0 || pusher.dy !== 0) {
				const vector: Vector = {
					position: { x: centerPosition.x + EDITOR_ICON_WIDTH, y: centerPosition.y },
					uid: this.getUniqueUID('vector'),
					dx: pusher.dx * PUSHER_STRENGTH_MULTIPLIER,
					dy: pusher.dy * PUSHER_STRENGTH_MULTIPLIER,
					serialize() {
						return serializeVector(this);
					},
				};

				const pushExecuteMethod: ExecuteMethod = {
					position: { x: centerPosition.x, y: centerPosition.y },
					uid: this.getUniqueUID('execute_method'),
					functionName: 'ApplyPushForceLogicToBody',
					arguments: ['rigid_body', vector.uid],
					serialize() {
						return serializeExecuteMethod(this);
					},
				};

				triggerGroup.children.push(vector, pushExecuteMethod);
			}

			// Create damage execute method to emulate damaging effect..
			if (pusher.damage !== 0) {
				const damage = Math.abs(pusher.damage) * PUSHER_DAMAGE_MULTIPLIER;

				const damageExecuteMethod: ExecuteMethod = {
					position: { x: centerPosition.x, y: centerPosition.y + EDITOR_ICON_HEIGHT },
					uid: this.getUniqueUID('execute_method'),
					functionName: 'ApplyRegionDamage_PB2Preset',
					arguments: ['rigid_body', `${damage}`, 'GSPEED'],
					serialize() {
						return serializeExecuteMethod(this);
					},
				};

				triggerGroup.children.push(damageExecuteMethod);
			}

			// This is a useless pusher, no point creating..
			if (triggerGroup.children.length == 0) {
				continue;
			}

			this.triggerGroups.push(triggerGroup);

			// We then create a region that executes this trigger group when entered..
			this.regions.push({
				uid: pusher.uid,
				geometry: pusher.geometry,
				activationClause: PUSHER,
				triggerToExecuteUID: triggerGroup.uid,
				attachedMovableUID: pusher.attachedMovableUID,
				serialize() {
					return serializeBox({ kind: 'region', entity: this });
				},
			});
		}
	};

	private parsePB2Character = (pb2Objects: ParsedPB2XMLObject[], isPlayer: boolean): CharacterEntity[] => {
		const entities: CharacterEntity[] = pb2Objects.map(({ $: props }) => {
			const noBehaviour = Number(props.botaction ?? 0) === 4;
			return {
				uid: reformatPB2UID(props.uid),
				position: {
					x: Number(props.x ?? 0),
					y: Number(props.y ?? 0),
				},
				velX: Number(props.tox ?? 0),
				velY: Number(props.toy ?? 0),
				hp: Number(props.hea ?? 130),
				hpMax: Number(props.hmax ?? 130),
				direction: Number(props.side) === -1 ? -1 : 1,
				isPlayer: isPlayer,
				vision: isPlayer ? 'pb2Vision.VISION_EVERYTHING' : 'pb2Vision.VISION_DIRECTED_TRACE',
				pb2SkinId: Number(props.char ?? 1),
				pb2TeamId: Number(props.team ?? -1),
				isAIInactive: noBehaviour,
				teamUID: 'null',
				skinUID: 'null',
				aiPresetUID: null,
				triggerToExecuteOnDeathUID: parsePB2UIDReference(props.ondeath, 'trigger'),
				serialize() {
					return serializeCharacter(this);
				},
			} satisfies CharacterEntity;
		});
		entities.forEach(({ position }) => updateWorldBoundary(this.worldBoundary, position));
		return entities;
	};

	private getUniqueUID = (name: string): string => {
		let count = this.usedUIDs[name];

		if (count === undefined) {
			this.usedUIDs[name] = 0;
			return name;
		}

		this.usedUIDs[name] = ++count;
		return `${name}_${count}`;
	};

	private getAppropriatePosition = (name: keyof typeof iconHeightGap, count: number): Position => {
		return {
			x: this.worldBoundary.min.x + count * EDITOR_ICON_WIDTH,
			y: this.worldBoundary.min.y + iconHeightGap[name],
		};
	};
}
