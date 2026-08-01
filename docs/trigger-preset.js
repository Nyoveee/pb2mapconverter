globalThis.ApplyRegionDamage_PB2Preset=()=>_pb2TU('globalThis.ApplyRegionDamage_PB2Preset');globalThis.MoveRegionToMovable_PB2Preset=()=>_pb2TU('globalThis.MoveRegionToMovable_PB2Preset');globalThis.MoveRegionToRegion_PB2Preset=()=>_pb2TU('globalThis.MoveRegionToRegion_PB2Preset');globalThis.DamageInRegion_PB2Preset=()=>_pb2TU('globalThis.DamageInRegion_PB2Preset');globalThis.KillAllCharactersInRegion_PB2Preset=()=>_pb2TU('globalThis.KillAllCharactersInRegion_PB2Preset');globalThis.DestroyAllEntitiesInRegion_PB2Preset=()=>_pb2TU('globalThis.DestroyAllEntitiesInRegion_PB2Preset');globalThis.MoveCharacterToPositionIfAlive_PB2Preset=()=>_pb2TU('globalThis.MoveCharacterToPositionIfAlive_PB2Preset');globalThis.MoveGunToRegion_PB2Preset=()=>_pb2TU('globalThis.MoveGunToRegion_PB2Preset');globalThis.MakeExplosion_PB2Preset=()=>_pb2TU('globalThis.MakeExplosion_PB2Preset');globalThis.TeleportAllPlayers_PB2Preset=()=>_pb2TU('globalThis.TeleportAllPlayers_PB2Preset');globalThis.MoveRegionToPosition_PB2Preset=()=>_pb2TU('globalThis.MoveRegionToPosition_PB2Preset');globalThis.MoveRegionByOffset_PB2Preset=()=>_pb2TU('globalThis.MoveRegionByOffset_PB2Preset');globalThis.ActivateTimer_PB2Preset=()=>_pb2TU('globalThis.ActivateTimer_PB2Preset');globalThis.DeactivateTimer_PB2Preset=()=>_pb2TU('globalThis.DeactivateTimer_PB2Preset');globalThis.DeactivateTimer_PB2Preset2=()=>_pb2TU('globalThis.DeactivateTimer_PB2Preset2');globalThis.DeactivateTimer_PB2Preset3=()=>_pb2TU('globalThis.DeactivateTimer_PB2Preset3');globalThis.ActivateTimer_PB2Preset2=()=>_pb2TU('globalThis.ActivateTimer_PB2Preset2');globalThis.SendChatWithSpeaker_PB2Preset=()=>_pb2TU('globalThis.SendChatWithSpeaker_PB2Preset');globalThis.SendChat_PB2Preset=()=>_pb2TU('globalThis.SendChat_PB2Preset');globalThis.SetCharacterHealth_PB2Preset=()=>_pb2TU('globalThis.SetCharacterHealth_PB2Preset');globalThis.HealChracter_PB2Preset=()=>_pb2TU('globalThis.HealChracter_PB2Preset');globalThis.MoveEntityToPosition_PB2Preset=()=>_pb2TU('globalThis.MoveEntityToPosition_PB2Preset');globalThis.ActivateTrigger_PB2Preset=()=>_pb2TU('globalThis.ActivateTrigger_PB2Preset');globalThis.DeactivateTrigger_PB2Preset=()=>_pb2TU('globalThis.DeactivateTrigger_PB2Preset');globalThis.SetTriggerMaxCalls_PB2Preset=()=>_pb2TU('globalThis.SetTriggerMaxCalls_PB2Preset');globalThis.ExecuteTrigger_PB2Preset=()=>_pb2TU('globalThis.ExecuteTrigger_PB2Preset');globalThis.SetGameFPS_PB2Preset=()=>_pb2TU('globalThis.SetGameFPS_PB2Preset');//->Ditto->//{"operation":"define_global_vars"}
// Contains useful utility function definition (should I extract it out to a separate module?)//->Ditto->//{"operation":"comment","comment":"Contains useful utility function definition (should I extract it out to a separate module?)","x":"20","y":"-180","_visible":"1","_locked":"0","_disabled":"0"}
/**
 * Checks if a coordinate set falls within a rectangle's boundaries.
 * 
 * @param {Object} point - Any object containing coordinate properties.
 * @param {number} point.x - The X coordinate.
 * @param {number} point.y - The Y coordinate.
 * @param {Object} rect - Any object containing rectangular dimensions.
 * @param {number} rect.x - The X coordinate of the top left origin corner.
 * @param {number} rect.y - The Y coordinate of the top left origin corner.
 * @param {number} rect.maxx - The X coordinate of the bottom right boundary.
 * @param {number} rect.maxy - The Y coordinate of the bottom right boundary.
 * @returns {boolean} True if the point is within the rectangle, otherwise false.
*/
const isPointInRect = (point, rect) => {
    return point.x >= rect.x &&
           point.x <= rect.maxx &&
           point.y >= rect.y &&
           point.y <= rect.maxy;
};

/**
 * Gets the center position of a given region.
 * 
 * @param {pb2Region} region - PB2 Region to get the center position from.
 * @returns {Object} Center position of the given object.
*/
const getRegionCenter = (region) => {
	return {
		x: ( region.minx + region.maxx ) / 2,
		y: ( region.miny + region.maxy ) / 2,
	};
};

