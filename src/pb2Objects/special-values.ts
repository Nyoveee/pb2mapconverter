import type { RegionEntity } from './entity-types.js';

export const teamNames: Record<number, string> = {
	0: 'Alpha',
	1: 'Beta',
	2: 'Gamma',
	3: 'Delta',
	4: 'Zeta',
	5: 'Lambda',
	6: 'Sigma',
	7: 'Omega',
	8: 'Counter-Terrorists',
	9: 'Terrorists',
	10: 'Usurpation Forces',
	11: 'Citizen Security',
	12: 'Red Team',
	13: 'Blue Team',
	14: 'Green Team',
	15: 'White Team',
	16: 'Black Team',
	[-2]: 'Special B',
	[-3]: 'Special C',
	[-4]: 'Special D',
	[-5]: 'Special E',
	[-6]: 'Special F',
} as const;

export const PB2GunModelToPB3: Record<string, string | null> = {
	gun_rifle: 'gun_rifle',
	gun_rifle_b: null,
	gun_pistol: 'gun_pistol',
	gun_pistol_b: null,
	gun_pistol2: 'gun_pistol2',
	gun_vehgun: 'gun_vehgun',
	gun_gl: 'gun_gl',
	gun_rl: 'gun_rl',
	gun_railgun: 'gun_railgun',
	gun_railgun2: 'gun_railgun2',
	gun_shotgun: 'gun_shotgun',
	gun_shotgun_b: null,
	gun_apistol: 'gun_apistol',
	gun_arifle: 'gun_arifle',
	gun_arifle2: 'gun_arifle2',
	gun_vehcannon: 'gun_vehcannon',
	gun_defibrillator: 'gun_defibrillator',
	gun_bfg: 'gun_bng', // only gun that has a new name
	gun_raygun: 'gun_raygun',
	gun_rayrifle: 'gun_rayrifle',
	gun_vehminigun: 'gun_vehminigun',
	gun_vehminigl: null,
	gun_real_shotgun: 'gun_real_shotgun',
	gun_real_rifle: 'gun_real_rifle',
	gun_oicw: 'gun_oicw',
	gun_plasmagun: 'gun_plasmagun',
	gun_minigun: 'gun_minigun',
	gun_vgun: 'gun_vgun',
	gun_sniper: 'gun_sniper',
	gun_fttp_vehgun: 'gun_fttp_vehgun',
	lazyrain_heal_pistol: 'gun_farheal', // not exactly the same
	/*
    no pb2 equivalent
    'gun_anti_rifle'
    'gun_trouble'
    'gun_shaft'
    'gun_rl2'
    'gun_apistol2'
    'gun_disintegrator'
    'gun_explosiveminigun'
    'gun_firebug'
    'gun_drainlight'
    'gun_sniper2'
    'gun_eratrigger'
    'gun_repairgun'
    'gun_dodge'
    'gun_nailgun'
    'gun_freezer'
    'gun_pistol3'
    'gun_flappygun'
    'gun_flame'
    'gun_rl3'
    'gun_bng2'
    'gun_chrono'
    'gun_vehcannon2'
    'gun_scout_drone'
    'gun_harasser_drone'
    'gun_cs_vehgun'
    'gun_drain_sniper_rifle'
    */
};

