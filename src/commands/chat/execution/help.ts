import { ns } from '@builders/help';
import { t } from '@i18n';
import {
	AutocompleteInteraction, ChatInputCommandInteraction, EmbedBuilder 
} from 'discord.js';

export async function help(interaction: ChatInputCommandInteraction<'cached'>) {
	const {
		options, locale, client 
	} = interaction;

	const commandName = options.getString('option-command-name', true);

	const { builder } = client.commands.get(commandName);

	if (!builder) {
		return interaction.reply({
			content: t({
				key: 'error-command-not-found',
				ns,
				locale
			}),
			ephemeral: true
		});
	}

	const helpInfo = builder.getHelpInfo(locale);

	const embed = new EmbedBuilder().setTitle(helpInfo.title).setDescription(helpInfo.description);

	return interaction.reply({
		embeds: [embed],
		ephemeral: true // only the user who executed the command can see the response
	});
}

export async function autoComplete(interaction: AutocompleteInteraction<'cached'>) {
	const focusedOption = interaction.options.getFocused();

	const choices = interaction.client.commands.filter((command) => command.builder.name.startsWith(focusedOption));

	return interaction.respond(choices.map((choice) => ({ name: choice.builder.name, value: choice.builder.name })).slice(0, 14));
}
