import type { Script } from '../pb2Objects/entity-types.js';
import { serializeScript } from '../serialize/script.js';
import { DM_SKIN_IDENTIFIER } from '../utils/types.js';

// grenades are bullets instead of guns in pb3 and bullets can't be created via script easily,
// so instead a point is created for each grenade position and a script puts a grenade into every grenade spawn point

export const getGrenadeSpawnPointUID = (count: number, model: string): string => {
	return `gadget_spawn_point${count}__${model}`;
};

/**
 * script that spawns grenades into points with uids matching getGrenadeSpawnPointUID(count, model). kind of a hack but it works.
 * this sets pb2BulletDisposer.normal_time_to_live = Infinity so the grenades don't despawn. not sure if that has downsides. normal bullets seem to still despawn
 */
export const createSpawnGrenadesScript = (x: number, y: number): Script => {
	// prettier-ignore
	const code =
		`(() => {
    /*
    	PB2 Script | Grenade

        This file is responsible for spawning grenades. This works by looking all any object that starts with 'gadget_spawn_point',
        and parsing the name that contains the grenade's properties.

        This method is required because there is no one object equivalent to a PB2 grenade in PB3. 
    */
    function spawnGadget(model, p) {
        let char = pb2Ragdoll.CreateRagdollComplete({ 
            x: p.x, 
            y: p.y, 
            scale: 0,
            skin: pb2SkinEditor.SpawnDefaultSkin( 1 ), 
            team: pb2Team.teams[0] !== undefined ? pb2Team.teams[0] : pb2Team.CreateTeam({ 
                ai_in_team: false, 
                title: 'default team', 
                hud_color: new pb2HighRangeColor( 0x6a94ff ), 
                recolor_nicknames_on_overhead: true, 
                friendly_fire: true, 
                friendly_damage_multiplier: 1, 
                normal_damage_to_dead_teammates: true, 
                teammates_collide: true, 
                allow_private_communication: true, 
                overheads_visibility: pb2OverheadHUD.OVERHEAD_VISIBILITY_TEAMMATES_ONLY 
            }), 
            vision: pb2Vision.VISION_SCREEN_BOX, 
            style_boost: pb2StyleBoost.SELFBOOST, 
            style_swords: pb2StyleSwords.BASIC, 
            driver_of: null, 
            sword_projectile_reflection: false, 
            hmax: 0, 
            can_be_revived: false, 
            can_breathe_in_water: false, 
            can_breathe_in_toxic_clouds: false, 
            regen_module: pb2StyleRegen.style_delayed_speedup, 
            drop_guns_on_death: pb2Character.DROP_ALWAYS, 
            drop_grenades_on_death: pb2Character.DROP_ALWAYS, 
            enforce_skin_limitations: false, 
            use_skin_properties: false, 
            player_controllable: false, 
            ai_preset: null, 
            side: 1 
        });
        
        char.owner_character.AddGrenades(model, 1);
        char.remove();
    }

    pb2BulletDisposer.normal_time_to_live = Infinity; /* stops grenade despawn */

    Object.entries(window)
    .filter(([k, v]) => k.startsWith("gadget_spawn_point"))
    .map(([k, p]) => {
        const i = k.indexOf("__") + 2;
        const model = pb2ArmsAction["ACTION_TYPE_THROW_GRENADE_" + k.slice(i)];
        if (model !== undefined) return [model, p];
        return [pb2ArmsAction.ACTION_TYPE_THROW_GRENADE_HE, p];
    })
    .forEach(([m, p]) => spawnGadget(m, p));
})();`

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

/**
 * Script that starts regen if the character was created with less hp than max
 * This works by exploiting the fact that subtracting 0 health from a player forces regeneration in PB3.
 * */
export const createForceRegenScript = (x: number, y: number): Script => {
	const code = `
/* 
	PB2 Script | Forced startup regeneration

    In PB3, character that has their current health less than their max health doesn't regenerate their health.

    This script damages all PB3 character that doesn't have max health with a value of 0, forcing health regeneration
    which imitates PB2 behavior.

    If this effect is not desired, you may remove the script.
*/

pb2Character.characters.filter(c=>c.hea!==c.hmax&&c.hea>0).forEach(c=>c.SubstractHealth(0));
`;
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

/** script that configures map settings to be closer to pb2 */
export const createMapConfigureScript = (x: number, y: number): Script => {
	const code = `
/* 
	PB2 Script | World Setting

    This script changes the current setting such that it closely resembles PB2 settings. 
    You may remove this script if desired.
*/

pb2GunDisposer.normal_time_to_live=Infinity;
pb2RagdollDisposer.normal_time_to_live=Infinity;
pb2Bullet.friction_wall=0.5; // similar bullet penetration as pb2
`;
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

export const createPB2ModuleStartScript = (x: number, y: number): Script => {
	const code = `
/*
	PB2 MP Module | Initialize

    This script is responsible for initializing the PB2 MP module. 

    It temporarily overrides player creation, delaying creation and saving
    player parameters.
    
    Removing this script means your map will no longer be compatible with Prosu's PB2 MP module.
    If this is desired, make sure to remove 'PB2 MP Module | Finalize' script as well.
*/

let ___map_pb2_player_params   = [];
let ___map_pb2_player_spawn_id = 0;
let CreateRagdollComplete_original = pb2Ragdoll.CreateRagdollComplete;
pb2Ragdoll.CreateRagdollComplete = (...args) => {
	let params = args[0];
	if (!params.player_controllable)
		return CreateRagdollComplete_original(params);

	___map_pb2_player_params[___map_pb2_player_spawn_id++] = params;
	
	return null; // maybe change this?
};
`;
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

export const createPB2ModuleEndScript = (x: number, y: number): Script => {
	const code = `
/*
	PB2 MP Module | Finalize

    This script is responsible for cleaning up the work done when initializing the PB2 MP module. 
    
    It restores the original player creation function, as well as ad-hoc clean up tasks.

    Removing this script means your map will no longer be compatible with Prosu's PB2 MP module.
    If this is desired, make sure to remove 'PB2 MP Module | Initialize' script as well.
*/

// Restore original character creation function
pb2Ragdoll.CreateRagdollComplete = CreateRagdollComplete_original;

// If using the module
if ('PB2GameModule_MapReady' in globalThis) {
	globalThis.PB2GameModule_MapReady({
		spawns: ___map_pb2_player_params
	});

	// Override trigger chat messages to be global
	globalThis.SendChat_PB2Preset = globalThis.PB2GameModule_AnnounceTrigger;
} 

// If not using the module (e.g. testing the map in the editor)
else 
{
	let params = ___map_pb2_player_params[0];
	if (params.skin === ${DM_SKIN_IDENTIFIER}) {
		params.name = new pb2ColoredText().FromTagged(pb2GameWorld.nickname_tagged);
		params.skin = pb2SkinEditor.SpawnTemporaryPreferredUserSkin(pb2GameWorld);
	}
	CreateRagdollComplete_original(params);
	pb2GameWorld.EnableSimplePlayerAssignmentLogic();
	if ('coop_post_restart' in globalThis)
		globalThis.coop_post_restart();
}
`;
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