export const PB2SkinToPB3: Record<number, number | null> = {
	1: 1, // Campaign Hero model
	40: 1, // Lite Hero
	41: 41, // Lite Hero 2
	42: 42, // Lite Hero 3
	43: 43, // Lite Hero 4
	44: 44, // Lite Hero 5
	45: 45, // Lite Hero 6
	46: 46, // Lite Hero 7
	47: 47, // Lite Hero 8
	48: 48, // Lite Hero 9
	83: 83, // Blue Lite Hero
	84: 84, // Red Lite Hero
	49: 49, // Heavy Hero
	3: 60, // Proxy
	61: 61, // Proxy (No helmet)
	72: 72, // Proxy (White)
	75: 75, // Blue Proxy
	76: 76, // Red Proxy
	13: 13, // Noir Lime
	73: 73, // Blue Player (Noir Lime)
	74: 74, // Red Player (Noir Lime)
	7: 7, // Civil Security Heavy
	8: 8, // Civil Security Lite
	11: 11, // Civil Security Boss
	12: 12, // Civil Security Ghost
	77: 77, // Blue Civil Security Lite
	4: 4, // Android T-01187
	9: 9, // Android SLC-56
	81: 81, // Blue Android SLC-56
	82: 82, // Red Android SLC-56
	14: 14, // Falkok
	85: 85, // Blue Falkok
	86: 86, // Red Falkok
	15: 15, // Phoenix Falkok
	16: 16, // Grub
	2: 2, // Usurpation Soldier Minor
	70: 70, // Usurpation Destroyer
	71: 71, // Usurpation Soldier Major
	79: 79, // Blue Usurpation Soldier
	80: 80, // Red Usurpation Soldier
	6: 6, // Advanced Usurpation Soldier
	/*
    no pb2 equivalent
    50 // Combined Marine
    62 // Proxy D
    63 // Proxy E
    17 // Digits
    */
};

export const NO_ACTIVATION_METHOD = 0;
const USE_METHOD = 1;
const CHARACTER_NOT_IN_A_VEHICLE = 2;
const CHARACTER_IN_A_VEHICLE = 3;
const CHARACTER = 4;
const MOVABLE = 5;
const PLAYER = 6;
const ALL_SINGLE_PLAYER_HEROES = 7;
const USE_INVISIBLE_BUTTON = 8;
const USE_RED_TEAM_ONLY = 9;
const USE_BLUE_TEAM_ONLY = 10;
const USE_RED_TEAM_ONLY_INVISIBLE = 11;
const USE_BLUE_TEAM_ONLY_INVISIBLE = 12;
const RED_TEAM_PLAYER_ONLY = 13;
const BLUE_TEAM_PLAYER_ONLY = 14;
const USE_BUTTON_INVISIBLE_NO_SOUND = 15;
const PROJECTILE_OR_SWORD = 16;
const ACTOR_ONLY = 17;
const ACTOR_NOT_ALLIED_TO_PLAYER = 18;
export const PUSHER = 19; // custom defined..

export const PB2GunModelToPB3Gadget: Record<string, string> = {
	item_grenade: 'HE', // pb2ArmsAction.ACTION_TYPE_THROW_GRENADE_HE
	item_port: 'PORT', // pb2ArmsAction.ACTION_TYPE_THROW_GRENADE_PORT
	item_shield: 'SHIELD', // pb2ArmsAction.ACTION_TYPE_THROW_GRENADE_SHIELD
	gun_sp_sh: 'SHIELD', // pb2ArmsAction.ACTION_TYPE_THROW_GRENADE_SHIELD
};

const PB2VehicleModelToPB3Entity = {
	veh_jeep: { type: 'pb2Entity.TYPE_MOTO ', styleId: 'pb2EntityMoto.STYLE_ID_MOBILE_CS', scale: 1 },
	veh_walker: { type: 'pb2Entity.TYPE_WALKER ', styleId: '1', scale: 1 },
	veh_crate: { type: 'pb2Entity.TYPE_CRATE ', styleId: '1', scale: 1 },
	veh_drone: { type: 'pb2Entity.TYPE_CORVETTE ', styleId: 'pb2EntityMoto.STYLE_ID_MOBILE_CS', scale: 0.2 },
	veh_corvette: { type: 'pb2Entity.TYPE_CORVETTE ', styleId: 'pb2EntityMoto.STYLE_ID_MOBILE_CS', scale: 1 },
	bar_orange: { type: 'pb2Entity.TYPE_BARREL ', styleId: 'pb2EntityBarrel.STYLE_ID_YELLOW', scale: 1 },
	bar_blue: { type: 'pb2Entity.TYPE_BARREL ', styleId: 'pb2EntityBarrel.STYLE_ID_BLUE', scale: 1 },
	bar_red: { type: 'pb2Entity.TYPE_BARREL ', styleId: 'pb2EntityBarrel.STYLE_ID_RED', scale: 1 },

	/* veh_rope: { type: 'pb2Entity.TYPE_MOTO ', styleId: 'pb2EntityMoto.STYLE_ID_MOBILE_CS', scale: 1 }, no equivalent.. */
};

