module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        if (interaction.isChatInputCommand()) {
            const {commands} = client;
            const {commandName} = interaction;
            const command = commands.get(commandName);
            if (!command) return;

            try {
                await command.execute(interaction, client);
            } catch (error) {
                console.log(error);
                await interaction.reply({
                    content: 'An error occured.',
                    ephemeral: true
                });
            }
        }

        if (interaction.isButton()) {
            const { buttons } = client;
            const { customId } = interaction;
            const button  = buttons.get(customId);

            if (!button) return new Error("Button not found");

            try {
                await button.execute(interaction, client);
            }catch (error) {
                console.log(error);
                await interaction.reply({
                    content: 'An error occured.',
                    ephemeral: true
                });
            }
        }

        if (interaction.isSelectMenu()) {
            const { selectMenus } = client;
            const { customId } = interaction;
            const menu = selectMenus.get(customId);
            if (!menu) return new Error("Menu not found");

            try {
                await menu.execute(interaction, client);
            }catch (error) {
                console.log(error);
                await interaction.reply({
                    content: 'An error occured.',
                    ephemeral: true
                });
            }
        }
    }
}