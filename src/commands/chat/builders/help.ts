import { ChatInputCommand } from '@Client';
import { autoComplete, help } from '@execution/help';
import { localization, t } from '@i18n';

// ns = namespace
export const ns = 'help';

export default new ChatInputCommand()
	.setBuilder((builder) =>
		builder
			.setName(t({ key: 'command-name', ns }))
			.setDescription(t({ key: 'command-description', ns }))

			.setNameLocalizations(localization('command-name', ns))
			.setDescriptionLocalizations(localization('command-description', ns))

			.setDMPermission(true)

			.addStringOption((option) =>
				option
					.setAutocomplete(true)
					.setName(t({ key: 'option-command-name', ns }))
					.setDescription(t({ key: 'option-command-description', ns }))
					.setRequired(true)
			)
	)
	.setGlobal(true)
	// @execution/help not yet implemented
	.setAutocomplete(autoComplete)
	.setExecute(help);
