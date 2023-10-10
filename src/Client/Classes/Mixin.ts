import { Locale } from 'discord.js';
import {
	Constructor, HelpInfoProperties, LocalizedHelpInfo 
} from '../util';

/**
 * Add Help infor to an object class
 * @param Base the object beeing extended
 * @returns the Base object with the added helpInfo methods
 */
export function addHelpInfo<T extends Constructor>(Base: T) {
	return class extends Base implements HelpInfoProperties {
		/**
		 * Titles for help Embed
		 */
		protected helpTitles: LocalizedHelpInfo = {};

		/**
		 * Descriptions for help Embed
		 */
		protected helpDescriptions: LocalizedHelpInfo = {};

		public setHelpTitleLocalizations(localizedTitle: LocalizedHelpInfo) {
			Object.assign(this.helpTitles, localizedTitle);
			return this;
		}

		public setHelpDescriptionLocalizations(localizedDescriptions: LocalizedHelpInfo) {
			Object.assign(this.helpDescriptions, localizedDescriptions);
			return this;
		}

		public getHelpInfo(locale: Locale): { title: string; description: string } {
			return {
				title: this.helpTitles[locale.toString()],
				description: this.helpDescriptions[locale.toString()]
			};
		}
	};
}
