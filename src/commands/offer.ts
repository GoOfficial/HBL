import { ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder } from 'discord.js';

export const offerCommand = async (interaction) => {
    const targetUser = interaction.options.getUser('player'); // The player to offer
    const member = interaction.member;
    const guild = interaction.guild;

    // Role IDs
    const generalManagerRoleId = '1257235868301656085';
    const headCoachRoleId = '1257235868285141122';
    const prospectsRoleId = '1257235868264038467';

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

    // Check if the user has the General Manager or Head Coach role
    if (!member.roles.cache.has(generalManagerRoleId) && !member.roles.cache.has(headCoachRoleId)) {
        return interaction.reply({ content: 'You must be a General Manager or Head Coach to use this command.', ephemeral: true });
    }

    // Detect the team of the user issuing the command
    const teamRole = Object.keys(teamRoles).find(roleId => member.roles.cache.has(roleId));
    if (!teamRole) {
        return interaction.reply({ content: 'You are not assigned to any team.', ephemeral: true });
    }

    const teamName = teamRoles[teamRole];

    // Create the embed message
    const embed = new EmbedBuilder()
        .setTitle('Offer')
        .setDescription(`You've just received an offer from **${teamName}** to join their roster.\n\nWill you accept the offer—or walk away?\n\n**Coach:** ${interaction.user.tag}`)
        .setColor(0x00FF00);

    // Create buttons for Accept and Decline
    const acceptButton = new ButtonBuilder()
        .setCustomId('accept_offer')
        .setLabel('Accept')
        .setStyle(ButtonStyle.Success);

    const declineButton = new ButtonBuilder()
        .setCustomId('decline_offer')
        .setLabel('Decline')
        .setStyle(ButtonStyle.Danger);

    const actionRow = new ActionRowBuilder().addComponents(acceptButton, declineButton);

    // Send the DM to the target user
    await targetUser.send({ embeds: [embed], components: [actionRow] });

    // Reply to the command issuer
    await interaction.reply({ content: `An offer has been sent to ${targetUser.tag} for **${teamName}**.`, ephemeral: true });

    // Handle button interactions
    const filter = (btnInteraction) => btnInteraction.user.id === targetUser.id;
    const collector = targetUser.dmChannel.createMessageComponentCollector({ filter, time: 60000 });

    collector.on('collect', async (btnInteraction) => {
        if (btnInteraction.customId === 'accept_offer') {
            // Remove the Prospects role and add the team role
            const guildMember = guild.members.cache.get(targetUser.id);
            if (guildMember) {
                await guildMember.roles.remove(prospectsRoleId);
                await guildMember.roles.add(teamRole);
            }

            await btnInteraction.update({ content: 'You have accepted the offer!', components: [] });
        } else if (btnInteraction.customId === 'decline_offer') {
            await btnInteraction.update({ content: 'You have declined the offer.', components: [] });
        }
    });

    collector.on('end', async () => {
        // Disable buttons after the interaction ends
        await targetUser.send({ content: 'The offer has expired.', components: [] });
    });
};