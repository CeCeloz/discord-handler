const {glob} = require("glob");
const {promisify} = require("util");
const {Client} = require("discord.js");
const globPromise = promisify(glob);

/**
 * @param {Client} client
 */
module.exports = async (client) => {

    // Events
    const eventFiles = await globPromise(`${process.cwd()}/events/**/*.js`);
    eventFiles.map((value) => require(value));

    // Slash Commands
    const slashCommands = await globPromise(
        `${process.cwd()}/slashCommands/**/*.js`
    );

    const arrayOfSlashCommands = [];
    slashCommands.map((value) => {
        const file = require(value);
        if (!file?.name) return;
        client.slashCommands.set(file.name, file);

        if (["MESSAGE", "USER"].includes(file.type)) delete file.description;
        if (file.userPermissions) file.defaultPermission = false;
        arrayOfSlashCommands.push(file);
    });

    client.on("ready", async () => {
        const guild = client.guilds.cache.get("ID");

        await guild.commands.set(arrayOfSlashCommands).then((cmd) => {
            const getRoles = (commandName) => {
                const permissions = arrayOfSlashCommands.find(x => x.name === commandName).userPermissions;
                if (!permissions) return null;
                return guild.roles.cache.filter((x) => x.permissions.has(permissions) && !x.managed
                );
            };

            const fullPermissions = cmd.reduce((accumulator, x) => {
                const roles = getRoles(x.name);
                if (!roles) return accumulator;
                const permissions = roles.reduce((a, v) => {
                    return [
                        ...a,
                        {
                            id: v.id,
                            type: "ROLE",
                            permission: true,
                        },
                    ];
                }, []);
                return [
                    ...accumulator,
                    {
                        id: x.id,
                        permissions,
                    },
                ];
            }, []);

            guild.commands.permissions.set({fullPermissions})
        });
    });


};