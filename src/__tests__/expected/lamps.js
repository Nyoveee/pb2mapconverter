//->Ditto->//{"operation":"define_global_vars"}
pb2GameWorld.DownloadModules( { user_data_uids_to_load: [ 183/*Eric Gurt's Basic trigger action presets*/ ], inline: true, success_callback: _pb2N } );function _pb2N(){//->Ditto->//{"id":"","operation":"create","constructor":"pb2GameWorld.DownloadModules","user_data_uids_to_load":"[ 183/*Eric Gurt's Basic trigger action presets*/ ]","execute_on_load":"true","inline":"true","success_callback":"null","error_callback":"null","x":"0","y":"0","_visible":"0","_locked":"0","_disabled":"0"}
pb2GameWorld.EnableSimplePlayerAssignmentLogic();//->Ditto->//{"x":"0","y":"0","operation":"call_method","method":"pb2GameWorld.EnableSimplePlayerAssignmentLogic","argument_values":"","keep_at_the_bottom":"0","_visible":"0","_locked":"0","_disabled":"0"}

/* 
    This script changes the current setting such that it closely resembles PB2 settings. 
    You may remove this script if desired.
*/
pb2GunDisposer.normal_time_to_live=Infinity;
pb2RagdollDisposer.normal_time_to_live=Infinity;
pb2Bullet.friction_wall=0.5;
//->Ditto->//{"operation":"code","snippet_color":"0xb1b1ff","code":"\n/* \n    This script changes the current setting such that it closely resembles PB2 settings. \n    You may remove this script if desired.\n*/\npb2GunDisposer.normal_time_to_live=Infinity;\npb2RagdollDisposer.normal_time_to_live=Infinity;\npb2Bullet.friction_wall=0.5;\n","x":"-80","y":"-130","_visible":"1","_locked":"0","_disabled":"0"}
pb2Light.CreateLight({ x: -80, y: -80, is_static: true, color: 0xffffff, power: 0.4, flare: true, blur: false, z: 0, scale: 3 });//->Ditto->//{"operation":"create","constructor":"pb2Light.CreateLight","id":"","x":"-80","y":"-80","is_static":"true","color":"0xffffff","power":"0.4","flare":"true","blur":"false","z":"0","scale":"3","attachment":"null","attachment_limb_id":"0","angular_range_from":"0 / 180 * Math.PI","angular_range_length":"360 / 180 * Math.PI","_visible":"1","_locked":"0","_disabled":"0"}
pb2Light.CreateLight({ x: 80, y: -80, is_static: true, color: 0xffffff, power: 0.4, flare: false, blur: false });//->Ditto->//{"operation":"create","constructor":"pb2Light.CreateLight","id":"","x":"80","y":"-80","is_static":"true","color":"0xffffff","power":"0.4","flare":"false","blur":"false","z":"0","scale":"3","attachment":"null","attachment_limb_id":"0","angular_range_from":"0 / 180 * Math.PI","angular_range_length":"360 / 180 * Math.PI","_visible":"1","_locked":"0","_disabled":"0"}
pb2Light.CreateLight({ x: -80, y: 80, is_static: true, color: 0xffffff, power: 1, flare: true, blur: false, z: 0, scale: 3 });//->Ditto->//{"operation":"create","constructor":"pb2Light.CreateLight","id":"","x":"-80","y":"80","is_static":"true","color":"0xffffff","power":"1","flare":"true","blur":"false","z":"0","scale":"3","attachment":"null","attachment_limb_id":"0","angular_range_from":"0 / 180 * Math.PI","angular_range_length":"360 / 180 * Math.PI","_visible":"1","_locked":"0","_disabled":"0"}
pb2Light.CreateLight({ x: 80, y: 80, is_static: true, color: 0xffffff, power: 1, flare: false, blur: false });//->Ditto->//{"operation":"create","constructor":"pb2Light.CreateLight","id":"","x":"80","y":"80","is_static":"true","color":"0xffffff","power":"1","flare":"false","blur":"false","z":"0","scale":"3","attachment":"null","attachment_limb_id":"0","angular_range_from":"0 / 180 * Math.PI","angular_range_length":"360 / 180 * Math.PI","_visible":"1","_locked":"0","_disabled":"0"}

/* 
    In PB3, character that has their current health less than their max health doesn't regenerate their health.

    This script damages all PB3 character that doesn't have max health with a value of 0, forcing health regeneration
    which imitates PB2 behavior.

    If this effect is not desired, you may remove the script.
*/
pb2Character.characters.filter(c=>c.hea!==c.hmax&&c.hea>0).forEach(c=>c.SubstractHealth(0));//->Ditto->//{"operation":"code","snippet_color":"0xb1b1ff","code":"\n/* \n    In PB3, character that has their current health less than their max health doesn't regenerate their health.\n\n    This script damages all PB3 character that doesn't have max health with a value of 0, forcing health regeneration\n    which imitates PB2 behavior.\n\n    If this effect is not desired, you may remove the script.\n*/\npb2Character.characters.filter(c=>c.hea!==c.hmax&&c.hea>0).forEach(c=>c.SubstractHealth(0));","x":"-30","y":"-130","_visible":"1","_locked":"0","_disabled":"0"}
pb2GameWorld.FinalizeWorld();}//->Ditto->//{"x":"0","y":"0","operation":"call_method","method":"pb2GameWorld.FinalizeWorld","argument_values":"","keep_at_the_bottom":"1","_visible":"0","_locked":"0","_disabled":"0"}