export function renewCrew() {
    const harvesters = _.filter(Game.creeps, (creep) => creep.memory.role === CreepRole.HARVESTER);
    if (harvesters.length < 2) {
        const newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName,
            {
                memory: {
                    room: 'Spawn1',
                    role: CreepRole.HARVESTER,
                    working: false,
                }
            });
    }
    if(Game.spawns['Spawn1'].spawning) {
        const spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y,
            {align: 'left', opacity: 0.8});
    }
}
