// ===============================================
// Mapping PB2's property to PB3..
// ===============================================

import { serializeSurface } from '../serialize/surface.js';
import { blackColor, whiteColor, type Color } from '../utils/color.js';
import type { Position, WorldBoundary } from '../utils/types.js';
import type { SurfaceEntity } from './entity-types.js';
import { EDITOR_ICON_WIDTH, iconHeightGap } from './special-values.js';
import { SurfaceType, type SurfaceInfo } from './surface.js';

const pb2WallMaterialToSurfaceInfo: Record<number, SurfaceInfo> = {
	0: { surfaceName: 'pb2platform_texture', surfaceType: 'pb2SurfaceType.TYPE_PB2PLATFORM_WALL', surfaceTerrain: 'Ground' }, // Concrete
	1: { surfaceName: 'mat_grass', surfaceType: 'pb2SurfaceType.TYPE_SIMPLE_WALL', surfaceTerrain: 'Grass' }, // Grass
	2: { surfaceName: 'mat_sand', surfaceType: 'pb2SurfaceType.TYPE_SIMPLE_WALL', surfaceTerrain: 'Sand' }, // Sand
	3: { surfaceName: 'rock_slice', surfaceType: 'pb2SurfaceType.TYPE_PB2PLATFORM_WALL', surfaceTerrain: 'Ground' }, // Brown concrete
	4: { surfaceName: 'mat_plate1_bg', surfaceType: 'pb2SurfaceType.TYPE_PB2PLATFORM_WALL', surfaceTerrain: 'Ground' }, // Dark plate
	5: { surfaceName: 'mat_grass', surfaceType: 'pb2SurfaceType.TYPE_SIMPLE_WALL', surfaceTerrain: 'Grass' }, // Dry grass
	6: { surfaceName: 'mat_grass', surfaceType: 'pb2SurfaceType.TYPE_SIMPLE_WALL', surfaceTerrain: 'Grass' }, // Dark grass
	7: { surfaceName: 'mat_plate1_bg', surfaceType: 'pb2SurfaceType.TYPE_PB2PLATFORM_WALL', surfaceTerrain: 'Ground' }, // Clean dark plate
	8: { surfaceName: 'mat_plate2_bg', surfaceType: 'pb2SurfaceType.TYPE_PB2PLATFORM_WALL', surfaceTerrain: 'Ground' }, // Bright plate
	9: { surfaceName: 'mat_plate2_bg', surfaceType: 'pb2SurfaceType.TYPE_PB2PLATFORM_WALL', surfaceTerrain: 'Ground' }, // Clean bright plate
	10: { surfaceName: 'platform_texture_usurpation', surfaceType: 'pb2SurfaceType.TYPE_PLATFORM_WALL', surfaceTerrain: 'Ground' }, // Usurpation plate
	11: { surfaceName: 'pb2platform_texture', surfaceType: 'pb2SurfaceType.TYPE_PB2PLATFORM_WALL', surfaceTerrain: 'Ground' }, // Stripes (There is no equivalent)
	12: { surfaceName: 'mat_plate3_bg', surfaceType: 'pb2SurfaceType.TYPE_PB2PLATFORM_WALL', surfaceTerrain: 'Ground' }, // Asphalt
	13: { surfaceName: 'mat_panel_tile', surfaceType: 'pb2SurfaceType.TYPE_PB2PLATFORM_WALL', surfaceTerrain: 'Ground' }, // White concrete
	14: { surfaceName: 'mat_panel_tile', surfaceType: 'pb2SurfaceType.TYPE_PB2PLATFORM_WALL', surfaceTerrain: 'Ground' }, // PB:FTTP-like concrete
	15: { surfaceName: 'mat_sand', surfaceType: 'pb2SurfaceType.TYPE_SIMPLE_WALL', surfaceTerrain: 'Sand' }, // Wet sand
	16: { surfaceName: 'mat_sand', surfaceType: 'pb2SurfaceType.TYPE_SIMPLE_WALL', surfaceTerrain: 'Sand' }, // Mud
	17: { surfaceName: 'platform_texture_usurpation', surfaceType: 'pb2SurfaceType.TYPE_PLATFORM_WALL', surfaceTerrain: 'Ground' }, // Usurpation tiles
	18: { surfaceName: 'pb2platform_texture', surfaceType: 'pb2SurfaceType.TYPE_PB2PLATFORM_WALL', surfaceTerrain: 'Ground' }, // Stone bricks
	19: { surfaceName: 'pb2platform_texture', surfaceType: 'pb2SurfaceType.TYPE_PB2PLATFORM_WALL', surfaceTerrain: 'Ground' }, // Woods
	20: { surfaceName: 'metal_slice', surfaceType: 'pb2SurfaceType.TYPE_PB2PLATFORM_WALL', surfaceTerrain: 'Ground' }, // Rocks
	[-1]: { surfaceName: 'metal_slice', surfaceType: 'pb2SurfaceType.TYPE_SIMPLE_WALL', surfaceTerrain: 'Black' }, // Black
} as const;

