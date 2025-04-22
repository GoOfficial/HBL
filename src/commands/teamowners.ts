import { EmbedBuilder } from 'discord.js';

export const teamOwnersCommand = async (interaction) => {
    const guild = interaction.guild;

    // Role IDs
    const generalManagerRoleId = '1257235868301656085';

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

    const owners = [];

    // Find all General Managers and their teams
    guild.members.cache.forEach(member => {
        if (member.roles.cache.has(generalManagerRoleId)) {
            const teamRole = Object.keys(teamRoles).find(roleId => member.roles.cache.has(roleId));
            if (teamRole) {
                owners.push({ team: teamRoles[teamRole], owner: member.user.tag });
            }
        }
    });

    if (owners.length === 0) {
        return interaction.reply({ content: 'No team owners found.', ephemeral: true });
    }

    // Create the embed
    const embed = new EmbedBuilder()
        .setTitle('Team Owners')
        .setColor(0x00FF00);

    owners.forEach(owner => {
        embed.addFields({ name: owner.team, value: `Owner: ${owner.owner}` });
    });

    await interaction.reply({ embeds: [embed] });
};