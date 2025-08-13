import { spawnName } from "../constant";

export function buildStructure(){
  const tower = <StructureTower[]> _.filter(Game.structures, (structure) => structure.structureType === STRUCTURE_TOWER);
  const extention = <StructureExtension[]> _.filter(Game.structures, (structure) => structure.structureType === STRUCTURE_EXTENSION);

  if (extention.length < 5) {
    Game.spawns[spawnName].pos
  }

}
