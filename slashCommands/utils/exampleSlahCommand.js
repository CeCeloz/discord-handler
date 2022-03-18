const {Client, CommandInteraction} = require('discord.js')

module.exports = {
    name: 'exampleCommand',
    description: 'this is a example command',
    userPermissions: ["USE_APPLICATION_COMMANDS"],
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
    run: async (client, interaction) => {
        interaction.reply('hi, this a example command')
    },
}