const pb2BackgroundMaterialToSurfaceInfo: Record<number, SurfaceInfo> = {
	0: { surfaceName: 'mat_panel_tile', surfaceType: 'pb2SurfaceType.TYPE_SIMPLE_BACKGROUND', surfaceTerrain: 'Ground' }, // Basic
	1: { surfaceName: 'ground_tile', surfaceType: 'pb2SurfaceType.TYPE_SIMPLE_BACKGROUND', surfaceTerrain: 'Ground' }, // Ground
	2: { surfaceName: 'mat_panel2_tile', surfaceType: 'pb2SurfaceType.TYPE_SIMPLE_BACKGROUND', surfaceTerrain: 'Ground' }, // Usurpation
	3: { surfaceName: 'mat_white', surfaceType: 'pb2SurfaceType.TYPE_SIMPLE_BACKGROUND', surfaceTerrain: 'Ground' }, // White
	4: { surfaceName: 'mat_slider_tile', surfaceType: 'pb2SurfaceType.TYPE_SIMPLE_BACKGROUND', surfaceTerrain: 'Ground' }, // Elevator Path
	5: { surfaceName: 'mat_panel3_tile', surfaceType: 'pb2SurfaceType.TYPE_SIMPLE_BACKGROUND', surfaceTerrain: 'Ground' }, // Impure Canal
	6: { surfaceName: 'mat_white', surfaceType: 'pb2SurfaceType.TYPE_SIMPLE_BACKGROUND', surfaceTerrain: 'Red' }, // Red
	7: { surfaceName: 'mat_white', surfaceType: 'pb2SurfaceType.TYPE_SIMPLE_BACKGROUND', surfaceTerrain: 'Green' }, // Green
	8: { surfaceName: 'mat_white', surfaceType: 'pb2SurfaceType.TYPE_SIMPLE_BACKGROUND', surfaceTerrain: 'Blue' }, // Blue
	9: { surfaceName: 'mat_panel4_tile', surfaceType: 'pb2SurfaceType.TYPE_SIMPLE_BACKGROUND', surfaceTerrain: 'Ground' }, // Damned
	10: { surfaceName: 'mat_plate1_bg', surfaceType: 'pb2SurfaceType.TYPE_SIMPLE_BACKGROUND', surfaceTerrain: 'Ground' }, // Panel Default
	11: { surfaceName: 'mat_plate2_bg', surfaceType: 'pb2SurfaceType.TYPE_SIMPLE_BACKGROUND', surfaceTerrain: 'Ground' }, // Panel Bright
	12: { surfaceName: 'mat_plate3_bg', surfaceType: 'pb2SurfaceType.TYPE_SIMPLE_BACKGROUND', surfaceTerrain: 'Ground' }, // Panel Dark
	13: { surfaceName: 'mat_panel8_tile', surfaceType: 'pb2SurfaceType.TYPE_SIMPLE_BACKGROUND', surfaceTerrain: 'Ground' }, // Rocks
	14: { surfaceName: 'platform_texture_dark', surfaceType: 'pb2SurfaceType.TYPE_PLATFORM_WALL', surfaceTerrain: 'Ground' }, // Pixel Wall (No equivalent)
	15: { surfaceName: 'platform_texture_dark', surfaceType: 'pb2SurfaceType.TYPE_PLATFORM_WALL', surfaceTerrain: 'Ground' }, // Pixel Background (No equivalent)
	16: { surfaceName: 'platform_texture_dark', surfaceType: 'pb2SurfaceType.TYPE_PLATFORM_WALL', surfaceTerrain: 'Ground' }, // Pixel Open Door (No equivalent)
} as const;

export const pb2ShadowBackgroundMaterial = -1;

export const createPB2WallSurface = (materialIndex: number, position: Position, uid: string): SurfaceEntity => {
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- index 0 should always contain a basic material, this is a hardcoded map.
	const wallSurfaceInfo = pb2WallMaterialToSurfaceInfo[materialIndex] ?? pb2WallMaterialToSurfaceInfo[0]!;

	return {
		...wallSurfaceInfo,
		position: position,
		uid: uid,
		color: whiteColor,
		visible: true,
		serialize() {
			return serializeSurface(this, SurfaceType.Wall);
		},
	};
};

export const createPB2BackgroundSurface = (materialIndex: number, color: Color, position: Position, uid: string): SurfaceEntity => {
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- index 0 should always contain a basic material, this is a hardcoded map.
	const backgroundSurfaceInfo = pb2BackgroundMaterialToSurfaceInfo[materialIndex] ?? pb2BackgroundMaterialToSurfaceInfo[0]!;

	return {
		...backgroundSurfaceInfo,
		position: position,
		uid: uid,
		color: color,
		visible: true,
		serialize() {
			return serializeSurface(this, SurfaceType.Background);
		},
	};
};

export const createPB2MovableSurface_isVisible = (visible: boolean, worldBoundary: WorldBoundary): SurfaceEntity => {
	const visibleMovableSurfaceUID = `visibleMovableSurface`;
	const invisibleMovableSurfaceUID = `invisibleMovableSurface`;
	const BLACK_WALL_INDEX = -1;
	const count = visible ? 0 : 1;

	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- BLACK WALL INDEX should point to a valid wall material, this is a hardcoded map.
	const backgroundSurfaceInfo = pb2WallMaterialToSurfaceInfo[BLACK_WALL_INDEX]!;

	const [x, y] = [worldBoundary.min.x + count * EDITOR_ICON_WIDTH, worldBoundary.min.y + iconHeightGap.surfaceMovable];

	return {
		...backgroundSurfaceInfo,
		position: { x: x, y: y },
		uid: visible ? visibleMovableSurfaceUID : invisibleMovableSurfaceUID,
		color: blackColor,
		visible: visible,
		serialize() {
			return serializeSurface(this, SurfaceType.Movable);
		},
	};
};
