import type { Color } from '#utils/color.js';
import type { Geometry, Position, Side } from '#utils/types.js';
import type { SurfaceInfo } from './surface.js';

// The base class which rules them all..
interface EditorObject {
	uid: string;
}

// ===============================================
// PB3 Objects
// ===============================================
export interface SurfaceEntity extends SurfaceInfo, EditorObject {
	count: number; // useful data to generate other data like position.
	color: Color; // color multiplier (walls dont have color multiplier, so it would be 255, 255, 255).
	visible: boolean; // some movables are not visible.
}
export interface LiquidKindEntity extends EditorObject {
	count: number;
	damage: number;
	actAsWater: boolean;
}

export interface TeamEntity extends EditorObject {
	count: number;
	name: string;
}

export interface SkinEntity extends EditorObject {
	count: number;
	pb2Model: number;
	pb3Model: number;
}

export interface AIPresetEntity extends EditorObject {
	count: number;
	// is there anything that should be changed from defaults?
}

export interface PointEntity extends EditorObject {
	position: Position;
}

export interface UseButtonEntity extends EditorObject {
	position: Position;
	triggerToExecuteUID: string | null;
	attachedMovableUID: string | null;
}

// ===============================================
// PB2/PB3 Objects
// ===============================================

export interface WallEntity extends EditorObject {
	geometry: Geometry;
	materialIndex: number;
	surfaceUID: string; // pb3 property
}

export interface BackgroundEntity extends EditorObject {
	geometry: Geometry;
	backgroundMaterialIndex: number;
	textureXOffset: number;
	textureYOffset: number;
	drawInFront: boolean;
	surfaceUID: string; // pb3 property
	attachedMovableUID: string | undefined;
}

export interface MovableEntity extends EditorObject {
	geometry: Geometry;
	visible: boolean;
	speed: number;
	surfaceUID: string; // pb3 property
	attachedMovableUID: string | null;
}

export interface WaterEntity extends EditorObject {
	geometry: Geometry;
	liquidKindUID: string; // pb3 property
}

export interface RegionEntity extends EditorObject {
	geometry: Geometry;
	activationClause: number;
	triggerToExecuteUID: string | null;
	attachedMovableUID: string | null;
}

export interface LampEntity extends EditorObject {
	position: Position;
	power: number;
	hasFlare: boolean;
}

export interface GunEntity extends EditorObject {
	position: Position;
	pb2Model: string;
	pb3Model: string;
	team: number;
	upgrade: number;
	teamUID: string | null; // pb3 property
}

export interface CharacterEntity extends EditorObject {
	position: Position;
	velX: number;
	velY: number;
	hp: number;
	hpMax: number;
	direction: Side;
	isPlayer: boolean;
	teamUID: string; // pb3 property
	skinUID: string; // pb3 property
	aiPresetUID: string | null; // pb3 property
	//vehicle: null | "auto" | unknown; // todo
	//onDeath: null | unknown; // todo
}