export const getPB3EntityDetails = (model: string | undefined) => {
	if (model === undefined) {
		return undefined;
	}

	// Type guard because typescript can't tell that it is a valid key.
	function isValidKey(key: string): key is keyof typeof PB2VehicleModelToPB3Entity {
		return key in PB2VehicleModelToPB3Entity;
	}

	if (!isValidKey(model)) {
		return undefined;
	}

	return PB2VehicleModelToPB3Entity[model];
};

export const getRegionSpecificProperties = (region: RegionEntity) => {
	const react_to_ragdolls = [
		CHARACTER,
		CHARACTER_NOT_IN_A_VEHICLE,
		PLAYER,
		RED_TEAM_PLAYER_ONLY,
		BLUE_TEAM_PLAYER_ONLY,
		ALL_SINGLE_PLAYER_HEROES,
		ACTOR_ONLY,
		ACTOR_NOT_ALLIED_TO_PLAYER,
		PUSHER,
	].includes(region.activationClause);

	// prettier-ignore
	const react_to_bullets = [
		PROJECTILE_OR_SWORD,
		PUSHER
	].includes(region.activationClause);

	// prettier-ignore
	const react_to_exact_movables = [
		MOVABLE
	].includes(region.activationClause);

	// prettier-ignore
	const react_to_grappling_hooks = [
		PUSHER
	].includes(region.activationClause);

	// prettier-ignore
	const react_to_guns = [
		PUSHER
	].includes(region.activationClause);

	// prettier-ignore
	const react_to_grenades = [
		PUSHER
	].includes(region.activationClause);

	// prettier-ignore
	const react_to_shields = [
		PUSHER
	].includes(region.activationClause);

	const react_to_entities = [CHARACTER_IN_A_VEHICLE].includes(region.activationClause);

	return {
		increased_accuracy: 'false',
		react_to_ragdolls: `${react_to_ragdolls}`,
		react_to_guns: `${react_to_guns}`,
		react_to_bullets: `${react_to_bullets}`,
		react_to_grenades: `${react_to_grenades}`,
		react_to_grappling_hooks: `${react_to_grappling_hooks}`,
		react_to_shields: `${react_to_shields}`,
		react_to_entities: `${react_to_entities}`,
		react_to_exact_movables: `${react_to_exact_movables}`,
		onEnter: 'null',
		onLeave: 'null',
		onSubstep: `${region.triggerToExecuteUID}`,
	};
};

export const isRegionAUSEButton = (activationClause: number) => {
	return [
		USE_METHOD,
		USE_INVISIBLE_BUTTON,
		USE_RED_TEAM_ONLY,
		USE_RED_TEAM_ONLY_INVISIBLE,
		USE_BLUE_TEAM_ONLY,
		USE_BLUE_TEAM_ONLY_INVISIBLE,
		USE_BUTTON_INVISIBLE_NO_SOUND,
	].includes(activationClause);
};

// ---------------------------------------
// For PB3 objects like Surfaces and Skins, we lay them in rows (based on type) on the top left
// of the world boundary.
// ---------------------------------------
export const EDITOR_ICON_WIDTH = 50;
export const EDITOR_ICON_HEIGHT = 50;

export const iconHeightGap = {
	script: -1 * EDITOR_ICON_HEIGHT,
	surfaceMovable: -2 * EDITOR_ICON_HEIGHT,
	surfaceBg: -3 * EDITOR_ICON_HEIGHT,
	surfaceWall: -4 * EDITOR_ICON_HEIGHT,
	liquidKind: -5 * EDITOR_ICON_HEIGHT,
	team: -6 * EDITOR_ICON_HEIGHT,
	skin: -7 * EDITOR_ICON_HEIGHT,
	aiPreset: -8 * EDITOR_ICON_HEIGHT,
} as const;
