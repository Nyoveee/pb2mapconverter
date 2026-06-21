import type { Color } from '#utils/color.js';
import type { Geometry, Position, Side } from '#utils/types.js';
import type { SurfaceInfo } from './surface.js';

// The base class which rules them all..
interface EditorObject {
	uid: string;
	serialize(coordinateOffset?: { minX: number; minY: number }): string;
}

// ===============================================
// PB3 Objects
// ===============================================
export interface SurfaceEntity extends SurfaceInfo, EditorObject {
	position: Position;
	color: Color; // color multiplier (walls dont have color multiplier, so it would be 255, 255, 255).
	visible: boolean; // some movables are not visible.
}
export interface LiquidKindEntity extends EditorObject {
	position: Position;
	damage: number;
	actAsWater: boolean;
}

export interface TeamEntity extends EditorObject {
	position: Position;
	name: string;
}

export interface SkinEntity extends EditorObject {
	position: Position;
	pb2Model: number;
	pb3Model: number;
}

export interface AIPresetEntity extends EditorObject {
	position: Position;
}

export interface PointEntity extends EditorObject {
	position: Position;
}

export interface UseButtonEntity extends EditorObject {
	position: Position;
	triggerToExecuteUID: string | null;
	attachedMovableUID: string | null;
}

export interface TriggerGroupEntity extends EditorObject {
	position: Position;
	children: EditorObject[];
	arguments: string[];
	maxCalls: number;
}

export interface Vector extends EditorObject {
	position: Position;
	dx: number;
	dy: number;
}

export interface ExecuteMethod extends EditorObject {
	position: Position;
	functionName: string;
	arguments: string[];
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
	colorMultiplier: Color;
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
	damage: number;
	actAsWater: boolean;
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

	// pb2 properties..
	pb2SkinId: number;
	pb2TeamId: number;
	isAIInactive: boolean;

	// pb3 properties..
	teamUID: string;
	skinUID: string;
	aiPresetUID: string | null;

	// @todo..
	//vehicle: null | "auto" | unknown;
	//onDeath: null | unknown;
}

export interface VehicleEntity extends EditorObject {
	position: Position;
	healthScale: number;
	scale: number;
	direction: Side;
	type: string;
	styleId: string;
}

// ===============================================
// PB2 Objects (will be processed into the equivalent PB3 objects)
// ===============================================
export interface PusherEntity {
	uid: string;
	geometry: Geometry;
	dx: number;
	dy: number;
	stabliityDamage: number;
	damage: number;
}
