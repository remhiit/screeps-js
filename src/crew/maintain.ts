import { CreepRole } from "../role/definition";
import { spawnName } from "../constant";

function canSpawn(body: BodyPartConstant[]): boolean {
  return Game.spawns[spawnName].spawnCreep(body, "test", { dryRun: true }) === OK;
}

function spawn(name: string, role: CreepRole, specificity: BodyPartConstant[]) {
  console.log("Spawning new creep : " + name);
  Game.spawns[spawnName].spawnCreep(specificity, name, {
    memory: {
      room: "Spawn1",
      role: role,
      working: false
    }
  });
}

export function renewCrew() {
  const harvesters = _.filter(Game.creeps, creep => creep.memory.role === CreepRole.HARVESTER);
  const upgraders = _.filter(Game.creeps, creep => creep.memory.role === CreepRole.UPGRADER);
  const builder = _.filter(Game.creeps, creep => creep.memory.role === CreepRole.BUILDER);
  const soldier = _.filter(Game.creeps, creep => creep.memory.role === CreepRole.SOLDIER);

  if (harvesters.length < 2 && canSpawn([WORK, CARRY, MOVE])) {
    spawn("Harvester" + Game.time, CreepRole.HARVESTER, [WORK, CARRY, MOVE]);
  }
  if (upgraders.length < 1 && canSpawn([WORK, CARRY, MOVE])) {
    spawn("Upgrader" + Game.time, CreepRole.UPGRADER, [WORK, CARRY, MOVE]);
  }
  if (builder.length < 1 && canSpawn([WORK, CARRY, MOVE])) {
    spawn("Builder" + Game.time, CreepRole.BUILDER, [WORK, CARRY, MOVE]);
  }
  if (soldier.length < 1 && canSpawn([MOVE, MOVE, ATTACK, ATTACK])) {
    spawn("Soldier" + Game.time, CreepRole.SOLDIER, [MOVE, MOVE, ATTACK, ATTACK]);
  }

  if (Game.spawns[spawnName].spawning) {
    const spawningCreep = Game.creeps[Game.spawns[spawnName].spawning.name];
    Game.spawns[spawnName].room.visual.text(
      "🛠️" + spawningCreep.memory.role,
      Game.spawns[spawnName].pos.x + 1,
      Game.spawns[spawnName].pos.y,
      { align: "left", opacity: 0.8 }
    );
  }
}
