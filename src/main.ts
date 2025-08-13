import {ErrorMapper} from "utils/ErrorMapper";
import {Harvester} from "./role/harvester";
import {Upgrader} from "./role/upgrader";
import {Builder} from "./role/builder";
import {renewCrew} from "./crew/maintain";
import { CreepRole } from "./role/definition";
import { buildStructure } from "./structure/main";

declare global {
    /*
      Example types, expand on these or remove them and add your own.
      Note: Values, properties defined here do no fully *exist* by this type definiton alone.
            You must also give them an implemention if you would like to use them. (ex. actually setting a `role` property in a Creeps memory)

      Types added in this `global` block are in an ambient, global context. This is needed because `main.ts` is a module file (uses import or export).
      Interfaces matching on name from @types/screeps will be merged. This is how you can extend the 'built-in' interfaces from @types/screeps.
    */

    // Memory extension samples
    interface Memory {
        uuid: number;
        log: any;
    }



    interface CreepMemory {
        role: CreepRole;
        room: string;
        working: boolean;
    }

    // Syntax for adding proprties to `global` (ex "global.log")
    namespace NodeJS {
        interface Global {
            log: any;
        }
    }
}

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
function tower() {

    const tower = <StructureTower> _.filter(Game.structures, (structure) => structure.structureType === STRUCTURE_TOWER)[0];
    if(tower) {
        const closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        const closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }
}

// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
    //console.log(`Current game tick is ${Game.time}`);
    tower()
    renewCrew();
    buildStructure();

    // Automatically delete memory of missing creeps
    for (const name in Memory.creeps) {
        if (!(name in Game.creeps)) {
            delete Memory.creeps[name];
        }

        const creep = Memory.creeps[name];
        switch (creep.role) {
            case CreepRole.HARVESTER:
                Harvester.main(Game.creeps[name]);
                break;
            case CreepRole.UPGRADER:
                Upgrader.main(Game.creeps[name]);
                break;
            case CreepRole.BUILDER:
                Builder.main(Game.creeps[name]);
                break;
          default:
            break;
        }
    }


});
