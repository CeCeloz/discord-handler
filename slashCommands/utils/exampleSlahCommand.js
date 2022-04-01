const {Client, CommandInteraction} = require('discord.js')

module.exports = {
    name: 'example',
    description: 'this is a example command',
    userPermissions: ["ADMINISTRATOR"],
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
    run: async (client, interaction) => {
        await interaction.followUp('hi, this a example command')
    },
}