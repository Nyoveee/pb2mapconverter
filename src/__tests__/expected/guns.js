var wallSurface0, team1, team0, gadget_spawn_point0__HE, gadget_spawn_point1__PORT, gadget_spawn_point2__SHIELD, gadget_spawn_point3__SHIELD;//->Ditto->//{"operation":"define_global_vars"}
pb2GameWorld.DownloadModules( { user_data_uids_to_load: [ 183/*Eric Gurt's Basic trigger action presets*/ ], inline: true, success_callback: _pb2N } );function _pb2N(){//->Ditto->//{"id":"","operation":"create","constructor":"pb2GameWorld.DownloadModules","user_data_uids_to_load":"[ 183/*Eric Gurt's Basic trigger action presets*/ ]","execute_on_load":"true","inline":"true","success_callback":"null","error_callback":"null","x":"0","y":"0","_visible":"0","_locked":"0","_disabled":"0"}
pb2GameWorld.EnableSimplePlayerAssignmentLogic();//->Ditto->//{"x":"0","y":"0","operation":"call_method","method":"pb2GameWorld.EnableSimplePlayerAssignmentLogic","argument_values":"","keep_at_the_bottom":"0","_visible":"0","_locked":"0","_disabled":"0"}

/* 
    This script changes the current setting such that it closely resembles PB2 settings. 
    You may remove this script if desired.
*/
pb2GunDisposer.normal_time_to_live=Infinity;
pb2RagdollDisposer.normal_time_to_live=Infinity;
pb2Bullet.friction_wall=0.5;
//->Ditto->//{"operation":"code","snippet_color":"0xb1b1ff","code":"\n/* \n    This script changes the current setting such that it closely resembles PB2 settings. \n    You may remove this script if desired.\n*/\npb2GunDisposer.normal_time_to_live=Infinity;\npb2RagdollDisposer.normal_time_to_live=Infinity;\npb2Bullet.friction_wall=0.5;\n","x":"-300","y":"-340","_visible":"1","_locked":"0","_disabled":"0"}
wallSurface0 = pb2SurfaceType.CreateSurfaceType({ geometry_type: pb2SurfaceType.TYPE_PB2PLATFORM_WALL, texture_container: pb2Texture.GetTextureByName('pb2platform_texture'), terrain_generation: false, is_for_wall: true, shader_type: pb2SurfaceType.SHADER_GAMEPLAY, pixelated: false, transparent: false, opacity: 1, color: new pb2HighRangeColor( 0xffffff ), color_addon: new pb2HighRangeColor( 0x000000 ), appearance: pb2SurfaceType.APPEARANCE_NORMAL, recommended_slices_per_density: 5, debris_material: pb2Entity.MATERIAL_CONCRETE, movable_sounds_preset: null, slice_texture_container: null, slice_color: new pb2HighRangeColor( 0xffffff ), slice_color_addon: new pb2HighRangeColor( 0x000000 ), slice_pixelated: false, slice_transparent: false, slice_appearance: pb2SurfaceType.APPEARANCE_NORMAL, slice_opacity: 1, slice_scale: 1, impact_scale: 1, uv_x: 0, uv_y: 0, uv_z: 0, uv_sx: 1, uv_sy: 1, uv_sz: 1 });//->Ditto->//{"operation":"create","constructor":"pb2SurfaceType.CreateSurfaceType","id":"wallSurface0","geometry_type":"pb2SurfaceType.TYPE_PB2PLATFORM_WALL","texture_container":"pb2Texture.GetTextureByName('pb2platform_texture')","name":"'Ground'","terrain_generation":"false","foliage_template":"pb2FoliageClass.TEMPLATE_EARTH","has_cliff":"true","has_ground":"true","is_for_wall":"true","shader_type":"pb2SurfaceType.SHADER_GAMEPLAY","front_y":"undefined","back_y":"undefined","pixelated":"false","transparent":"false","opacity":"1","color":"new pb2HighRangeColor( 0xffffff )","color_addon":"new pb2HighRangeColor( 0x000000 )","appearance":"pb2SurfaceType.APPEARANCE_NORMAL","recommended_slices_per_density":"5","debris_material":"pb2Entity.MATERIAL_CONCRETE","movable_sounds_preset":"null","slice_texture_container":"null","slice_color":"new pb2HighRangeColor( 0xffffff )","slice_color_addon":"new pb2HighRangeColor( 0x000000 )","slice_pixelated":"false","slice_transparent":"false","slice_appearance":"pb2SurfaceType.APPEARANCE_NORMAL","slice_opacity":"1","slice_scale":"1","impact_scale":"1","x":"-300","y":"-490","_visible":"1","_locked":"0","_disabled":"0","uv_x":"0","uv_y":"0","uv_z":"0","uv_sx":"1","uv_sy":"1","uv_sz":"1"}
team1 = pb2Team.CreateTeam({ ai_in_team: true, title: 'Alpha', hud_color: new pb2HighRangeColor( 0x6a94ff ), recolor_nicknames_on_overhead: true, friendly_fire: false, friendly_damage_multiplier: 1, normal_damage_to_dead_teammates: true, teammates_collide: false, allow_private_communication: true, overheads_visibility: pb2OverheadHUD.OVERHEAD_VISIBILITY_TEAMMATES_ONLY });//->Ditto->//{"operation":"create","constructor":"pb2Team.CreateTeam","id":"team1","ai_in_team":"true","title":"'Alpha'","hud_color":"new pb2HighRangeColor( 0x6a94ff )","recolor_nicknames_on_overhead":"true","friendly_fire":"false","friendly_damage_multiplier":"1","normal_damage_to_dead_teammates":"true","teammates_collide":"false","allow_private_communication":"true","overheads_visibility":"pb2OverheadHUD.OVERHEAD_VISIBILITY_TEAMMATES_ONLY","x":"-250","y":"-590","_visible":"1","_locked":"0","_disabled":"0"}
team0 = pb2Team.CreateTeam({ ai_in_team: true, title: 'Beta', hud_color: new pb2HighRangeColor( 0x6a94ff ), recolor_nicknames_on_overhead: true, friendly_fire: false, friendly_damage_multiplier: 1, normal_damage_to_dead_teammates: true, teammates_collide: true, allow_private_communication: true, overheads_visibility: pb2OverheadHUD.OVERHEAD_VISIBILITY_TEAMMATES_ONLY });//->Ditto->//{"operation":"create","constructor":"pb2Team.CreateTeam","id":"team0","ai_in_team":"true","title":"'Beta'","hud_color":"new pb2HighRangeColor( 0x6a94ff )","recolor_nicknames_on_overhead":"true","friendly_fire":"false","friendly_damage_multiplier":"1","normal_damage_to_dead_teammates":"true","teammates_collide":"true","allow_private_communication":"true","overheads_visibility":"pb2OverheadHUD.OVERHEAD_VISIBILITY_TEAMMATES_ONLY","x":"-300","y":"-590","_visible":"1","_locked":"0","_disabled":"0"}
gadget_spawn_point0__HE = new Point({ x: -170, y: -10 });//->Ditto->//{"id":"gadget_spawn_point0__HE","operation":"create","constructor":"new Point","x":"-170","y":"-10","_visible":"1","_locked":"0","_disabled":"0"}
gadget_spawn_point1__PORT = new Point({ x: -70, y: -10 });//->Ditto->//{"id":"gadget_spawn_point1__PORT","operation":"create","constructor":"new Point","x":"-70","y":"-10","_visible":"1","_locked":"0","_disabled":"0"}
gadget_spawn_point2__SHIELD = new Point({ x: 30, y: -10 });//->Ditto->//{"id":"gadget_spawn_point2__SHIELD","operation":"create","constructor":"new Point","x":"30","y":"-10","_visible":"1","_locked":"0","_disabled":"0"}
gadget_spawn_point3__SHIELD = new Point({ x: 130, y: -10 });//->Ditto->//{"id":"gadget_spawn_point3__SHIELD","operation":"create","constructor":"new Point","x":"130","y":"-10","_visible":"1","_locked":"0","_disabled":"0"}
pb2GameWorld.CreateBoxShape({ x: -300, y: 0, w: 600, h: 100, m: wallSurface0, type: pb2Shape.WALL });//->Ditto->//{"operation":"create","constructor":"pb2GameWorld.CreateBoxShape","x":"-300","y":"0","w":"600","h":"100","m":"wallSurface0","wc":"null","type":"pb2Shape.WALL","corner":"pb2Shape.CORNER_NONE","dots":"null","_points_being_edited":false,"_visible":"1","_locked":"0","_disabled":"0","id":""}
pb2Gun.CreateGun({ x: -270, y: -190, type: 'gun_pistol' });//->Ditto->//{"operation":"create","constructor":"pb2Gun.CreateGun","id":"","x":"-270","y":"-190","scale":"1","type":"'gun_pistol'","only_allow_for":"null","_visible":"1","_locked":"0","_disabled":"0"}
pb2Gun.CreateGun({ x: -270, y: -90, type: 'gun_rifle' });//->Ditto->//{"operation":"create","constructor":"pb2Gun.CreateGun","id":"","x":"-270","y":"-90","scale":"1","type":"'gun_rifle'","only_allow_for":"null","_visible":"1","_locked":"0","_disabled":"0"}
pb2Gun.CreateGun({ x: -170, y: -190, type: 'gun_rifle', only_allow_for: team0 });//->Ditto->//{"operation":"create","constructor":"pb2Gun.CreateGun","id":"","x":"-170","y":"-190","scale":"1","type":"'gun_rifle'","only_allow_for":"team0","_visible":"1","_locked":"0","_disabled":"0"}
pb2Gun.CreateGun({ x: -170, y: -90, type: 'gun_rifle', only_allow_for: team0 });//->Ditto->//{"operation":"create","constructor":"pb2Gun.CreateGun","id":"","x":"-170","y":"-90","scale":"1","type":"'gun_rifle'","only_allow_for":"team0","_visible":"1","_locked":"0","_disabled":"0"}
pb2Gun.CreateGun({ x: -70, y: -190, type: 'gun_rl' });//->Ditto->//{"operation":"create","constructor":"pb2Gun.CreateGun","id":"","x":"-70","y":"-190","scale":"1","type":"'gun_rl'","only_allow_for":"null","_visible":"1","_locked":"0","_disabled":"0"}
pb2Gun.CreateGun({ x: -70, y: -90, type: 'gun_railgun2', only_allow_for: team1 });//->Ditto->//{"operation":"create","constructor":"pb2Gun.CreateGun","id":"","x":"-70","y":"-90","scale":"1","type":"'gun_railgun2'","only_allow_for":"team1","_visible":"1","_locked":"0","_disabled":"0"}
pb2Gun.CreateGun({ x: 30, y: -190, type: 'gun_shotgun' });//->Ditto->//{"operation":"create","constructor":"pb2Gun.CreateGun","id":"","x":"30","y":"-190","scale":"1","type":"'gun_shotgun'","only_allow_for":"null","_visible":"1","_locked":"0","_disabled":"0"}
pb2Gun.CreateGun({ x: 30, y: -90, type: 'gun_rifle', only_allow_for: team1 });//->Ditto->//{"operation":"create","constructor":"pb2Gun.CreateGun","id":"","x":"30","y":"-90","scale":"1","type":"'gun_rifle'","only_allow_for":"team1","_visible":"1","_locked":"0","_disabled":"0"}
pb2Gun.CreateGun({ x: 130, y: -190, type: 'gun_rifle' });//->Ditto->//{"operation":"create","constructor":"pb2Gun.CreateGun","id":"","x":"130","y":"-190","scale":"1","type":"'gun_rifle'","only_allow_for":"null","_visible":"1","_locked":"0","_disabled":"0"}
pb2Gun.CreateGun({ x: 130, y: -90, type: 'gun_rifle' });//->Ditto->//{"operation":"create","constructor":"pb2Gun.CreateGun","id":"","x":"130","y":"-90","scale":"1","type":"'gun_rifle'","only_allow_for":"null","_visible":"1","_locked":"0","_disabled":"0"}
pb2Gun.CreateGun({ x: 230, y: -190, type: 'gun_rifle' });//->Ditto->//{"operation":"create","constructor":"pb2Gun.CreateGun","id":"","x":"230","y":"-190","scale":"1","type":"'gun_rifle'","only_allow_for":"null","_visible":"1","_locked":"0","_disabled":"0"}
pb2Gun.CreateGun({ x: 230, y: -90, type: 'gun_rifle' });//->Ditto->//{"operation":"create","constructor":"pb2Gun.CreateGun","id":"","x":"230","y":"-90","scale":"1","type":"'gun_rifle'","only_allow_for":"null","_visible":"1","_locked":"0","_disabled":"0"}
pb2Gun.CreateGun({ x: -70, y: -290, type: 'gun_vehcannon' });//->Ditto->//{"operation":"create","constructor":"pb2Gun.CreateGun","id":"","x":"-70","y":"-290","scale":"1","type":"'gun_vehcannon'","only_allow_for":"null","_visible":"1","_locked":"0","_disabled":"0"}
pb2Gun.CreateGun({ x: 30, y: -290, type: 'gun_defibrillator' });//->Ditto->//{"operation":"create","constructor":"pb2Gun.CreateGun","id":"","x":"30","y":"-290","scale":"1","type":"'gun_defibrillator'","only_allow_for":"null","_visible":"1","_locked":"0","_disabled":"0"}

/* 
    In PB3, character that has their current health less than their max health doesn't regenerate their health.

    This script damages all PB3 character that doesn't have max health with a value of 0, forcing health regeneration
    which imitates PB2 behavior.

    If this effect is not desired, you may remove the script.
*/
pb2Character.characters.filter(c=>c.hea!==c.hmax&&c.hea>0).forEach(c=>c.SubstractHealth(0));//->Ditto->//{"operation":"code","snippet_color":"0xb1b1ff","code":"\n/* \n    In PB3, character that has their current health less than their max health doesn't regenerate their health.\n\n    This script damages all PB3 character that doesn't have max health with a value of 0, forcing health regeneration\n    which imitates PB2 behavior.\n\n    If this effect is not desired, you may remove the script.\n*/\npb2Character.characters.filter(c=>c.hea!==c.hmax&&c.hea>0).forEach(c=>c.SubstractHealth(0));","x":"-250","y":"-340","_visible":"1","_locked":"0","_disabled":"0"}
(() => {
    /*
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
})();//->Ditto->//{"operation":"code","snippet_color":"0xb1b1ff","code":"(() => {\n    /*\n        This file is responsible for spawning grenades. This works by looking all any object that starts with 'gadget_spawn_point',\n        and parsing the name that contains the grenade's properties.\n\n        This method is required because there is no one object equivalent to a PB2 grenade in PB3. \n    */\n    function spawnGadget(model, p) {\n        let char = pb2Ragdoll.CreateRagdollComplete({ \n            x: p.x, \n            y: p.y, \n            scale: 0,\n            skin: pb2SkinEditor.SpawnDefaultSkin( 1 ), \n            team: pb2Team.teams[0] !== undefined ? pb2Team.teams[0] : pb2Team.CreateTeam({ \n                ai_in_team: false, \n                title: 'default team', \n                hud_color: new pb2HighRangeColor( 0x6a94ff ), \n                recolor_nicknames_on_overhead: true, \n                friendly_fire: true, \n                friendly_damage_multiplier: 1, \n                normal_damage_to_dead_teammates: true, \n                teammates_collide: true, \n                allow_private_communication: true, \n                overheads_visibility: pb2OverheadHUD.OVERHEAD_VISIBILITY_TEAMMATES_ONLY \n            }), \n            vision: pb2Vision.VISION_SCREEN_BOX, \n            style_boost: pb2StyleBoost.SELFBOOST, \n            style_swords: pb2StyleSwords.BASIC, \n            driver_of: null, \n            sword_projectile_reflection: false, \n            hmax: 0, \n            can_be_revived: false, \n            can_breathe_in_water: false, \n            can_breathe_in_toxic_clouds: false, \n            regen_module: pb2StyleRegen.style_delayed_speedup, \n            drop_guns_on_death: pb2Character.DROP_ALWAYS, \n            drop_grenades_on_death: pb2Character.DROP_ALWAYS, \n            enforce_skin_limitations: false, \n            use_skin_properties: false, \n            player_controllable: false, \n            ai_preset: null, \n            side: 1 \n        });\n        \n        char.owner_character.AddGrenades(model, 1);\n        char.remove();\n    }\n\n    pb2BulletDisposer.normal_time_to_live = Infinity; /* stops grenade despawn */\n\n    Object.entries(window)\n    .filter(([k, v]) => k.startsWith(\"gadget_spawn_point\"))\n    .map(([k, p]) => {\n        const i = k.indexOf(\"__\") + 2;\n        const model = pb2ArmsAction[\"ACTION_TYPE_THROW_GRENADE_\" + k.slice(i)];\n        if (model !== undefined) return [model, p];\n        return [pb2ArmsAction.ACTION_TYPE_THROW_GRENADE_HE, p];\n    })\n    .forEach(([m, p]) => spawnGadget(m, p));\n})();","x":"-200","y":"-340","_visible":"1","_locked":"0","_disabled":"0"}
pb2GameWorld.FinalizeWorld();}//->Ditto->//{"x":"0","y":"0","operation":"call_method","method":"pb2GameWorld.FinalizeWorld","argument_values":"","keep_at_the_bottom":"1","_visible":"0","_locked":"0","_disabled":"0"}