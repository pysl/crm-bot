import {
	AutocompleteInteraction,
	ChatInputCommandInteraction,
	CommandInteraction,
	ContextMenuCommandBuilder,
	ContextMenuCommandInteraction,
	EmbedBuilder,
	InteractionResponse,
	Message,
	SlashCommandBuilder,
	SlashCommandSubcommandsOnlyBuilder
} from 'discord.js';
import { Mutable } from './types';

export type ReturnableInteraction = void | CommandInteraction | ContextMenuCommandInteraction | InteractionResponse | Message;

export type ChatInputCommandBuilders =
	| SlashCommandBuilder
	| SlashCommandSubcommandsOnlyBuilder
	| Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'>;

/**
 * Slash command or context command
 */
export class Command<
	TypeBuilder extends ChatInputCommandBuilders | ContextMenuCommandBuilder,
	TypeInteraction extends ChatInputCommandInteraction | ContextMenuCommandInteraction
> {
	// The constructor for the registration for the command
	readonly builder: TypeBuilder;

	// State if the command is available in all servers
	readonly isGlobal: boolean;

	// Embed to be used for help command
	readonly helpEmbed: EmbedBuilder;

	// Method that is run when command is executed
	readonly execute: (interaction: TypeInteraction) => Promise<ReturnableInteraction> | ReturnableInteraction;

	/**
	 *
	 * @param options
	 * @returns
	 */
	constructor(options?: Partial<Command<TypeBuilder, TypeInteraction>>) {
		// If options is undefined
		if (!options) return;

		this.isGlobal = options.isGlobal === undefined ? true : options.isGlobal;
		if (options.builder) this.builder = options.builder;
		if (options.execute) this.execute = options.execute;
		if (options.helpEmbed) this.helpEmbed = options.helpEmbed;
	}

	/**
	 * Set the isGlobal Value
	 * @param isGlobal boolean vaule to be set
	 * @returns The modified object
	 */
	public setGlobal(isGlobal: boolean): this {
		(this as Mutable<Command<TypeBuilder, TypeInteraction>>).isGlobal = isGlobal;
		return this;
	}

	/**
	 * Set the execute method
	 * @param execute function passed in
	 * @returns The modified object
	 */
	public setExecute(execute: (interaction: TypeInteraction) => Promise<ReturnableInteraction> | ReturnableInteraction): this {
		(this as Mutable<Command<TypeBuilder, TypeInteraction>>).execute = execute;
		return this;
	}

	/**
	 * Set Help embed
	 * @param builder Embed builder or callback
	 * @returns The modified object
	 */
	public setHelpEmbed(builder: EmbedBuilder | ((embedBuilder: EmbedBuilder) => EmbedBuilder)): this {
		const mutableCommand = this as Mutable<Command<TypeBuilder, TypeInteraction>>;
		if (typeof builder === 'function') {
			mutableCommand.helpEmbed = builder(new EmbedBuilder());
		}
		else {
			mutableCommand.helpEmbed = builder;
		}
		return this;
	}
}

/**
 * Slash command
 */
export class ChatInputCommand extends Command<ChatInputCommandBuilders, ChatInputCommandInteraction> {
	/**
	 * Runs when client receives and Autocomplete interaction
	 * @param interaction Autocomplete interaction received by the client
	 */
	public autocomplete?: (interaction: AutocompleteInteraction) => Promise<void>;

	constructor(options?: Partial<ChatInputCommand>) {
		super(options);
		if (options.autocomplete) this.autocomplete = options.autocomplete;
	}

	/**
	 * Set the command builder method
	 * @param input Slah command builder or callback
	 * @returns The modified object
	 */
	public setBuilder(input: SlashCommandBuilder | ((subcommandBuilder: SlashCommandBuilder) => ChatInputCommandBuilders)): this {
		if (typeof input === 'function') {
			(this as Mutable<ChatInputCommand>).builder = input(new SlashCommandBuilder());
		}
		else {
			(this as Mutable<ChatInputCommand>).builder = input;
		}
		return this;
	}

	/**
	 * Set Autocomplete method
	 * @param autocomplete autocomplete function
	 * @returns The modified object
	 */
	public setAutocomplete(autocomplete: (interaction: AutocompleteInteraction) => Promise<void>) {
		this.autocomplete = autocomplete;
		return this;
	}
}

export class ContextMenuCommand extends Command<ContextMenuCommandBuilder, ContextMenuCommandInteraction> {
	/**
	 * Set the Context Menu command builder method
	 * @param input Context Menu command builder or callback
	 * @returns The modified object
	 */
	public setBuilder(input: ContextMenuCommandBuilder | ((subcommandBuilder: ContextMenuCommandBuilder) => ContextMenuCommandBuilder)): this {
		if (typeof input === 'function') {
			(this as Mutable<ContextMenuCommand>).builder = input(new ContextMenuCommandBuilder());
		}
		else {
			(this as Mutable<ContextMenuCommand>).builder = input;
		}
		return this;
	}
}
