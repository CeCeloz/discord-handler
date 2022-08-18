const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('button')
        .setDescription('construct a default buttton'),
    async execute(interaction, client) {

       const button = new ButtonBuilder()
           .setCustomId(`button`)
           .setLabel(`Just a simple button`)
           .setStyle(ButtonStyle.Success);

       await interaction.channel.send({
           embeds: [embed],
           components: [new ActionRowBuilder().addComponents(button)]
       });

       await interaction.reply({content: 'the button is send to the channel', ephemeral: true})

    }
}