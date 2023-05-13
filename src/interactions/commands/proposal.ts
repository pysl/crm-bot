import { PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';
import {State} from "../../declarations/states";

export function stateOption(option){
	const states = Object.entries(State);
	return option.setName('state')
		.setDescription('USA states.')
		.setChoices(
			// FIXME: Get around the hard limit of 25 choices, as we have 50 states + 7 other
			...states.map(it => ({name: it[0], value: it[1]})).slice(0, 25)
		)
}
export default {
	data: new SlashCommandBuilder()
		.setName('proposal')
		.setDescription(
			'Create, view, update, and manage proposals.'
		)
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
		.addSubcommand((subCommand) =>
			subCommand
				.setName('start')
				.setDescription('Create a new proposal.')
				.addStringOption((option) =>
					option
						.setName('title')
						.setDescription('A title/name of the proposal.')
						.setRequired(true)
				)
				.addStringOption((option) =>
					option
						.setName('type')
						.setDescription('The type of proposal.')
						.setRequired(true)
						.setChoices(
							{
								name: 'Campaign',
								value: 'campaign'
							},
							{
								name: 'Petition',
								value: 'petition'
							},
							{
								name: 'Initiative',
								value: 'initiative'
							},
							{
								name: 'Signature gathering',
								value: 'signature'
							}
						)
				)
				.addStringOption((option) =>
					stateOption(option)
						.setRequired(true)
				)
				.addStringOption((option) =>
					option
						.setName('scale')
						.setDescription('The scale of the proposal.')
						.setRequired(true)
						.setChoices(
							{
								name: 'National',
								value: 'national'
							},
							{
								name: 'State',
								value: 'state'
							},
							{
								name: 'County',
								value: 'county'
							},
							{
								name: 'City',
								value: 'city'
							})
				)
				.addStringOption( (option) =>
					option
						.setName('deadline')
						.setDescription('Deadline time')
						.setRequired(true)
				)
				.addUserOption((option) =>
					option
						.setName('additional_organizer')
						.setDescription('Other users that are involved with organizing this proposal.')
				)

		)
}