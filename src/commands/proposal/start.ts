import { ChatInputCommandInteraction } from 'discord.js';
import { Command } from '../../structures/Command';

async function execute(interaction: ChatInputCommandInteraction<'cached'>) {
	return interaction.reply({ content: 'ok nerd', ephemeral: true });
}

export default new Command({
	name: 'proposal',
	execute
});
