/* 
    This file contains a typed representation of a parsed PB2 map.

    This is useful in a way to process and handle constraints like asset requirements,
    triggers, etc..
*/
import type { BooleanAsString, ParsedPB2XMLObject, WorldBoundary, XLMParseOutput } from '#utils/types.js';
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
} from '#pb2Objects/entity-types.js';
import { getBackgroundKey, SurfaceType, type BackgroundIdentifierStr } from '#pb2Objects/surface.js';
import { getLiquidKindKey, type LiquidIdentifierStr } from '#pb2Objects/liquid.js';

import { getCenterPosition, parseGeometry, updateWorldBoundary } from '#utils/math.js';
import { PB3StandardFooter, PB3StandardMapHeader, serializeForceRegenScript, serializeMapConfigureScript } from '#serialize/serialize.js';
import { serializeBox } from '#serialize/box.js';
import { serializeSurface } from '#serialize/surface.js';
import { serializeLamp } from '#serialize/lamp.js';
import { serializeGun } from '#serialize/gun.js';
import { doubleColor, hexToColor, isValidHexCode, whiteColor, type Color } from '#utils/color.js';
import { serializeLiquidKind } from '#serialize/liquid.js';
import {
	createPB2BackgroundSurface,
	createPB2MovableSurface_isVisible,
	createPB2WallSurface,
	pb2ShadowBackgroundMaterial,
} from '#pb2Objects/surface-map.js';
import { serializeTeam } from '#serialize/team.js';
import { serializeSkin } from '#serialize/skin.js';
import { serializeAIPreset } from '#serialize/ai-preset.js';
import { serializeCharacter } from '#serialize/character.js';
import {
	isRegionAUSEButton,
	NO_ACTIVATION_METHOD,
	PB2GunModelToPB3,
	PB2GunModelToPB3Gadget,
	PB2SkinToPB3,
	teamNames,
} from '#pb2Objects/special-values.js';
import { serializePoint } from '#serialize/point.js';
import { getGrenadeSpawnPointUID, serializeSpawnGrenadesScript } from '#serialize/grenade.js';
import { serializeUseButton } from '#serialize/useButton.js';

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

	// Derived PB3 Objects.. (assets, execute method, comments, etc..)
	private wallSurfaces: Record<number, SurfaceEntity> = {}; // maps every unique PB2 wall material (an id) with a created wall surface.
	private backgroundSurfaces: Record<BackgroundIdentifierStr, SurfaceEntity> = {}; // maps every unique PB2 background material + color mult with a created background surface.
	private liquidKinds: Record<LiquidIdentifierStr, LiquidKindEntity> = {}; // maps every unique PB2 water property with a created liquid kind.
	private movableSurfaces: Partial<Record<BooleanAsString, SurfaceEntity>> = {}; // maps every unique PB2 door "look" with a movable surface.

	private useButtons: UseButtonEntity[] = [];

	private teams: Record<number, TeamEntity> = {}; // maps every unique PB2 team number property with a created team.
	private skins: Record<number, SkinEntity> = {};
	private aiPresets: Record<number, AIPresetEntity> = {};
	private points: PointEntity[] = [];

	// Metadata
	private worldBoundary: WorldBoundary = { min: { x: Infinity, y: Infinity }, max: { x: -Infinity, y: -Infinity } };
	private hasGrenades = false;

	// ============================================================================================

	// Constructs a valid representation of the PB2 map, given an opaque parsed XML object.
	constructor(xmlFile: XLMParseOutput) {
		for (const [pb2ObjectName, pb2Objects] of Object.entries(xmlFile.root)) {
			// @TODO: Validation w/ zod? and more concrete type. (maybe overkill)
			const parsedPB2Objects = pb2Objects;

			// Using some form of function object map *may* be more elegant (need to factor in dealing with types).. but let's do this for now.
			switch (pb2ObjectName) {
				case 'box':
					this.walls = this.parsePB2Walls(parsedPB2Objects);
					break;
				case 'bg':
					this.backgrounds = this.parsePB2Background(parsedPB2Objects);
					break;
				case 'lamp':
					this.lamps = this.parsePB2Lamp(parsedPB2Objects);
					break;
				case 'gun':
					this.guns = this.parsePB2Gun(parsedPB2Objects);
					break;
				case 'water':
					this.waters = this.parsePB2Water(parsedPB2Objects);
					break;
				case 'door':
					this.movables = this.parsePB2Movable(parsedPB2Objects);
					break;
				case 'player':
				case 'enemy':
					this.characters.push(...this.parsePB2Character(parsedPB2Objects, pb2ObjectName === 'player'));
					break;
				case 'region':
					this.regions.push(...this.parsePB2Region(parsedPB2Objects));
					break;
				case 'pushf':
					// There's no native pushers in PB3. Pushers can be with a combination of region and subforce execute trigger action.
					this.regions.push(...this.parsePB2Pusher(parsedPB2Objects));
					break;
				default:
					console.warn(`Encountered unknown / unsupported xml tag of ${pb2ObjectName}`);
			}
		}
	}

	// Serializes the current PB2 map intp PB3 source code.
	public serializeToPB3SourceCode = (): string => {
		let pb3SourceCode = '';

		// global vars declaration
		const globalNames: string[] = [];
		globalNames.push(...Object.values(this.wallSurfaces).map((s) => s.uid));
		globalNames.push(...Object.values(this.backgroundSurfaces).map((s) => s.uid));
		globalNames.push(...Object.values(this.movableSurfaces).map((s) => s.uid));
		globalNames.push(...Object.values(this.liquidKinds).map((s) => s.uid));
		globalNames.push(...Object.values(this.teams).map((s) => s.uid));
		globalNames.push(...Object.values(this.skins).map((s) => s.uid));
		globalNames.push(...Object.values(this.aiPresets).map((s) => s.uid));
		globalNames.push(...this.points.map((s) => s.uid));
		if (globalNames.length > 0) {
			pb3SourceCode += `var ${globalNames.join(', ')};`;
		}

		pb3SourceCode += PB3StandardMapHeader;

		// ---------------------------------------
		// For PB3 objects like Surfaces and Skins, we lay them in rows (based on type) on the top left
		// of the world boundary.
		// ---------------------------------------
		const iconWidth = 50;
		const iconHeight = 50;

		const iconHeightGap = {
			script: -1 * iconHeight,
			surfaceMovable: -2 * iconHeight,
			surfaceBg: -3 * iconHeight,
			surfaceWall: -4 * iconHeight,
			liquidKind: -5 * iconHeight,
			team: -6 * iconHeight,
			skin: -7 * iconHeight,
			aiPreset: -8 * iconHeight,
		} as const;

		// top-left corner
		const minX = this.worldBoundary.min.x;
		const minY = this.worldBoundary.min.y;

		let scriptIndex = 0;

		pb3SourceCode += serializeMapConfigureScript(minX + iconWidth * scriptIndex++, minY + iconHeightGap.script);

		// Order matters.. we first serialize "assets" like objects..
		for (const [_, surface] of Object.entries(this.wallSurfaces)) {
			const [x, y] = [minX + surface.count * iconWidth, minY + iconHeightGap.surfaceWall];
			pb3SourceCode += serializeSurface(surface, SurfaceType.Wall, x, y);
		}

		for (const [_, surface] of Object.entries(this.backgroundSurfaces)) {
			const [x, y] = [minX + surface.count * iconWidth, minY + iconHeightGap.surfaceBg];
			pb3SourceCode += serializeSurface(surface, SurfaceType.Background, x, y);
		}

		for (const [_, surface] of Object.entries(this.movableSurfaces)) {
			const [x, y] = [minX + surface.count * iconWidth, minY + iconHeightGap.surfaceMovable];
			pb3SourceCode += serializeSurface(surface, SurfaceType.Movable, x, y);
		}

		for (const [_, liquidKind] of Object.entries(this.liquidKinds)) {
			const [x, y] = [minX + liquidKind.count * iconWidth, minY + iconHeightGap.liquidKind];
			pb3SourceCode += serializeLiquidKind(liquidKind, x, y);
		}

		for (const [_, team] of Object.entries(this.teams)) {
			const [x, y] = [minX + team.count * iconWidth, minY + iconHeightGap.team];
			pb3SourceCode += serializeTeam(team, x, y);
		}

		for (const [_, skin] of Object.entries(this.skins)) {
			const [x, y] = [minX + skin.count * iconWidth, minY + iconHeightGap.skin];
			pb3SourceCode += serializeSkin(skin, x, y);
		}

		for (const [_, ai] of Object.entries(this.aiPresets)) {
			const [x, y] = [minX + ai.count * iconWidth, minY + iconHeightGap.aiPreset];
			pb3SourceCode += serializeAIPreset(ai, x, y);
		}

		for (const point of this.points) {
			pb3SourceCode += serializePoint(point);
		}

		// We then serialize object instances..
		for (const wall of this.walls) {
			pb3SourceCode += serializeBox({ kind: 'wall', entity: wall });
		}

		for (const background of this.backgrounds) {
			pb3SourceCode += serializeBox({ kind: 'background', entity: background });
		}

		for (const movable of this.movables) {
			pb3SourceCode += serializeBox({ kind: 'movable', entity: movable });
		}

		for (const water of this.waters) {
			pb3SourceCode += serializeBox({ kind: 'water', entity: water });
		}

		for (const region of this.regions) {
			pb3SourceCode += serializeBox({ kind: 'region', entity: region });
		}

		for (const useButton of this.useButtons) {
			pb3SourceCode += serializeUseButton(useButton);
		}

		for (const lamp of this.lamps) {
			pb3SourceCode += serializeLamp(lamp);
		}

		for (const gun of this.guns) {
			pb3SourceCode += serializeGun(gun);
		}

		for (const char of this.characters) {
			pb3SourceCode += serializeCharacter(char);
		}

		pb3SourceCode += serializeForceRegenScript(minX + iconWidth * scriptIndex++, minY + iconHeightGap.script);

		if (this.hasGrenades) {
			// eslint-disable-next-line no-useless-assignment -- leaving the increment pattern on scriptIndex here for subsequent proceeding code.
			pb3SourceCode += serializeSpawnGrenadesScript(minX + iconWidth * scriptIndex++, minY + iconHeightGap.script);
		}

		pb3SourceCode += PB3StandardFooter;
		return pb3SourceCode;
	};

	private getOrCreateWallSurface = (materialIndex: number): SurfaceEntity => {
		let entity = this.wallSurfaces[materialIndex];
		if (entity === undefined) {
			entity = createPB2WallSurface(materialIndex, Object.keys(this.wallSurfaces).length);
			this.wallSurfaces[materialIndex] = entity;
		}
		return entity;
	};

	private getOrCreateBackgroundSurface = (materialIndex: number, colorMultiplier: Color): SurfaceEntity => {
		// We use a combination of material id and color multiplier as a unique key to an associated surface.
		const key = getBackgroundKey({ materialId: materialIndex, colorMultiplier });
		let entity = this.backgroundSurfaces[key];
		if (entity === undefined) {
			entity = createPB2BackgroundSurface(materialIndex, Object.keys(this.backgroundSurfaces).length, colorMultiplier);
			this.backgroundSurfaces[key] = entity;
		}
		return entity;
	};

	private getOrCreateLiquidKind = (damage: number, actAsWater: boolean): LiquidKindEntity => {
		// We use a combination of damage and actAsWater as a unique key to an associated liquid.
		const key = getLiquidKindKey({ damage, actAsWater });
		let entity = this.liquidKinds[key];
		if (entity === undefined) {
			const count = Object.keys(this.liquidKinds).length;
			entity = {
				uid: `liquidKind${count}`,
				count,
				damage,
				actAsWater,
			};
			this.liquidKinds[key] = entity;
		}
		return entity;
	};

	private getOrCreateMovableSurface = (visible: boolean): SurfaceEntity => {
		const key = visible.toString() as BooleanAsString;
		let entity = this.movableSurfaces[key];
		if (entity === undefined) {
			entity = createPB2MovableSurface_isVisible(visible);
			this.movableSurfaces[key] = entity;
		}
		return entity;
	};

	private getOrCreateTeam = (teamNumber: number): TeamEntity => {
		let entity = this.teams[teamNumber];

		if (entity === undefined) {
			const count = Object.keys(this.teams).length;
			entity = {
				uid: `team${count}`,
				name: teamNames[teamNumber] ?? `Team ${teamNumber}`,
				count,
			};
			this.teams[teamNumber] = entity;
		}
		return entity;
	};

	private getOrCreateSkin = (characterSkinIndex: number): SkinEntity => {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- Indexing a hardcoded map, 1 is guaranteed to exist.
		const pb3Model = PB2SkinToPB3[characterSkinIndex] ?? PB2SkinToPB3[1]!; // marine by default

		let entity = this.skins[pb3Model];
		if (entity === undefined) {
			const count = Object.keys(this.skins).length;
			entity = {
				uid: `skin${count}`,
				count,
				pb2Model: characterSkinIndex,
				pb3Model,
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
			entity = { uid: `aiPreset${count}`, count };
			this.aiPresets[key] = entity;
		}
		return entity;
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
				surfaceUID: this.getOrCreateWallSurface(materialIndex).uid,
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
				surfaceUID: this.getOrCreateBackgroundSurface(materialIndex, colorMultiplier).uid,
				attachedMovableUID: undefined,
			});

			updateWorldBoundary(this.worldBoundary, geometry);
		}

		return backgrounds;
	};

	private parsePB2Lamp = (pb2Objects: ParsedPB2XMLObject[]): LampEntity[] => {
		const lamps: LampEntity[] = pb2Objects.map(({ $: props }) => ({
			uid: '',
			position: {
				x: Number(props.x ?? 0),
				y: Number(props.y ?? 0),
			},
			power: Number(props.power ?? 0),
			hasFlare: ['true', '1'].includes(props.flare ?? 'false'),
		}));
		lamps.forEach(({ position }) => updateWorldBoundary(this.worldBoundary, position));
		return lamps;
	};

	private parsePB2Gun = (pb2Objects: ParsedPB2XMLObject[]): GunEntity[] => {
		const guns: GunEntity[] = [];
		const grenadeModels = Object.keys(PB2GunModelToPB3Gadget);
		let grenadeCount = 0;

		for (const { $: props } of pb2Objects) {
			const teamNummber = Number(props.command ?? -1);
			const isAnyTeam = teamNummber === -1;
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
				});
				this.hasGrenades = true;
				continue;
			}

			let pb3Model = PB2GunModelToPB3[pb2Model] ?? null;
			pb3Model ??= 'gun_rifle'; // default fallback weapon.

			guns.push({
				uid: '',
				position,
				pb2Model,
				pb3Model,
				team: teamNummber,
				upgrade: Number(props.upg ?? 0),
				teamUID: isAnyTeam ? null : this.getOrCreateTeam(teamNummber).uid,
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
				uid: '',
				geometry: geometry,
				liquidKindUID: this.getOrCreateLiquidKind(damage, actAsWater).uid,
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
				uid: '',
				geometry: geometry,
				visible: visible,
				speed: speed,
				surfaceUID: this.getOrCreateMovableSurface(visible).uid,
				attachedMovableUID: null,
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
			let triggerToExecuteUID = pb2Object.$.use_target ?? null;
			let attachedMovableUID = pb2Object.$.attach ?? null;

			if (attachedMovableUID === '-1') {
				attachedMovableUID = null;
			}

			if (triggerToExecuteUID === '-1') {
				triggerToExecuteUID = null;
			}

			// If a PB2 region has a use button, we will create a USE button PB3 entity, inheriting the properties from the original region/
			// The other region will be preserved as it may be used by other triggers. @todo: make it configurable..
			if (isRegionAUSEButton(activationClause)) {
				this.useButtons.push({
					uid: '',
					position: getCenterPosition(geometry),
					triggerToExecuteUID: triggerToExecuteUID,
					attachedMovableUID: attachedMovableUID,
				});

				// We strip away the trigger properties from the original region..
				activationClause = NO_ACTIVATION_METHOD;
				triggerToExecuteUID = null;
			}

			regions.push({
				uid: '',
				geometry: geometry,
				activationClause: activationClause,
				triggerToExecuteUID: triggerToExecuteUID,
				attachedMovableUID: attachedMovableUID,
			});

			updateWorldBoundary(this.worldBoundary, geometry);
		}

		return regions;
	};

	private parsePB2Pusher = (pb2Objects: ParsedPB2XMLObject[]): RegionEntity[] => {
		const pushers: RegionEntity[] = [];

		for (const pb2Object of pb2Objects) {
			const geometry = parseGeometry(pb2Object);
			// const pushX = Number(pb2Object.$.tox ?? 0);
			// const pushY = Number(pb2Object.$.toy ?? 0);
			// const stabilityDamage = Number(pb2Object.$.stab ?? 0);
			// const damage = Number(pb2Object.$.damage ?? 0);

			updateWorldBoundary(this.worldBoundary, geometry);
		}

		return pushers;
	};

	private parsePB2Character = (pb2Objects: ParsedPB2XMLObject[], isPlayer: boolean): CharacterEntity[] => {
		const entities: CharacterEntity[] = pb2Objects.map(({ $: props }) => {
			const noBehaviour = Number(props.botaction ?? 0) === 4;
			return {
				uid: '',
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
				teamUID: this.getOrCreateTeam(Number(props.team ?? -1)).uid,
				skinUID: this.getOrCreateSkin(Number(props.char ?? 1)).uid,
				aiPresetUID: noBehaviour ? null : this.getOrCreateAIPreset().uid,
			} satisfies CharacterEntity;
		});
		entities.forEach(({ position }) => updateWorldBoundary(this.worldBoundary, position));
		return entities;
	};
}
