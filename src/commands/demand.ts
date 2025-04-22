export const demandCommand = async (interaction) => {
    const teamRole = interaction.options.getRole('role'); // The team role to remove
    const member = interaction.member;
    const prospectsRoleId = '1257235868264038467'; // Prospects role ID

    if (!teamRole) {
        return interaction.reply({ content: 'Please specify a valid team role.', ephemeral: true });
    }

    if (!member.roles.cache.has(teamRole.id)) {
        return interaction.reply({ content: `You do not have the role **${teamRole.name}**.`, ephemeral: true });
    }

    try {
        // Remove the team role and add the Prospects role
        await member.roles.remove(teamRole);
        await member.roles.add(prospectsRoleId);

        return interaction.reply({ content: `You have been removed from **${teamRole.name}** and added back to Prospects.`, ephemeral: true });
    } catch (error) {
        console.error('Error handling demand:', error);
        return interaction.reply({ content: 'There was an error processing your request. Please try again later.', ephemeral: true });
    }
};