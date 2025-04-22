export const releaseCommand = async (interaction) => {
    const generalManagerRoleId = '1257235868301656085'; // General Manager role ID
    const targetUser = interaction.options.getUser('player'); // The user to release
    const teamRole = interaction.options.getRole('role'); // The team role to remove
    const prospectsRoleId = '1257235868264038467'; // Prospects role ID
    const member = interaction.guild.members.cache.get(targetUser.id);

    // Check if the command issuer is a General Manager
    if (!interaction.member.roles.cache.has(generalManagerRoleId)) {
        return interaction.reply({ content: 'Only General Managers can use this command.', ephemeral: true });
    }

    if (!teamRole || !member) {
        return interaction.reply({ content: 'Please specify a valid user and team role.', ephemeral: true });
    }

    try {
        // Remove the team role and add the Prospects role
        await member.roles.remove(teamRole);
        await member.roles.add(prospectsRoleId);

        // Send a DM to the user
        await targetUser.send(`You have been released from **${teamRole.name}**. You have been added back to Prospects.`);

        return interaction.reply({ content: `${targetUser.tag} has been released from **${teamRole.name}** and added back to Prospects.`, ephemeral: true });
    } catch (error) {
        console.error('Error releasing user:', error);
        return interaction.reply({ content: 'There was an error processing your request. Please try again later.', ephemeral: true });
    }
};