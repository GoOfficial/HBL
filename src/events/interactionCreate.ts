export default async (interaction) => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    switch (commandName) {
        case 'offer':
            const offerHandler = (await import('../commands/offer')).default;
            await offerHandler(interaction);
            break;
        case 'release':
            const releaseHandler = (await import('../commands/release')).default;
            await releaseHandler(interaction);
            break;
        case 'demand':
            const demandHandler = (await import('../commands/demand')).default;
            await demandHandler(interaction);
            break;
        case 'promote':
            const promoteHandler = (await import('../commands/promote')).default;
            await promoteHandler(interaction);
            break;
        default:
            await interaction.reply({ content: 'Unknown command', ephemeral: true });
    }
};