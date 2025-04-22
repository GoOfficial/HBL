export const promoteCommand = async (interaction) => {
    const generalManagerRoleId = '1257235868301656085'; // General Manager role ID
    const headCoachRoleId = '1257235868285141122'; // Head Coach role ID
    const assistantCoachRoleId = '1257235868285141121'; // Assistant Coach role ID
    const targetUser = interaction.options.getUser('player'); // The user to promote
    const coachType = interaction.options.getString('coach_type'); // "head" or "assistant"
    const member = interaction.guild.members.cache.get(targetUser.id);

    // Team roles
    const teamRoles = {
        '1257235868276756534': 'Oak Hill Academy',
        '1257235868276756535': 'Hoover Buccaneers',
        '1257235868276756536': 'Wheeler Wildcats',
        '1257235868276756537': 'Perry Pumas',
        '1257235868276756538': 'Roosevelt Mustangs',
        '1257235868276756539': 'Montverde Academy',
        '1257235868285141113': 'Columbus Explorers',
        '1257235868285141115': 'Combine Academy',
        '1257235868285141117': 'IMG Academy',
        '1257235868285141118': 'Link Academy',
    };

    // Check if the command issuer is a General Manager
    if (!interaction.member.roles.cache.has(generalManagerRoleId)) {
        return interaction.reply({ content: 'Only General Managers can use this command.', ephemeral: true });
    }

    if (!member) {
        return interaction.reply({ content: 'Invalid user specified.', ephemeral: true });
    }

    // Check if the target user is signed to exactly one team
    const userTeamRoles = Object.keys(teamRoles).filter(roleId => member.roles.cache.has(roleId));
    if (userTeamRoles.length !== 1) {
        return interaction.reply({ content: 'The user must be signed to exactly one team to be promoted.', ephemeral: true });
    }

    const teamRoleId = userTeamRoles[0];
    const teamName = teamRoles[teamRoleId];

    // Determine which coach role to assign
    let coachRoleId;
    if (coachType === 'head') {
        coachRoleId = headCoachRoleId;
    } else if (coachType === 'assistant') {
        coachRoleId = assistantCoachRoleId;
    } else {
        return interaction.reply({ content: 'Please specify a valid coach type: "head" or "assistant".', ephemeral: true });
    }

    const coachRole = interaction.guild.roles.cache.get(coachRoleId);
    if (!coachRole) {
        return interaction.reply({ content: 'The specified coach role does not exist.', ephemeral: true });
    }

    try {
        // Add the coach role to the user
        await member.roles.add(coachRole);

        // Send a DM to the user
        await targetUser.send(`You have been promoted to **${coachRole.name}** for **${teamName}**!`);

        return interaction.reply({ content: `${targetUser.tag} has been promoted to **${coachRole.name}** for **${teamName}**.`, ephemeral: true });
    } catch (error) {
        console.error('Error promoting user:', error);
        return interaction.reply({ content: 'There was an error processing your request. Please try again later.', ephemeral: true });
    }
};