/**
 * Helper function that gets the center position of a given point or region.
 * This concept of using a positional object of either a region or a point 
 * will be used often to denote an actual position.
 * 
 * @param {pb2Region|pb2Object} positionObject - Either a PB2 region or some PB2 object (like point).
 * @returns {Object} Center position of the given object.
*/
const getCenterPosition = (positionObject) => {
	if (positionObject.classid === pb2ClassID.REGION) {
		return getRegionCenter(positionObject);
	}
	else {
		return {
			x: positionObject.x,
			y: positionObject.y,
		};
	}
};
//->Ditto->//{"operation":"code","snippet_color":"0xb1b1ff","code":"/**\n * Checks if a coordinate set falls within a rectangle's boundaries.\n * \n * @param {Object} point - Any object containing coordinate properties.\n * @param {number} point.x - The X coordinate.\n * @param {number} point.y - The Y coordinate.\n * @param {Object} rect - Any object containing rectangular dimensions.\n * @param {number} rect.x - The X coordinate of the top left origin corner.\n * @param {number} rect.y - The Y coordinate of the top left origin corner.\n * @param {number} rect.maxx - The X coordinate of the bottom right boundary.\n * @param {number} rect.maxy - The Y coordinate of the bottom right boundary.\n * @returns {boolean} True if the point is within the rectangle, otherwise false.\n*/\nconst isPointInRect = (point, rect) => {\n    return point.x >= rect.x &&\n           point.x <= rect.maxx &&\n           point.y >= rect.y &&\n           point.y <= rect.maxy;\n};\n\n/**\n * Gets the center position of a given region.\n * \n * @param {pb2Region} region - PB2 Region to get the center position from.\n * @returns {Object} Center position of the given object.\n*/\nconst getRegionCenter = (region) => {\n\treturn {\n\t\tx: ( region.minx + region.maxx ) / 2,\n\t\ty: ( region.miny + region.maxy ) / 2,\n\t};\n};\n\n/**\n * Helper function that gets the center position of a given point or region.\n * This concept of using a positional object of either a region or a point \n * will be used often to denote an actual position.\n * \n * @param {pb2Region|pb2Object} positionObject - Either a PB2 region or some PB2 object (like point).\n * @returns {Object} Center position of the given object.\n*/\nconst getCenterPosition = (positionObject) => {\n\tif (positionObject.classid === pb2ClassID.REGION) {\n\t\treturn getRegionCenter(positionObject);\n\t}\n\telse {\n\t\treturn {\n\t\t\tx: positionObject.x,\n\t\t\ty: positionObject.y,\n\t\t};\n\t}\n};\n","x":"20","y":"-130","_visible":"1","_locked":"0","_disabled":"0"}
// Comment before trigger describes trigger action, comments inside describe each parameter in format: CAPTION :: DEFAULT_VALUE :: PARAM_PANEL_PARAMETER_TYPE//->Ditto->//{"operation":"comment","comment":"Comment before trigger describes trigger action, comments inside describe each parameter in format: CAPTION :: DEFAULT_VALUE :: PARAM_PANEL_PARAMETER_TYPE","x":"20","y":"-80","_visible":"1","_locked":"0","_disabled":"0"}
// Every function name ends with suffix _PB2Preset for namespacing purposes.//->Ditto->//{"operation":"comment","comment":"Every function name ends with suffix _PB2Preset for namespacing purposes.","x":"20","y":"-30","_visible":"1","_locked":"0","_disabled":"0"}
// Apply region damage to rigid body 'A' (to be executed by region)//->Ditto->//{"operation":"comment","comment":"Apply region damage to rigid body 'A' (to be executed by region)","x":"20","y":"120","_visible":"1","_locked":"0","_disabled":"0"}
globalThis.ApplyRegionDamage_PB2Preset = ( rigid_body, damage, GSPEED )=>//->Ditto->//{"operation":"layer_definition","id":"globalThis.ApplyRegionDamage_PB2Preset","availability":"global","arguments":"rigid_body, damage, GSPEED","is_open":true,"close_when_possible":false,"enabled":"1","max_calls":"Infinity","auto_spawn":"0","auto_spawn_arguments":"","fail_call_callback":"null","fail_call_callback_same_arguments":"1","children_properties_to_rewrite":"","x":"20","y":"170","_visible":"1","_locked":"0","_disabled":"0","_test_call":"TestExec","_test_call_argument_values":""}
{//->Ditto->//{"operation":"open_layer_bracket"}
// Body (name of the first trigger argument) :: rigid_body :: string//->Ditto->//{"operation":"comment","comment":"Body (name of the first trigger argument) :: rigid_body :: string","x":"20","y":"220","_visible":"1","_locked":"0","_disabled":"0"}
// Damage :: 0 :: number//->Ditto->//{"operation":"comment","comment":"Damage :: 0 :: number","x":"20","y":"270","_visible":"1","_locked":"0","_disabled":"0"}
// GSPEED :: GSPEED :: one of GSPEED//->Ditto->//{"operation":"comment","comment":"GSPEED :: GSPEED :: one of GSPEED","x":"20","y":"320","_visible":"1","_locked":"0","_disabled":"0"}
/*
	Apply region damage to rigid body 'A' 
	(like PB2 pusher damage, however -ve values don't do slicing damage)
*/

if (damage === 0) {
	return;
}

// We attempt to retrieve player from rigid_body..
// rigid_body is an argument implicitly passed as the 1st parameter by region
// representing the object that entered an area..

const mass = rigid_body.GetMass();
const ragdoll = rigid_body.GetOwner();

if ( !ragdoll ) {
	return;
}

const character = ragdoll.owner_character;
    
if ( !character ) {
	return;
}

character.SubstractHealth(damage * GSPEED);//->Ditto->//{"operation":"code","snippet_color":"0xb1b1ff","code":"/*\n\tApply region damage to rigid body 'A' \n\t(like PB2 pusher damage, however -ve values don't do slicing damage)\n*/\n\nif (damage === 0) {\n\treturn;\n}\n\n// We attempt to retrieve player from rigid_body..\n// rigid_body is an argument implicitly passed as the 1st parameter by region\n// representing the object that entered an area..\n\nconst mass = rigid_body.GetMass();\nconst ragdoll = rigid_body.GetOwner();\n\nif ( !ragdoll ) {\n\treturn;\n}\n\nconst character = ragdoll.owner_character;\n    \nif ( !character ) {\n\treturn;\n}\n\ncharacter.SubstractHealth(damage * GSPEED);","x":"20","y":"370","_visible":"1","_locked":"0","_disabled":"0"}
};globalThis.ApplyRegionDamage_PB2Preset=_pb2T(globalThis.ApplyRegionDamage_PB2Preset,1,Infinity,null,1);//->Ditto->//{"operation":"close_layer_bracket"}
// Move Region 'A' to Movable 'B'//->Ditto->//{"operation":"comment","comment":"Move Region 'A' to Movable 'B'","x":"20","y":"520","_visible":"1","_locked":"0","_disabled":"0"}
globalThis.MoveRegionToMovable_PB2Preset = ( region, movable )=>//->Ditto->//{"operation":"layer_definition","id":"globalThis.MoveRegionToMovable_PB2Preset","availability":"global","arguments":"region, movable","is_open":true,"close_when_possible":false,"enabled":"1","max_calls":"Infinity","auto_spawn":"0","auto_spawn_arguments":"","fail_call_callback":"null","fail_call_callback_same_arguments":"1","children_properties_to_rewrite":"","x":"20","y":"570","_visible":"1","_locked":"0","_disabled":"0","_test_call":"TestExec","_test_call_argument_values":""}
{//->Ditto->//{"operation":"open_layer_bracket"}
// Region :: null :: &constructor=pb2GameWorld.CreateBoxShape,type=pb2Shape.REGION//->Ditto->//{"operation":"comment","comment":"Region :: null :: &constructor=pb2GameWorld.CreateBoxShape,type=pb2Shape.REGION","x":"20","y":"620","_visible":"1","_locked":"0","_disabled":"0"}
// Movable :: null :: &constructor=pb2GameWorld.CreateBoxShape,type=pb2Shape.MOVABLE//->Ditto->//{"operation":"comment","comment":"Movable :: null :: &constructor=pb2GameWorld.CreateBoxShape,type=pb2Shape.MOVABLE","x":"20","y":"670","_visible":"1","_locked":"0","_disabled":"0"}
region.SetPosition(movable.x, movable.y);//->Ditto->//{"operation":"code","snippet_color":"0xb1b1ff","code":"region.SetPosition(movable.x, movable.y);","x":"20","y":"720","_visible":"1","_locked":"0","_disabled":"0"}
};globalThis.MoveRegionToMovable_PB2Preset=_pb2T(globalThis.MoveRegionToMovable_PB2Preset,1,Infinity,null,1);//->Ditto->//{"operation":"close_layer_bracket"}
// Move Region 'A' to Region 'B'//->Ditto->//{"operation":"comment","comment":"Move Region 'A' to Region 'B'","x":"20","y":"820","_visible":"1","_locked":"0","_disabled":"0"}
globalThis.MoveRegionToRegion_PB2Preset = ( regionA, regionB )=>//->Ditto->//{"operation":"layer_definition","id":"globalThis.MoveRegionToRegion_PB2Preset","availability":"global","arguments":"regionA, regionB","is_open":true,"close_when_possible":false,"enabled":"1","max_calls":"Infinity","auto_spawn":"0","auto_spawn_arguments":"","fail_call_callback":"null","fail_call_callback_same_arguments":"1","children_properties_to_rewrite":"","x":"20","y":"870","_visible":"1","_locked":"0","_disabled":"0","_test_call":"TestExec","_test_call_argument_values":""}
{//->Ditto->//{"operation":"open_layer_bracket"}
// RegionA :: null :: &constructor=pb2GameWorld.CreateBoxShape,type=pb2Shape.REGION//->Ditto->//{"operation":"comment","comment":"RegionA :: null :: &constructor=pb2GameWorld.CreateBoxShape,type=pb2Shape.REGION","x":"20","y":"920","_visible":"1","_locked":"0","_disabled":"0"}
// RegionB :: null :: &constructor=pb2GameWorld.CreateBoxShape,type=pb2Shape.REGION//->Ditto->//{"operation":"comment","comment":"RegionB :: null :: &constructor=pb2GameWorld.CreateBoxShape,type=pb2Shape.REGION","x":"20","y":"970","_visible":"1","_locked":"0","_disabled":"0"}
regionA.SetPosition(regionB.x, regionB.y);//->Ditto->//{"operation":"code","snippet_color":"0xb1b1ff","code":"regionA.SetPosition(regionB.x, regionB.y);","x":"20","y":"1020","_visible":"1","_locked":"0","_disabled":"0"}
};globalThis.MoveRegionToRegion_PB2Preset=_pb2T(globalThis.MoveRegionToRegion_PB2Preset,1,Infinity,null,1);//->Ditto->//{"operation":"close_layer_bracket"}
// Damage all entities in Region 'A' with damage 'B'//->Ditto->//{"operation":"comment","comment":"Damage all entities in Region 'A' with damage 'B'","x":"20","y":"1120","_visible":"1","_locked":"0","_disabled":"0"}
globalThis.DamageInRegion_PB2Preset = ( region, damage )=>//->Ditto->//{"operation":"layer_definition","id":"globalThis.DamageInRegion_PB2Preset","availability":"global","arguments":"region, damage","is_open":true,"close_when_possible":false,"enabled":"1","max_calls":"Infinity","auto_spawn":"0","auto_spawn_arguments":"","fail_call_callback":"null","fail_call_callback_same_arguments":"1","children_properties_to_rewrite":"","x":"20","y":"1170","_visible":"1","_locked":"0","_disabled":"0","_test_call":"TestExec","_test_call_argument_values":""}
{//->Ditto->//{"operation":"open_layer_bracket"}
// Region :: null :: &constructor=pb2GameWorld.CreateBoxShape,type=pb2Shape.REGION//->Ditto->//{"operation":"comment","comment":"Region :: null :: &constructor=pb2GameWorld.CreateBoxShape,type=pb2Shape.REGION","x":"20","y":"1220","_visible":"1","_locked":"0","_disabled":"0"}
// Damage :: 0 :: number//->Ditto->//{"operation":"comment","comment":"Damage :: 0 :: number","x":"20","y":"1270","_visible":"1","_locked":"0","_disabled":"0"}
// We iterate through all characters, finding out
// their points lie within the bounding box of the specified region.
for (const character of pb2Character.characters) {
	if (!isPointInRect(character, region)) {
		continue;	
	}
	
	character.SubstractHealth(damage);
}//->Ditto->//{"operation":"code","snippet_color":"0x004045","code":"// We iterate through all characters, finding out\n// their points lie within the bounding box of the specified region.\nfor (const character of pb2Character.characters) {\n\tif (!isPointInRect(character, region)) {\n\t\tcontinue;\t\n\t}\n\t\n\tcharacter.SubstractHealth(damage);\n}","x":"20","y":"1320","_visible":"1","_locked":"0","_disabled":"0"}
};globalThis.DamageInRegion_PB2Preset=_pb2T(globalThis.DamageInRegion_PB2Preset,1,Infinity,null,1);//->Ditto->//{"operation":"close_layer_bracket"}
// Kill all Characters at Region 'A' which are not allied to Character 'B'//->Ditto->//{"operation":"comment","comment":"Kill all Characters at Region 'A' which are not allied to Character 'B'","x":"20","y":"1420","_visible":"1","_locked":"0","_disabled":"0"}
globalThis.KillAllCharactersInRegion_PB2Preset = (  region, characterToCompareWith )=>//->Ditto->//{"operation":"layer_definition","id":"globalThis.KillAllCharactersInRegion_PB2Preset","availability":"global","arguments":" region, characterToCompareWith","is_open":true,"close_when_possible":false,"enabled":"1","max_calls":"Infinity","auto_spawn":"0","auto_spawn_arguments":"","fail_call_callback":"null","fail_call_callback_same_arguments":"1","children_properties_to_rewrite":"","x":"20","y":"1470","_visible":"1","_locked":"0","_disabled":"0","_test_call":"TestExec","_test_call_argument_values":""}
{//->Ditto->//{"operation":"open_layer_bracket"}
// Region :: null :: &constructor=pb2GameWorld.CreateBoxShape,type=pb2Shape.REGION//->Ditto->//{"operation":"comment","comment":"Region :: null :: &constructor=pb2GameWorld.CreateBoxShape,type=pb2Shape.REGION","x":"20","y":"1570","_visible":"1","_locked":"0","_disabled":"0"}
// Character :: null :: &constructor=pb2Ragdoll.CreateRagdollComplete//->Ditto->//{"operation":"comment","comment":"Character :: null :: &constructor=pb2Ragdoll.CreateRagdollComplete","x":"20","y":"1520","_visible":"1","_locked":"0","_disabled":"0"}
// We iterate through all characters, finding out
// their points lie within the bounding box of the specified region.
for (const character of pb2Character.characters) {
	if (!isPointInRect(character, region)) {
		continue;	
	}
	
	// We then verify if this character is allied to our
	// compared character in question.
	if (characterToCompareWith.team === character.ragdoll.team) {
		continue;
	}
	
	character.SubstractHealth(character.hea);
}//->Ditto->//{"operation":"code","snippet_color":"0x004045","code":"// We iterate through all characters, finding out\n// their points lie within the bounding box of the specified region.\nfor (const character of pb2Character.characters) {\n\tif (!isPointInRect(character, region)) {\n\t\tcontinue;\t\n\t}\n\t\n\t// We then verify if this character is allied to our\n\t// compared character in question.\n\tif (characterToCompareWith.team === character.ragdoll.team) {\n\t\tcontinue;\n\t}\n\t\n\tcharacter.SubstractHealth(character.hea);\n}","x":"20","y":"1620","_visible":"1","_locked":"0","_disabled":"0"}
};globalThis.KillAllCharactersInRegion_PB2Preset=_pb2T(globalThis.KillAllCharactersInRegion_PB2Preset,1,Infinity,null,1);//->Ditto->//{"operation":"close_layer_bracket"}
// Destroy all vehicles in Region 'A'//->Ditto->//{"operation":"comment","comment":"Destroy all vehicles in Region 'A'","x":"20","y":"1720","_visible":"1","_locked":"0","_disabled":"0"}
globalThis.DestroyAllEntitiesInRegion_PB2Preset = ( region )=>//->Ditto->//{"operation":"layer_definition","id":"globalThis.DestroyAllEntitiesInRegion_PB2Preset","availability":"global","arguments":"region","is_open":true,"close_when_possible":false,"enabled":"1","max_calls":"Infinity","auto_spawn":"0","auto_spawn_arguments":"","fail_call_callback":"null","fail_call_callback_same_arguments":"1","children_properties_to_rewrite":"","x":"20","y":"1770","_visible":"1","_locked":"0","_disabled":"0","_test_call":"TestExec","_test_call_argument_values":""}
{//->Ditto->//{"operation":"open_layer_bracket"}
// Region :: null :: &constructor=pb2GameWorld.CreateBoxShape,type=pb2Shape.REGION//->Ditto->//{"operation":"comment","comment":"Region :: null :: &constructor=pb2GameWorld.CreateBoxShape,type=pb2Shape.REGION","x":"20","y":"1820","_visible":"1","_locked":"0","_disabled":"0"}
// We iterate through all entities, finding out if
// their points lie within the bounding box of the specified region.
for (const entity of pb2Entity.entities) {
	if (!isPointInRect(entity, region)) {
		continue;	
	}
	
	entity.hea -= entity.hea;
}//->Ditto->//{"operation":"code","snippet_color":"0x004045","code":"// We iterate through all entities, finding out if\n// their points lie within the bounding box of the specified region.\nfor (const entity of pb2Entity.entities) {\n\tif (!isPointInRect(entity, region)) {\n\t\tcontinue;\t\n\t}\n\t\n\tentity.hea -= entity.hea;\n}","x":"20","y":"1870","_visible":"1","_locked":"0","_disabled":"0"}
};globalThis.DestroyAllEntitiesInRegion_PB2Preset=_pb2T(globalThis.DestroyAllEntitiesInRegion_PB2Preset,1,Infinity,null,1);//->Ditto->//{"operation":"close_layer_bracket"}
// Move Character 'A' to Position 'B' if Character is alive//->Ditto->//{"operation":"comment","comment":"Move Character 'A' to Position 'B' if Character is alive","x":"20","y":"2020","_visible":"1","_locked":"0","_disabled":"0"}
globalThis.MoveCharacterToPositionIfAlive_PB2Preset = ( character, position )=>//->Ditto->//{"operation":"layer_definition","id":"globalThis.MoveCharacterToPositionIfAlive_PB2Preset","availability":"global","arguments":"character, position","is_open":true,"close_when_possible":false,"enabled":"1","max_calls":"Infinity","auto_spawn":"0","auto_spawn_arguments":"","fail_call_callback":"null","fail_call_callback_same_arguments":"1","children_properties_to_rewrite":"","x":"20","y":"2070","_visible":"1","_locked":"0","_disabled":"0","_test_call":"TestExec","_test_call_argument_values":""}
{//->Ditto->//{"operation":"open_layer_bracket"}
// Character :: null :: &constructor=pb2Ragdoll.CreateRagdollComplete//->Ditto->//{"operation":"comment","comment":"Character :: null :: &constructor=pb2Ragdoll.CreateRagdollComplete","x":"20","y":"2120","_visible":"1","_locked":"0","_disabled":"0"}
// Position (Region / Point) :: null :: &constructor=pb2GameWorld.CreateBoxShape,type=pb2Shape.REGION||new Point//->Ditto->//{"operation":"comment","comment":"Position (Region / Point) :: null :: &constructor=pb2GameWorld.CreateBoxShape,type=pb2Shape.REGION||new Point","x":"20","y":"2160","_visible":"1","_locked":"0","_disabled":"0"}
// dead...
if (character.owner_character?.hea <= 0) {
	return;
}

// We calculate the difference in position (this is required for calling the teleport function 
const dx = 
	position.classid === pb2ClassID.REGION ? 
			( position.minx + position.maxx ) / 2 - character.x 
		:	position.x - character.x
;

const dy = 
	position.classid === pb2ClassID.REGION ? 
			( position.miny + position.maxy ) / 2 - character.y 
		:	position.y - character.y
;

if (isNaN(dx) || isNaN(dy)) {
	return;
}

character.Teleport( 
	dx, 
	dy, 
	0,	// dvx, delta x velocity 
	0,	// dvu, delta y velocity 
	character.GetAtom( pb2Ragdoll.b_pelvis ), // probably root atom (pelvis)
	false,	// force splitting of atoms?
	null	// custom particle effect.. if null uses the default teleport vfx.
);//->Ditto->//{"operation":"code","snippet_color":"0x004045","code":"// dead...\nif (character.owner_character?.hea <= 0) {\n\treturn;\n}\n\n// We calculate the difference in position (this is required for calling the teleport function \nconst dx = \n\tposition.classid === pb2ClassID.REGION ? \n\t\t\t( position.minx + position.maxx ) / 2 - character.x \n\t\t:\tposition.x - character.x\n;\n\nconst dy = \n\tposition.classid === pb2ClassID.REGION ? \n\t\t\t( position.miny + position.maxy ) / 2 - character.y \n\t\t:\tposition.y - character.y\n;\n\nif (isNaN(dx) || isNaN(dy)) {\n\treturn;\n}\n\ncharacter.Teleport( \n\tdx, \n\tdy, \n\t0,\t// dvx, delta x velocity \n\t0,\t// dvu, delta y velocity \n\tcharacter.GetAtom( pb2Ragdoll.b_pelvis ), // probably root atom (pelvis)\n\tfalse,\t// force splitting of atoms?\n\tnull\t// custom particle effect.. if null uses the default teleport vfx.\n);","x":"20","y":"2210","_visible":"1","_locked":"0","_disabled":"0"}
};globalThis.MoveCharacterToPositionIfAlive_PB2Preset=_pb2T(globalThis.MoveCharacterToPositionIfAlive_PB2Preset,1,Infinity,null,1);//->Ditto->//{"operation":"close_layer_bracket"}
// Move Gun 'A' to Position 'B'//->Ditto->//{"operation":"comment","comment":"Move Gun 'A' to Position 'B'","x":"20","y":"2320","_visible":"1","_locked":"0","_disabled":"0"}
globalThis.MoveGunToRegion_PB2Preset = ( gun, positionObject )=>//->Ditto->//{"operation":"layer_definition","id":"globalThis.MoveGunToRegion_PB2Preset","availability":"global","arguments":"gun, positionObject","is_open":true,"close_when_possible":false,"enabled":"1","max_calls":"Infinity","auto_spawn":"0","auto_spawn_arguments":"","fail_call_callback":"null","fail_call_callback_same_arguments":"1","children_properties_to_rewrite":"","x":"20","y":"2370","_visible":"1","_locked":"0","_disabled":"0","_test_call":"TestExec","_test_call_argument_values":""}
{//->Ditto->//{"operation":"open_layer_bracket"}
// Gun :: null :: &constructor=pb2Gun.CreateGun//->Ditto->//{"operation":"comment","comment":"Gun :: null :: &constructor=pb2Gun.CreateGun","x":"20","y":"2420","_visible":"1","_locked":"0","_disabled":"0"}
// Position (Region / Point) :: null :: &constructor=pb2GameWorld.CreateBoxShape,type=pb2Shape.REGION||new Point//->Ditto->//{"operation":"comment","comment":"Position (Region / Point) :: null :: &constructor=pb2GameWorld.CreateBoxShape,type=pb2Shape.REGION||new Point","x":"20","y":"2460","_visible":"1","_locked":"0","_disabled":"0"}
const position = getCenterPosition(positionObject);
gun.x = position.x;
gun.y = position.y;//->Ditto->//{"operation":"code","snippet_color":"0x004045","code":"const position = getCenterPosition(positionObject);\ngun.x = position.x;\ngun.y = position.y;","x":"20","y":"2510","_visible":"1","_locked":"0","_disabled":"0"}
};globalThis.MoveGunToRegion_PB2Preset=_pb2T(globalThis.MoveGunToRegion_PB2Preset,1,Infinity,null,1);//->Ditto->//{"operation":"close_layer_bracket"}
// Make an explosion with power 'A' at Position 'B' (simple variant that accepts region)//->Ditto->//{"operation":"comment","comment":"Make an explosion with power 'A' at Position 'B' (simple variant that accepts region)","x":"20","y":"2620","_visible":"1","_locked":"0","_disabled":"0"}
globalThis.MakeExplosion_PB2Preset = ( power, positionObject )=>//->Ditto->//{"operation":"layer_definition","id":"globalThis.MakeExplosion_PB2Preset","availability":"global","arguments":"power, positionObject","is_open":true,"close_when_possible":false,"enabled":"1","max_calls":"Infinity","auto_spawn":"0","auto_spawn_arguments":"","fail_call_callback":"null","fail_call_callback_same_arguments":"1","children_properties_to_rewrite":"","x":"20","y":"2670","_visible":"1","_locked":"0","_disabled":"0","_test_call":"TestExec","_test_call_argument_values":""}
{//->Ditto->//{"operation":"open_layer_bracket"}
// Power :: 50 :: number//->Ditto->//{"operation":"comment","comment":"Power :: 50 :: number","x":"20","y":"2720","_visible":"1","_locked":"0","_disabled":"0"}
// Position (Region / Point) :: null :: &constructor=pb2GameWorld.CreateBoxShape,type=pb2Shape.REGION||new Point//->Ditto->//{"operation":"comment","comment":"Position (Region / Point) :: null :: &constructor=pb2GameWorld.CreateBoxShape,type=pb2Shape.REGION||new Point","x":"20","y":"2760","_visible":"1","_locked":"0","_disabled":"0"}
const position = getCenterPosition(positionObject);

pb2Explosion.MakeExplosion({
	x: position.x,
	y: position.y,
	z: 0,						// z offset
	self_damage: true,			// this is true in PB2
	damage: power / 50,
	stability_damage_scale: power / 50,
	radius: power * 5,
	color: new pb2HighRangeColor( 0xff9955 ),
	color2: new pb2HighRangeColor( 0x000000 ),
	sprite: true,
	damaging_hash: pb2FloatingText.GetNewHash(),
	owner_ragdoll: null,
	source_bullet: null,
	fire_duration: 0,
	fire_spreads: false,
	fire_radius: 'false',
	fire_type: null,
	meltdown: false,
	sound: pb2Explosion.EXPLOSION_BASIC,
	hp_damage_multiplier: 1
});//->Ditto->//{"operation":"code","snippet_color":"0x004045","code":"const position = getCenterPosition(positionObject);\n\npb2Explosion.MakeExplosion({\n\tx: position.x,\n\ty: position.y,\n\tz: 0,\t\t\t\t\t\t// z offset\n\tself_damage: true,\t\t\t// this is true in PB2\n\tdamage: power / 50,\n\tstability_damage_scale: power / 50,\n\tradius: power * 5,\n\tcolor: new pb2HighRangeColor( 0xff9955 ),\n\tcolor2: new pb2HighRangeColor( 0x000000 ),\n\tsprite: true,\n\tdamaging_hash: pb2FloatingText.GetNewHash(),\n\towner_ragdoll: null,\n\tsource_bullet: null,\n\tfire_duration: 0,\n\tfire_spreads: false,\n\tfire_radius: 'false',\n\tfire_type: null,\n\tmeltdown: false,\n\tsound: pb2Explosion.EXPLOSION_BASIC,\n\thp_damage_multiplier: 1\n});","x":"20","y":"2810","_visible":"1","_locked":"0","_disabled":"0"}
};globalThis.MakeExplosion_PB2Preset=_pb2T(globalThis.MakeExplosion_PB2Preset,1,Infinity,null,1);//->Ditto->//{"operation":"close_layer_bracket"}
// Teleport all players from Region 'A' to Position 'B'//->Ditto->//{"operation":"comment","comment":"Teleport all players from Region 'A' to Position 'B'","x":"20","y":"2920","_visible":"1","_locked":"0","_disabled":"0"}
globalThis.TeleportAllPlayers_PB2Preset = ( region, positionObject )=>//->Ditto->//{"operation":"layer_definition","id":"globalThis.TeleportAllPlayers_PB2Preset","availability":"global","arguments":"region, positionObject","is_open":true,"close_when_possible":false,"enabled":"1","max_calls":"Infinity","auto_spawn":"0","auto_spawn_arguments":"","fail_call_callback":"null","fail_call_callback_same_arguments":"1","children_properties_to_rewrite":"","x":"20","y":"2970","_visible":"1","_locked":"0","_disabled":"0","_test_call":"TestExec","_test_call_argument_values":""}
{//->Ditto->//{"operation":"open_layer_bracket"}
// Region :: null :: &constructor=pb2GameWorld.CreateBoxShape,type=pb2Shape.REGION//->Ditto->//{"operation":"comment","comment":"Region :: null :: &constructor=pb2GameWorld.CreateBoxShape,type=pb2Shape.REGION","x":"20","y":"3020","_visible":"1","_locked":"0","_disabled":"0"}
// Position (Region / Point) :: null :: &constructor=pb2GameWorld.CreateBoxShape,type=pb2Shape.REGION||new Point//->Ditto->//{"operation":"comment","comment":"Position (Region / Point) :: null :: &constructor=pb2GameWorld.CreateBoxShape,type=pb2Shape.REGION||new Point","x":"20","y":"3060","_visible":"1","_locked":"0","_disabled":"0"}
// We iterate through all characters, finding out
// their points lie within the bounding box of the specified region.
for (const character of pb2Character.characters) {
	if (!isPointInRect(character, region)) {
		continue;	
	}
	
	const position = getCenterPosition(positionObject);
	
	character.ragdoll.Teleport( 
		position.x - character.x,						// dx, delta x, difference in x position
		position.y - character.y,						// dy, delta y, difference in y position
		0,												// dvx, delta x velocity 
		0,												// dvu, delta y velocity 
		character.ragdoll.GetAtom(pb2Ragdoll.b_pelvis),	// root atom (most of the time it's pelvis)
		false,											// force splitting of atoms?
		null											// custom particle effect.. if null uses the default teleport vfx.
	);
}
//->Ditto->//{"operation":"code","snippet_color":"0x004045","code":"// We iterate through all characters, finding out\n// their points lie within the bounding box of the specified region.\nfor (const character of pb2Character.characters) {\n\tif (!isPointInRect(character, region)) {\n\t\tcontinue;\t\n\t}\n\t\n\tconst position = getCenterPosition(positionObject);\n\t\n\tcharacter.ragdoll.Teleport( \n\t\tposition.x - character.x,\t\t\t\t\t\t// dx, delta x, difference in x position\n\t\tposition.y - character.y,\t\t\t\t\t\t// dy, delta y, difference in y position\n\t\t0,\t\t\t\t\t\t\t\t\t\t\t\t// dvx, delta x velocity \n\t\t0,\t\t\t\t\t\t\t\t\t\t\t\t// dvu, delta y velocity \n\t\tcharacter.ragdoll.GetAtom(pb2Ragdoll.b_pelvis),\t// root atom (most of the time it's pelvis)\n\t\tfalse,\t\t\t\t\t\t\t\t\t\t\t// force splitting of atoms?\n\t\tnull\t\t\t\t\t\t\t\t\t\t\t// custom particle effect.. if null uses the default teleport vfx.\n\t);\n}\n","x":"20","y":"3100","_visible":"1","_locked":"0","_disabled":"0"}
};globalThis.TeleportAllPlayers_PB2Preset=_pb2T(globalThis.TeleportAllPlayers_PB2Preset,1,Infinity,null,1);//->Ditto->//{"operation":"close_layer_bracket"}
// Move Region 'A' to Position 'B'//->Ditto->//{"operation":"comment","comment":"Move Region 'A' to Position 'B'","x":"20","y":"3220","_visible":"1","_locked":"0","_disabled":"0"}
globalThis.MoveRegionToPosition_PB2Preset = ( region, position )=>//->Ditto->//{"operation":"layer_definition","id":"globalThis.MoveRegionToPosition_PB2Preset","availability":"global","arguments":"region, position","is_open":true,"close_when_possible":false,"enabled":"1","max_calls":"Infinity","auto_spawn":"0","auto_spawn_arguments":"","fail_call_callback":"null","fail_call_callback_same_arguments":"1","children_properties_to_rewrite":"","x":"20","y":"3270","_visible":"1","_locked":"0","_disabled":"0","_test_call":"TestExec","_test_call_argument_values":""}
{//->Ditto->//{"operation":"open_layer_bracket"}
// Region :: null :: &constructor=pb2GameWorld.CreateBoxShape,type=pb2Shape.REGION//->Ditto->//{"operation":"comment","comment":"Region :: null :: &constructor=pb2GameWorld.CreateBoxShape,type=pb2Shape.REGION","x":"20","y":"3320","_visible":"1","_locked":"0","_disabled":"0"}
// Position :: null :: &constructor=pb2Ragdoll.CreateRagdoll||pb2Ragdoll.CreateRagdollComplete||new Point||pb2Entity.CreateEntity||new Circle||pb2Gun.CreateGun||pb2Decoration.CreateDecoration//->Ditto->//{"operation":"comment","comment":"Position :: null :: &constructor=pb2Ragdoll.CreateRagdoll||pb2Ragdoll.CreateRagdollComplete||new Point||pb2Entity.CreateEntity||new Circle||pb2Gun.CreateGun||pb2Decoration.CreateDecoration","x":"20","y":"3370","_visible":"1","_locked":"0","_disabled":"0"}
// We wanna move the center of region A to position B, so
// we offset our position by the width and height of region.
const width = Math.abs( region.maxx - region.minx ) / 2;
const height = Math.abs( region.maxy - region.miny ) / 2;

region.SetPosition(
	position.x - width,
	position.y - height
);

// bug with losing width and height information..
region.SetSize(width, height);//->Ditto->//{"operation":"code","snippet_color":"0x004045","code":"// We wanna move the center of region A to position B, so\n// we offset our position by the width and height of region.\nconst width = Math.abs( region.maxx - region.minx ) / 2;\nconst height = Math.abs( region.maxy - region.miny ) / 2;\n\nregion.SetPosition(\n\tposition.x - width,\n\tposition.y - height\n);\n\n// bug with losing width and height information..\nregion.SetSize(width, height);","x":"20","y":"3420","_visible":"1","_locked":"0","_disabled":"0"}
};globalThis.MoveRegionToPosition_PB2Preset=_pb2T(globalThis.MoveRegionToPosition_PB2Preset,1,Infinity,null,1);//->Ditto->//{"operation":"close_layer_bracket"}
// Move Region 'A' by offset 'B'//->Ditto->//{"operation":"comment","comment":"Move Region 'A' by offset 'B'","x":"20","y":"3520","_visible":"1","_locked":"0","_disabled":"0"}
globalThis.MoveRegionByOffset_PB2Preset = ( region, xOffset, yOffset )=>//->Ditto->//{"operation":"layer_definition","id":"globalThis.MoveRegionByOffset_PB2Preset","availability":"global","arguments":"region, xOffset, yOffset","is_open":true,"close_when_possible":false,"enabled":"1","max_calls":"Infinity","auto_spawn":"0","auto_spawn_arguments":"","fail_call_callback":"null","fail_call_callback_same_arguments":"1","children_properties_to_rewrite":"","x":"20","y":"3570","_visible":"1","_locked":"0","_disabled":"0","_test_call":"TestExec","_test_call_argument_values":""}
{//->Ditto->//{"operation":"open_layer_bracket"}
// Region :: null :: &constructor=pb2GameWorld.CreateBoxShape,type=pb2Shape.REGION//->Ditto->//{"operation":"comment","comment":"Region :: null :: &constructor=pb2GameWorld.CreateBoxShape,type=pb2Shape.REGION","x":"20","y":"3620","_visible":"1","_locked":"0","_disabled":"0"}
// Offset in X :: 0 :: number//->Ditto->//{"operation":"comment","comment":"Offset in X :: 0 :: number","x":"20","y":"3670","_visible":"1","_locked":"0","_disabled":"0"}
// Offset in Y :: 0 :: number//->Ditto->//{"operation":"comment","comment":"Offset in Y :: 0 :: number","x":"20","y":"3720","_visible":"1","_locked":"0","_disabled":"0"}
region.SetPosition(
	region.x + xOffset,
	region.y + yOffset
);//->Ditto->//{"operation":"code","snippet_color":"0x004045","code":"region.SetPosition(\n\tregion.x + xOffset,\n\tregion.y + yOffset\n);","x":"20","y":"3770","_visible":"1","_locked":"0","_disabled":"0"}
};globalThis.MoveRegionByOffset_PB2Preset=_pb2T(globalThis.MoveRegionByOffset_PB2Preset,1,Infinity,null,1);//->Ditto->//{"operation":"close_layer_bracket"}
// Activate Timer 'A'//->Ditto->//{"operation":"comment","comment":"Activate Timer 'A'","x":"20","y":"3920","_visible":"1","_locked":"0","_disabled":"0"}
globalThis.ActivateTimer_PB2Preset = ( timer )=>//->Ditto->//{"operation":"layer_definition","id":"globalThis.ActivateTimer_PB2Preset","availability":"global","arguments":"timer","is_open":true,"close_when_possible":false,"enabled":"1","max_calls":"Infinity","auto_spawn":"0","auto_spawn_arguments":"","fail_call_callback":"null","fail_call_callback_same_arguments":"1","children_properties_to_rewrite":"","x":"20","y":"3970","_visible":"1","_locked":"0","_disabled":"0","_test_call":"TestExec","_test_call_argument_values":""}
{//->Ditto->//{"operation":"open_layer_bracket"}
// Timer :: null :: &constructor=pb2Timer.CreateTimer//->Ditto->//{"operation":"comment","comment":"Timer :: null :: &constructor=pb2Timer.CreateTimer","x":"20","y":"4020","_visible":"1","_locked":"0","_disabled":"0"}
timer.enabled = true;
timer.Start();//->Ditto->//{"operation":"code","snippet_color":"0x004045","code":"timer.enabled = true;\ntimer.Start();","x":"20","y":"4070","_visible":"1","_locked":"0","_disabled":"0"}
};globalThis.ActivateTimer_PB2Preset=_pb2T(globalThis.ActivateTimer_PB2Preset,1,Infinity,null,1);//->Ditto->//{"operation":"close_layer_bracket"}
// Deactivate Timer 'A'//->Ditto->//{"operation":"comment","comment":"Deactivate Timer 'A'","x":"630","y":"3920","_visible":"1","_locked":"0","_disabled":"0"}
globalThis.DeactivateTimer_PB2Preset = ( timer )=>//->Ditto->//{"operation":"layer_definition","id":"globalThis.DeactivateTimer_PB2Preset","availability":"global","arguments":"timer","is_open":true,"close_when_possible":false,"enabled":"1","max_calls":"Infinity","auto_spawn":"0","auto_spawn_arguments":"","fail_call_callback":"null","fail_call_callback_same_arguments":"1","children_properties_to_rewrite":"","x":"630","y":"3970","_visible":"1","_locked":"0","_disabled":"0","_test_call":"TestExec","_test_call_argument_values":""}
{//->Ditto->//{"operation":"open_layer_bracket"}
// Timer :: null :: &constructor=pb2Timer.CreateTimer//->Ditto->//{"operation":"comment","comment":"Timer :: null :: &constructor=pb2Timer.CreateTimer","x":"630","y":"4020","_visible":"1","_locked":"0","_disabled":"0"}
timer.Stop();
timer.enabled = false;//->Ditto->//{"operation":"code","snippet_color":"0x004045","code":"timer.Stop();\ntimer.enabled = false;","x":"630","y":"4070","_visible":"1","_locked":"0","_disabled":"0"}
};globalThis.DeactivateTimer_PB2Preset=_pb2T(globalThis.DeactivateTimer_PB2Preset,1,Infinity,null,1);//->Ditto->//{"operation":"close_layer_bracket"}
// Change Timer 'A' delay to 'B'//->Ditto->//{"operation":"comment","comment":"Change Timer 'A' delay to 'B'","x":"20","y":"4220","_visible":"1","_locked":"0","_disabled":"0"}
globalThis.DeactivateTimer_PB2Preset2 = ( timer, value )=>//->Ditto->//{"operation":"layer_definition","id":"globalThis.DeactivateTimer_PB2Preset2","availability":"global","arguments":"timer, value","is_open":true,"close_when_possible":false,"enabled":"1","max_calls":"Infinity","auto_spawn":"0","auto_spawn_arguments":"","fail_call_callback":"null","fail_call_callback_same_arguments":"1","children_properties_to_rewrite":"","x":"20","y":"4270","_visible":"1","_locked":"0","_disabled":"0","_test_call":"TestExec","_test_call_argument_values":""}
{//->Ditto->//{"operation":"open_layer_bracket"}
// Timer :: null :: &constructor=pb2Timer.CreateTimer//->Ditto->//{"operation":"comment","comment":"Timer :: null :: &constructor=pb2Timer.CreateTimer","x":"20","y":"4320","_visible":"1","_locked":"0","_disabled":"0"}
// Delay :: 30 :: number//->Ditto->//{"operation":"comment","comment":"Delay :: 30 :: number","x":"20","y":"4370","_visible":"1","_locked":"0","_disabled":"0"}
timer.SetDefaultCycleDuration(value);//->Ditto->//{"operation":"code","snippet_color":"0x004045","code":"timer.SetDefaultCycleDuration(value);","x":"20","y":"4420","_visible":"1","_locked":"0","_disabled":"0"}
};globalThis.DeactivateTimer_PB2Preset2=_pb2T(globalThis.DeactivateTimer_PB2Preset2,1,Infinity,null,1);//->Ditto->//{"operation":"close_layer_bracket"}
// Set Timer 'A' max calls to 'B'//->Ditto->//{"operation":"comment","comment":"Set Timer 'A' max calls to 'B'","x":"620","y":"4220","_visible":"1","_locked":"0","_disabled":"0"}
globalThis.DeactivateTimer_PB2Preset3 = ( timer, maxCalls )=>//->Ditto->//{"operation":"layer_definition","id":"globalThis.DeactivateTimer_PB2Preset3","availability":"global","arguments":"timer, maxCalls","is_open":true,"close_when_possible":false,"enabled":"1","max_calls":"Infinity","auto_spawn":"0","auto_spawn_arguments":"","fail_call_callback":"null","fail_call_callback_same_arguments":"1","children_properties_to_rewrite":"","x":"620","y":"4270","_visible":"1","_locked":"0","_disabled":"0","_test_call":"TestExec","_test_call_argument_values":""}
{//->Ditto->//{"operation":"open_layer_bracket"}
// Timer :: null :: &constructor=pb2Timer.CreateTimer//->Ditto->//{"operation":"comment","comment":"Timer :: null :: &constructor=pb2Timer.CreateTimer","x":"620","y":"4320","_visible":"1","_locked":"0","_disabled":"0"}
// Max Calls :: 1 :: number//->Ditto->//{"operation":"comment","comment":"Max Calls :: 1 :: number","x":"620","y":"4370","_visible":"1","_locked":"0","_disabled":"0"}
timer.SetCalls(maxCalls);//->Ditto->//{"operation":"code","snippet_color":"0x004045","code":"timer.SetCalls(maxCalls);","x":"620","y":"4420","_visible":"1","_locked":"0","_disabled":"0"}
};globalThis.DeactivateTimer_PB2Preset3=_pb2T(globalThis.DeactivateTimer_PB2Preset3,1,Infinity,null,1);//->Ditto->//{"operation":"close_layer_bracket"}
// Reset Timer 'A' elapsed time//->Ditto->//{"operation":"comment","comment":"Reset Timer 'A' elapsed time","x":"20","y":"4520","_visible":"1","_locked":"0","_disabled":"0"}
globalThis.ActivateTimer_PB2Preset2 = ( timer )=>//->Ditto->//{"operation":"layer_definition","id":"globalThis.ActivateTimer_PB2Preset2","availability":"global","arguments":"timer","is_open":true,"close_when_possible":false,"enabled":"1","max_calls":"Infinity","auto_spawn":"0","auto_spawn_arguments":"","fail_call_callback":"null","fail_call_callback_same_arguments":"1","children_properties_to_rewrite":"","x":"20","y":"4570","_visible":"1","_locked":"0","_disabled":"0","_test_call":"TestExec","_test_call_argument_values":""}
{//->Ditto->//{"operation":"open_layer_bracket"}
// Timer :: null :: &constructor=pb2Timer.CreateTimer//->Ditto->//{"operation":"comment","comment":"Timer :: null :: &constructor=pb2Timer.CreateTimer","x":"20","y":"4620","_visible":"1","_locked":"0","_disabled":"0"}
timer.ResetCurrentCycle();//->Ditto->//{"operation":"code","snippet_color":"0x004045","code":"timer.ResetCurrentCycle();","x":"20","y":"4670","_visible":"1","_locked":"0","_disabled":"0"}
};globalThis.ActivateTimer_PB2Preset2=_pb2T(globalThis.ActivateTimer_PB2Preset2,1,Infinity,null,1);//->Ditto->//{"operation":"close_layer_bracket"}
// Sends a chat message from character 'A'//->Ditto->//{"operation":"comment","comment":"Sends a chat message from character 'A'","x":"20","y":"4820","_visible":"1","_locked":"0","_disabled":"0"}
globalThis.SendChatWithSpeaker_PB2Preset = ( speaker, message, speakerColor, messageColor )=>//->Ditto->//{"operation":"layer_definition","id":"globalThis.SendChatWithSpeaker_PB2Preset","availability":"global","arguments":"speaker, message, speakerColor, messageColor","is_open":true,"close_when_possible":false,"enabled":"1","max_calls":"Infinity","auto_spawn":"0","auto_spawn_arguments":"","fail_call_callback":"null","fail_call_callback_same_arguments":"1","children_properties_to_rewrite":"","x":"20","y":"4870","_visible":"1","_locked":"0","_disabled":"0","_test_call":"TestExec","_test_call_argument_values":""}
{//->Ditto->//{"operation":"open_layer_bracket"}
// Speaker :: null :: &constructor=pb2Ragdoll.CreateRagdoll||pb2Ragdoll.CreateRagdollComplete||string+none//->Ditto->//{"operation":"comment","comment":"Speaker :: null :: &constructor=pb2Ragdoll.CreateRagdoll||pb2Ragdoll.CreateRagdollComplete||string+none","x":"20","y":"4920","_visible":"1","_locked":"0","_disabled":"0"}
// Message :: `Hello World!` :: string//->Ditto->//{"operation":"comment","comment":"Message :: `Hello World!` :: string","x":"20","y":"4970","_visible":"1","_locked":"0","_disabled":"0"}
// Speaker Color :: new pb2HighRangeColor( 0xffffff ) :: string//->Ditto->//{"operation":"comment","comment":"Speaker Color :: new pb2HighRangeColor( 0xffffff ) :: string","x":"20","y":"5020","_visible":"1","_locked":"0","_disabled":"0"}
// Message Color :: new pb2HighRangeColor( 0xffffff ) :: string//->Ditto->//{"operation":"comment","comment":"Message Color :: new pb2HighRangeColor( 0xffffff ) :: string","x":"20","y":"5070","_visible":"1","_locked":"0","_disabled":"0"}
/*
	Expected input parameters..
	1. speaker (pb2Ragdoll)
	2. message (string)
	3. speakerColor (pb2HighRangeColor)
	4. messageColor (pb2HighRangeColor)
*/

const hexCodeFromPB2Color = (pb2Color) => {
	const redHex = (pb2Color.r * 255).toString(16);
	const greenHex = (pb2Color.g * 255).toString(16);
	const blueHex = (pb2Color.b * 255).toString(16);
	
	const hexCode = `#${redHex}${greenHex}${blueHex}`;
	return hexCode;
}

const speakerName = speaker ?
		`[${hexCodeFromPB2Color(speakerColor)}]${speaker.GetName().GetTagged()}[/]: `
	:	''
;

const coloredMessage = 
	`[${hexCodeFromPB2Color(messageColor)}]${message}[/]`;

pb2GameWorld.ShowChatMessage(speakerName + coloredMessage);

if (!speaker) {
	return;
}

// Show a chat message bubble attached to speaker..
pb2WindowHint.CreateWindowHint({ 
	inline: false, 
	x: speaker.x, 
	y: speaker.y, 
	container: pb2WindowHint.CONTAINER_FLOATING_IN_WORLD, 
	type: pb2WindowHint.TYPE_SUBTITLE, 
	color: null, 
	text: message, 
	is_timed: true, 
	attachment_ragdoll: speaker, 
	keep_on_screen: false, 
	callback: null 
});//->Ditto->//{"operation":"code","snippet_color":"0xb1b1ff","code":"/*\n\tExpected input parameters..\n\t1. speaker (pb2Ragdoll)\n\t2. message (string)\n\t3. speakerColor (pb2HighRangeColor)\n\t4. messageColor (pb2HighRangeColor)\n*/\n\nconst hexCodeFromPB2Color = (pb2Color) => {\n\tconst redHex = (pb2Color.r * 255).toString(16);\n\tconst greenHex = (pb2Color.g * 255).toString(16);\n\tconst blueHex = (pb2Color.b * 255).toString(16);\n\t\n\tconst hexCode = `#${redHex}${greenHex}${blueHex}`;\n\treturn hexCode;\n}\n\nconst speakerName = speaker ?\n\t\t`[${hexCodeFromPB2Color(speakerColor)}]${speaker.GetName().GetTagged()}[/]: `\n\t:\t''\n;\n\nconst coloredMessage = \n\t`[${hexCodeFromPB2Color(messageColor)}]${message}[/]`;\n\npb2GameWorld.ShowChatMessage(speakerName + coloredMessage);\n\nif (!speaker) {\n\treturn;\n}\n\n// Show a chat message bubble attached to speaker..\npb2WindowHint.CreateWindowHint({ \n\tinline: false, \n\tx: speaker.x, \n\ty: speaker.y, \n\tcontainer: pb2WindowHint.CONTAINER_FLOATING_IN_WORLD, \n\ttype: pb2WindowHint.TYPE_SUBTITLE, \n\tcolor: null, \n\ttext: message, \n\tis_timed: true, \n\tattachment_ragdoll: speaker, \n\tkeep_on_screen: false, \n\tcallback: null \n});","x":"20","y":"5120","_visible":"1","_locked":"0","_disabled":"0"}
};globalThis.SendChatWithSpeaker_PB2Preset=_pb2T(globalThis.SendChatWithSpeaker_PB2Preset,1,Infinity,null,1);//->Ditto->//{"operation":"close_layer_bracket"}
// Sends a chat message//->Ditto->//{"operation":"comment","comment":"Sends a chat message","x":"20","y":"5220","_visible":"1","_locked":"0","_disabled":"0"}
globalThis.SendChat_PB2Preset = ( speaker, message, speakerColor, messageColor )=>//->Ditto->//{"operation":"layer_definition","id":"globalThis.SendChat_PB2Preset","availability":"global","arguments":"speaker, message, speakerColor, messageColor","is_open":false,"close_when_possible":false,"enabled":"1","max_calls":"Infinity","auto_spawn":"0","auto_spawn_arguments":"","fail_call_callback":"null","fail_call_callback_same_arguments":"1","children_properties_to_rewrite":"","x":"20","y":"5270","_visible":"1","_locked":"0","_disabled":"0","_test_call":"TestExec","_test_call_argument_values":""}
{//->Ditto->//{"operation":"open_layer_bracket"}
// Speaker's Name :: 'Noir Lime' :: string//->Ditto->//{"operation":"comment","comment":"Speaker's Name :: 'Noir Lime' :: string","x":"20","y":"5320","_visible":"1","_locked":"0","_disabled":"0"}
// Message :: `Hello World!` :: string//->Ditto->//{"operation":"comment","comment":"Message :: `Hello World!` :: string","x":"20","y":"5370","_visible":"1","_locked":"0","_disabled":"0"}
// Speaker Color :: new pb2HighRangeColor( 0xffffff ) :: string//->Ditto->//{"operation":"comment","comment":"Speaker Color :: new pb2HighRangeColor( 0xffffff ) :: string","x":"20","y":"5420","_visible":"1","_locked":"0","_disabled":"0"}
// Message Color :: new pb2HighRangeColor( 0xffffff ) :: string//->Ditto->//{"operation":"comment","comment":"Message Color :: new pb2HighRangeColor( 0xffffff ) :: string","x":"20","y":"5470","_visible":"1","_locked":"0","_disabled":"0"}
/*
	Expected input parameters..
	1. speaker (string)
	2. message (string)
	3. speakerColor (pb2HighRangeColor)
	4. messageColor (pb2HighRangeColor)
*/

const hexCodeFromPB2Color = (pb2Color) => {
	const redHex = (pb2Color.r * 255).toString(16);
	const greenHex = (pb2Color.g * 255).toString(16);
	const blueHex = (pb2Color.b * 255).toString(16);
	
	const hexCode = `#${redHex}${greenHex}${blueHex}`;
	return hexCode;
}

const speakerName = speaker ?
		`[${hexCodeFromPB2Color(speakerColor)}]${speaker}[/]: `
	:	''
;

const coloredMessage = 
	`[${hexCodeFromPB2Color(messageColor)}]${message}[/]`;

pb2GameWorld.ShowChatMessage(speakerName + coloredMessage);//->Ditto->//{"operation":"code","snippet_color":"0xb1b1ff","code":"/*\n\tExpected input parameters..\n\t1. speaker (string)\n\t2. message (string)\n\t3. speakerColor (pb2HighRangeColor)\n\t4. messageColor (pb2HighRangeColor)\n*/\n\nconst hexCodeFromPB2Color = (pb2Color) => {\n\tconst redHex = (pb2Color.r * 255).toString(16);\n\tconst greenHex = (pb2Color.g * 255).toString(16);\n\tconst blueHex = (pb2Color.b * 255).toString(16);\n\t\n\tconst hexCode = `#${redHex}${greenHex}${blueHex}`;\n\treturn hexCode;\n}\n\nconst speakerName = speaker ?\n\t\t`[${hexCodeFromPB2Color(speakerColor)}]${speaker}[/]: `\n\t:\t''\n;\n\nconst coloredMessage = \n\t`[${hexCodeFromPB2Color(messageColor)}]${message}[/]`;\n\npb2GameWorld.ShowChatMessage(speakerName + coloredMessage);","x":"20","y":"5520","_visible":"1","_locked":"0","_disabled":"0"}
};globalThis.SendChat_PB2Preset=_pb2T(globalThis.SendChat_PB2Preset,1,Infinity,null,1);//->Ditto->//{"operation":"close_layer_bracket"}
// Set Character 'A' current and max hit points to value 'B'//->Ditto->//{"operation":"comment","comment":"Set Character 'A' current and max hit points to value 'B'","x":"20","y":"5620","_visible":"1","_locked":"0","_disabled":"0"}
globalThis.SetCharacterHealth_PB2Preset = ( character, healthPoints )=>//->Ditto->//{"operation":"layer_definition","id":"globalThis.SetCharacterHealth_PB2Preset","availability":"global","arguments":"character, healthPoints","is_open":true,"close_when_possible":false,"enabled":"1","max_calls":"Infinity","auto_spawn":"0","auto_spawn_arguments":"","fail_call_callback":"null","fail_call_callback_same_arguments":"1","children_properties_to_rewrite":"","x":"20","y":"5670","_visible":"1","_locked":"0","_disabled":"0","_test_call":"TestExec","_test_call_argument_values":""}
{//->Ditto->//{"operation":"open_layer_bracket"}
// Character :: null :: &constructor=pb2Ragdoll.CreateRagdollComplete//->Ditto->//{"operation":"comment","comment":"Character :: null :: &constructor=pb2Ragdoll.CreateRagdollComplete","x":"20","y":"5720","_visible":"1","_locked":"0","_disabled":"0"}
// Health Points :: 130 :: number//->Ditto->//{"operation":"comment","comment":"Health Points :: 130 :: number","x":"20","y":"5770","_visible":"1","_locked":"0","_disabled":"0"}
if (character.owner_character) {
	character.owner_character.hea = healthPoints;
	character.owner_character.hmax = healthPoints;
}//->Ditto->//{"operation":"code","snippet_color":"0x004045","code":"if (character.owner_character) {\n\tcharacter.owner_character.hea = healthPoints;\n\tcharacter.owner_character.hmax = healthPoints;\n}","x":"20","y":"5820","_visible":"1","_locked":"0","_disabled":"0"}
};globalThis.SetCharacterHealth_PB2Preset=_pb2T(globalThis.SetCharacterHealth_PB2Preset,1,Infinity,null,1);//->Ditto->//{"operation":"close_layer_bracket"}
// Heal Character 'A' by value 'B' (doesn't overheal)//->Ditto->//{"operation":"comment","comment":"Heal Character 'A' by value 'B' (doesn't overheal)","x":"20","y":"5920","_visible":"1","_locked":"0","_disabled":"0"}
globalThis.HealChracter_PB2Preset = ( ragdoll, healthPoints )=>//->Ditto->//{"operation":"layer_definition","id":"globalThis.HealChracter_PB2Preset","availability":"global","arguments":"ragdoll, healthPoints","is_open":true,"close_when_possible":false,"enabled":"1","max_calls":"Infinity","auto_spawn":"0","auto_spawn_arguments":"","fail_call_callback":"null","fail_call_callback_same_arguments":"1","children_properties_to_rewrite":"","x":"20","y":"5970","_visible":"1","_locked":"0","_disabled":"0","_test_call":"TestExec","_test_call_argument_values":""}
{//->Ditto->//{"operation":"open_layer_bracket"}
// Character :: null :: &constructor=pb2Ragdoll.CreateRagdollComplete//->Ditto->//{"operation":"comment","comment":"Character :: null :: &constructor=pb2Ragdoll.CreateRagdollComplete","x":"20","y":"6020","_visible":"1","_locked":"0","_disabled":"0"}
// Health Points :: 130 :: number//->Ditto->//{"operation":"comment","comment":"Health Points :: 130 :: number","x":"20","y":"6070","_visible":"1","_locked":"0","_disabled":"0"}
const character = ragdoll.owner_character;

if (!character) {
	return;
}

character.SubstractHealth(-healthPoints);

if (character.hea > character.hmax) {
	character.hea = character.hmax;
}
//->Ditto->//{"operation":"code","snippet_color":"0x004045","code":"const character = ragdoll.owner_character;\n\nif (!character) {\n\treturn;\n}\n\ncharacter.SubstractHealth(-healthPoints);\n\nif (character.hea > character.hmax) {\n\tcharacter.hea = character.hmax;\n}\n","x":"20","y":"6120","_visible":"1","_locked":"0","_disabled":"0"}
};globalThis.HealChracter_PB2Preset=_pb2T(globalThis.HealChracter_PB2Preset,1,Infinity,null,1);//->Ditto->//{"operation":"close_layer_bracket"}
// Move Entity 'A' to Position 'B'//->Ditto->//{"operation":"comment","comment":"Move Entity 'A' to Position 'B'","x":"20","y":"6220","_visible":"1","_locked":"0","_disabled":"0"}
globalThis.MoveEntityToPosition_PB2Preset = ( entity, positionObject )=>//->Ditto->//{"operation":"layer_definition","id":"globalThis.MoveEntityToPosition_PB2Preset","availability":"global","arguments":"entity, positionObject","is_open":true,"close_when_possible":false,"enabled":"1","max_calls":"Infinity","auto_spawn":"0","auto_spawn_arguments":"","fail_call_callback":"null","fail_call_callback_same_arguments":"1","children_properties_to_rewrite":"","x":"20","y":"6270","_visible":"1","_locked":"0","_disabled":"0","_test_call":"TestExec","_test_call_argument_values":""}
{//->Ditto->//{"operation":"open_layer_bracket"}
// Entity :: null :: &constructor=pb2Entity.CreateEntity//->Ditto->//{"operation":"comment","comment":"Entity :: null :: &constructor=pb2Entity.CreateEntity","x":"20","y":"6320","_visible":"1","_locked":"0","_disabled":"0"}
// Position (Region / Point) :: null :: &constructor=pb2GameWorld.CreateBoxShape,type=pb2Shape.REGION||new Point//->Ditto->//{"operation":"comment","comment":"Position (Region / Point) :: null :: &constructor=pb2GameWorld.CreateBoxShape,type=pb2Shape.REGION||new Point","x":"20","y":"6370","_visible":"1","_locked":"0","_disabled":"0"}
// Credits to jeje52
if (entity.hea <= 0) {
	return;
}

const position = getCenterPosition(positionObject);

const dx = position.x - entity.x;
const dy = position.y - entity.y;

for (const body of entity.box2d_bodies) {
    body.SetPos(body.GetPosX() + dx / 30, body.GetPosY() + dy / 30);
}//->Ditto->//{"operation":"code","snippet_color":"0x004045","code":"// Credits to jeje52\r\nif (entity.hea <= 0) {\r\n\treturn;\r\n}\r\n\r\nconst position = getCenterPosition(positionObject);\r\n\r\nconst dx = position.x - entity.x;\r\nconst dy = position.y - entity.y;\r\n\r\nfor (const body of entity.box2d_bodies) {\r\n    body.SetPos(body.GetPosX() + dx / 30, body.GetPosY() + dy / 30);\r\n}","x":"20","y":"6420","_visible":"1","_locked":"0","_disabled":"0"}
};globalThis.MoveEntityToPosition_PB2Preset=_pb2T(globalThis.MoveEntityToPosition_PB2Preset,1,Infinity,null,1);//->Ditto->//{"operation":"close_layer_bracket"}
// Activate Trigger 'A'//->Ditto->//{"operation":"comment","comment":"Activate Trigger 'A'","x":"20","y":"6520","_visible":"1","_locked":"0","_disabled":"0"}
globalThis.ActivateTrigger_PB2Preset = ( trigger )=>//->Ditto->//{"operation":"layer_definition","id":"globalThis.ActivateTrigger_PB2Preset","availability":"global","arguments":"trigger","is_open":true,"close_when_possible":false,"enabled":"1","max_calls":"Infinity","auto_spawn":"0","auto_spawn_arguments":"","fail_call_callback":"null","fail_call_callback_same_arguments":"1","children_properties_to_rewrite":"","x":"20","y":"6570","_visible":"1","_locked":"0","_disabled":"0","_test_call":"TestExec","_test_call_argument_values":""}
{//->Ditto->//{"operation":"open_layer_bracket"}
// Trigger :: null :: &operation=layer_definition//->Ditto->//{"operation":"comment","comment":"Trigger :: null :: &operation=layer_definition","x":"20","y":"6620","_visible":"1","_locked":"0","_disabled":"0"}
trigger.enabled = true;//->Ditto->//{"operation":"code","snippet_color":"0x004045","code":"trigger.enabled = true;","x":"20","y":"6670","_visible":"1","_locked":"0","_disabled":"0"}
};globalThis.ActivateTrigger_PB2Preset=_pb2T(globalThis.ActivateTrigger_PB2Preset,1,Infinity,null,1);//->Ditto->//{"operation":"close_layer_bracket"}
// Deactivate Trigger 'A'//->Ditto->//{"operation":"comment","comment":"Deactivate Trigger 'A'","x":"620","y":"6520","_visible":"1","_locked":"0","_disabled":"0"}
globalThis.DeactivateTrigger_PB2Preset = ( trigger )=>//->Ditto->//{"operation":"layer_definition","id":"globalThis.DeactivateTrigger_PB2Preset","availability":"global","arguments":"trigger","is_open":true,"close_when_possible":false,"enabled":"1","max_calls":"Infinity","auto_spawn":"0","auto_spawn_arguments":"","fail_call_callback":"null","fail_call_callback_same_arguments":"1","children_properties_to_rewrite":"","x":"620","y":"6570","_visible":"1","_locked":"0","_disabled":"0","_test_call":"TestExec","_test_call_argument_values":""}
{//->Ditto->//{"operation":"open_layer_bracket"}
// Trigger :: null :: &operation=layer_definition//->Ditto->//{"operation":"comment","comment":"Trigger :: null :: &operation=layer_definition","x":"620","y":"6620","_visible":"1","_locked":"0","_disabled":"0"}
trigger.enabled = false;//->Ditto->//{"operation":"code","snippet_color":"0x004045","code":"trigger.enabled = false;","x":"620","y":"6670","_visible":"1","_locked":"0","_disabled":"0"}
};globalThis.DeactivateTrigger_PB2Preset=_pb2T(globalThis.DeactivateTrigger_PB2Preset,1,Infinity,null,1);//->Ditto->//{"operation":"close_layer_bracket"}
// Set number of remain calls of Trigger 'A' to value 'B' (-1 for infinity)//->Ditto->//{"operation":"comment","comment":"Set number of remain calls of Trigger 'A' to value 'B' (-1 for infinity)","x":"20","y":"6820","_visible":"1","_locked":"0","_disabled":"0"}
globalThis.SetTriggerMaxCalls_PB2Preset = ( trigger, value )=>//->Ditto->//{"operation":"layer_definition","id":"globalThis.SetTriggerMaxCalls_PB2Preset","availability":"global","arguments":"trigger, value","is_open":true,"close_when_possible":false,"enabled":"1","max_calls":"Infinity","auto_spawn":"0","auto_spawn_arguments":"","fail_call_callback":"null","fail_call_callback_same_arguments":"1","children_properties_to_rewrite":"","x":"20","y":"6870","_visible":"1","_locked":"0","_disabled":"0","_test_call":"TestExec","_test_call_argument_values":""}
{//->Ditto->//{"operation":"open_layer_bracket"}
// Trigger :: null :: &operation=layer_definition//->Ditto->//{"operation":"comment","comment":"Trigger :: null :: &operation=layer_definition","x":"20","y":"6920","_visible":"1","_locked":"0","_disabled":"0"}
// Max Calls :: 0 :: number//->Ditto->//{"operation":"comment","comment":"Max Calls :: 0 :: number","x":"20","y":"6970","_visible":"1","_locked":"0","_disabled":"0"}
trigger.max_calls = value;

if (trigger.max_calls < 0) {
    trigger.max_calls = Infinity;
}//->Ditto->//{"operation":"code","snippet_color":"0x004045","code":"trigger.max_calls = value;\r\n\r\nif (trigger.max_calls < 0) {\r\n    trigger.max_calls = Infinity;\r\n}","x":"20","y":"7020","_visible":"1","_locked":"0","_disabled":"0"}
};globalThis.SetTriggerMaxCalls_PB2Preset=_pb2T(globalThis.SetTriggerMaxCalls_PB2Preset,1,Infinity,null,1);//->Ditto->//{"operation":"close_layer_bracket"}
// Execute Trigger 'A'//->Ditto->//{"operation":"comment","comment":"Execute Trigger 'A'","x":"20","y":"7120","_visible":"1","_locked":"0","_disabled":"0"}
globalThis.ExecuteTrigger_PB2Preset = ( trigger )=>//->Ditto->//{"operation":"layer_definition","id":"globalThis.ExecuteTrigger_PB2Preset","availability":"global","arguments":"trigger","is_open":true,"close_when_possible":false,"enabled":"1","max_calls":"Infinity","auto_spawn":"0","auto_spawn_arguments":"","fail_call_callback":"null","fail_call_callback_same_arguments":"1","children_properties_to_rewrite":"","x":"20","y":"7170","_visible":"1","_locked":"0","_disabled":"0","_test_call":"TestExec","_test_call_argument_values":""}
{//->Ditto->//{"operation":"open_layer_bracket"}
// Trigger :: null :: &operation=layer_definition//->Ditto->//{"operation":"comment","comment":"Trigger :: null :: &operation=layer_definition","x":"20","y":"7220","_visible":"1","_locked":"0","_disabled":"0"}
trigger();//->Ditto->//{"operation":"code","snippet_color":"0x004045","code":"trigger();","x":"20","y":"7270","_visible":"1","_locked":"0","_disabled":"0"}
};globalThis.ExecuteTrigger_PB2Preset=_pb2T(globalThis.ExecuteTrigger_PB2Preset,1,Infinity,null,1);//->Ditto->//{"operation":"close_layer_bracket"}
// Set Game's FPS to value 'A' (Default: 30, can be used for slow motion for an example)//->Ditto->//{"operation":"comment","comment":"Set Game's FPS to value 'A' (Default: 30, can be used for slow motion for an example)","x":"20","y":"7420","_visible":"1","_locked":"0","_disabled":"0"}
globalThis.SetGameFPS_PB2Preset = ( value )=>//->Ditto->//{"operation":"layer_definition","id":"globalThis.SetGameFPS_PB2Preset","availability":"global","arguments":"value","is_open":true,"close_when_possible":false,"enabled":"1","max_calls":"Infinity","auto_spawn":"0","auto_spawn_arguments":"","fail_call_callback":"null","fail_call_callback_same_arguments":"1","children_properties_to_rewrite":"","x":"20","y":"7470","_visible":"1","_locked":"0","_disabled":"0","_test_call":"TestExec","_test_call_argument_values":""}
{//->Ditto->//{"operation":"open_layer_bracket"}
// FPS :: 30 :: number//->Ditto->//{"operation":"comment","comment":"FPS :: 30 :: number","x":"20","y":"7520","_visible":"1","_locked":"0","_disabled":"0"}
if (value <= 0) {
	throw new Error(`Invalid FPS value of ${value}! Value cannot be smaller or equal than 0.`);	
}

pb2_mp.GAME_FPS = value;//->Ditto->//{"operation":"code","snippet_color":"0x004045","code":"if (value <= 0) {\n\tthrow new Error(`Invalid FPS value of ${value}! Value cannot be smaller or equal than 0.`);\t\n}\n\npb2_mp.GAME_FPS = value;","x":"20","y":"7570","_visible":"1","_locked":"0","_disabled":"0"}
};globalThis.SetGameFPS_PB2Preset=_pb2T(globalThis.SetGameFPS_PB2Preset,1,Infinity,null,1);//->Ditto->//{"operation":"close_layer_bracket"}