/**
 * @name JEI
 * @description Tell users to use JEI, NEI, REI, HEI, TMI, HMI or any other recipe mods.
 * @version 1.2.0
 * @author LY
 * @authorId 1018961806393360454
 * @website https://github.com/LYzyx/
 * @invite 5XDDB2Gxn8
 * @donate 
 * @source https://github.com/LYzyx/BetterDiscordAddons/blob/main/plugins/JustEnoughItems.plugin.js
 * @updateUrl https://raw.githubusercontent.com/LYzyx/BetterDiscordAddons/main/plugins/JustEnoughItems.plugin.js
 */


module.exports = (() => {
        const config = {
            info: {
                name: "JustEnoughItems",
                authors: [{
                    name: "LY",
                    discord_id: "1018961806393360454",
                    github_username: "LY",
                }],
                version: "1.0",
                description: "Tell users to use JEI, NEI, REI, HEI, TMI, HMI or any other recipe mods.",
            },
            main: "JustEnoughItems.plugin.js",
        };

        return !global.ZeresPluginLibrary ?
            class {
                constructor() {
                    this._config = config;
                }
                getName() {
                    return config.info.name;
                }
                getAuthor() {
                    return config.info.authors.map((a) => a.name).join(", ");
                }
                getDescription() {
                    return config.info.description;
                }
                getVersion() {
                    return config.info.version;
                }
                load() {
                    BdApi.showConfirmationModal(
                        "Library Missing",
                        `The library plugin needed for ${config.info.name} is missing. Please click Download Now to install it.`, {
                            confirmText: "Download Now",
                            cancelText: "Cancel",
                            onConfirm: () => {
                                require("request").get(
                                    "https://rauenzi.github.io/BDPluginLibrary/release/0PluginLibrary.plugin.js",
                                    async (error, response, body) => {
                                        if (error) {
                                            return BdApi.showConfirmationModal("Error Downloading", [
                                                "Library plugin download failed. Manually install plugin library from the link below.",
                                                BdApi.React.createElement(
                                                    "a", {
                                                        href: "https://rauenzi.github.io/BDPluginLibrary/release/0PluginLibrary.plugin.js",
                                                        target: "_blank",
                                                    },
                                                    "ZeresPluginLibrary"
                                                )
                                            ]);
                                        }
                                        await new Promise((r) =>
                                            require("fs").writeFile(
                                                require("path").join(
                                                    BdApi.Plugins.folder,
                                                    "0PluginLibrary.plugin.js"
                                                ),
                                                body,
                                                r
                                            )
                                        );
                                    }
                                );
                            }
                        }
                    );
                }
                start() {}
                stop() {}
            } :
            (([Plugin, Library]) => {
                const {
                    WebpackModules,
                    Logger,
                    Patcher,
                    PluginUpdater,
                    Utilities,
                    DiscordModules: {
                        MessageActions
                    },
                    Settings: {
                        SettingPanel,
                        Switch,
                        Textbox
                    },
                } = Library;
                const {
                    get
                } = require("request");
                const SlashCommandStore = WebpackModules.getModule(
                    (m) => m?.Kh?.toString?.()?.includes?.("BUILT_IN_TEXT"));

                return class JEI extends Plugin {
                    constructor() {
                        super();
                        this.jei = Utilities.loadData(
                            config.info.name,
                            "jei",
                            true
                        );
                        this.hei = Utilities.loadData(
                            config.info.name,
                            "hei",
                            true
                        );
                        this.rei = Utilities.loadData(
                            config.info.name,
                            "rei",
                            true
                        );
                        this.nei = Utilities.loadData(
                            config.info.name,
                            "nei",
                            true
                        );
                        this.oldnei = Utilities.loadData(
                            config.info.name,
                            "oldnei",
                            true
                        );
                        this.tmi = Utilities.loadData(
                            config.info.name,
                            "tmi",
                            true
                        );
                        this.hmi = Utilities.loadData(
                            config.info.name,
                            "hmi",
                            true
                        );
                    }
                    checkForUpdates() {
                        try {
                            PluginUpdater.checkForUpdate(
                                config.info.name,
                                config.info.version,
                                config.info.github_raw
                            );
                        } catch (err) {
                            Logger.err("Plugin Updater could not be reached.", err);
                        }
                    }
                    start() {
                        this.checkForUpdates();
                        if (this.jei) this.addJEI();
                        if (this.hei) this.addHEI();
                        if (this.rei) this.addREI();
                        if (this.nei) this.addNEI();
                        if (this.oldnei) this.addOLDNEI();
                        if (this.tmi) this.addTMI();
                        if (this.hmi) this.addHMI();
                    }

                    /* -------------------------------------------------------------------------------- */

                    /* Tell users to use Just Enough Items */

                    addJEI() {
                        Patcher.after(SlashCommandStore, "Kh", (_, args, res) => {
                            if (args[0] !== 1) return;
                            res.push({
                                applicationId: "-1",
                                name: "jei",
                                displayName: "jei",
                                description: "Sends the 'Just Enough Items' CurseForge project page url.",
                                displayDescription: "Sends the 'Just Enough' Items CurseForge project page url.",
                                id: (-1 - res.length).toString(),
                                type: 1,
                                target: 1,
                                predicate: () => true,
                                execute: async ([send], {
                                    channel
                                }) => {
                                    try {
                                        MessageActions.sendMessage(
                                            channel.id, {
                                                content: "Use JEI: https://cflookup.com/minecraft/mc-mods/jei",
                                                tts: false,
                                                bottom: true,
                                                invalidEmojis: [],
                                                validNonShortcutEmojis: [],
                                            },
                                            undefined, {}
                                        )
                                    } catch (err) {
                                        Logger.err(err);
                                    }
                                }
                            });
                        })
                    }

                    /* -------------------------------------------------------------------------------- */

                    /* Tell users to use Had Enough Items */

                    addHEI() {
                        Patcher.after(SlashCommandStore, "Kh", (_, args, res) => {
                            if (args[0] !== 1) return;
                            res.push({
                                applicationId: "-1",
                                name: "hei",
                                displayName: "hei",
                                description: "Sends the 'Had Enough Items' CurseForge project page url.",
                                displayDescription: "Sends the 'Had Enough Items' CurseForge project page url.",
                                id: (-1 - res.length).toString(),
                                type: 1,
                                target: 1,
                                predicate: () => true,
                                execute: async ([send], {
                                    channel
                                }) => {
                                    try {
                                        MessageActions.sendMessage(
                                            channel.id, {
                                                content: "Use HEI: https://cflookup.com/minecraft/mc-mods/had-enough-items",
                                                tts: false,
                                                bottom: true,
                                                invalidEmojis: [],
                                                validNonShortcutEmojis: [],
                                            },
                                            undefined, {}
                                        )
                                    } catch (err) {
                                        Logger.err(err);
                                    }
                                }
                            });
                        })
                    }

                    /* -------------------------------------------------------------------------------- */

                    /* Tell users to use Roughly Enough Items */

                    addREI() {
                        Patcher.after(SlashCommandStore, "Kh", (_, args, res) => {
                            if (args[0] !== 1) return;
                            res.push({
                                applicationId: "-1",
                                name: "rei",
                                displayName: "rei",
                                description: "Sends the 'Roughly Enough Items' CurseForge project page url.",
                                displayDescription: "Sends the 'Roughly Enough Items' CurseForge project page url.",
                                id: (-1 - res.length).toString(),
                                type: 1,
                                target: 1,
                                predicate: () => true,
                                execute: async ([send], {
                                    channel
                                }) => {
                                    try {
                                        MessageActions.sendMessage(
                                            channel.id, {
                                                content: "Use REI: https://cflookup.com/minecraft/mc-mods/roughly-enough-items",
                                                tts: false,
                                                bottom: true,
                                                invalidEmojis: [],
                                                validNonShortcutEmojis: [],
                                            },
                                            undefined, {}
                                        )
                                    } catch (err) {
                                        Logger.err(err);
                                    }
                                }
                            });
                        })
                    }

                    /* -------------------------------------------------------------------------------- */

                    /* Tell users to use Not Enough Items (GT:NH Fork) */

                    addNEI() {
                        Patcher.after(SlashCommandStore, "Kh", (_, args, res) => {
                            if (args[0] !== 1) return;
                            res.push({
                                applicationId: "-1",
                                name: "nei",
                                displayName: "nei",
                                description: "Sends the 'Not Enough Items' (GT:NH Fork) CurseForge project page url.",
                                displayDescription: "Sends the 'Not Enough Items' (GT:NH Fork) CurseForge project page url.",
                                id: (-1 - res.length).toString(),
                                type: 1,
                                target: 1,
                                predicate: () => true,
                                execute: async ([send], {
                                    channel
                                }) => {
                                    try {
                                        MessageActions.sendMessage(
                                            channel.id, {
                                                content: "Use NEI: https://cflookup.com/minecraft/mc-mods/notenoughitems-gtnh",
                                                tts: false,
                                                bottom: true,
                                                invalidEmojis: [],
                                                validNonShortcutEmojis: [],
                                            },
                                            undefined, {}
                                        )
                                    } catch (err) {
                                        Logger.err(err);
                                    }
                                }
                            });
                        })
                    }

                    /* -------------------------------------------------------------------------------- */

                    /* Tell users to use Not Enough Items (Original) */

                    addOLDNEI() {
                        Patcher.after(SlashCommandStore, "Kh", (_, args, res) => {
                            if (args[0] !== 1) return;
                            res.push({
                                applicationId: "-1",
                                name: "oldnei",
                                displayName: "oldnei",
                                description: "Sends the 'Not Enough Items' (Original) CurseForge project page url.",
                                displayDescription: "Sends the 'Not Enough Items' (Original) CurseForge project page url.",
                                id: (-1 - res.length).toString(),
                                type: 1,
                                target: 1,
                                predicate: () => true,
                                execute: async ([send], {
                                    channel
                                }) => {
                                    try {
                                        MessageActions.sendMessage(
                                            channel.id, {
                                                content: "Use NEI: https://cflookup.com/minecraft/mc-mods/notenoughitems",
                                                tts: false,
                                                bottom: true,
                                                invalidEmojis: [],
                                                validNonShortcutEmojis: [],
                                            },
                                            undefined, {}
                                        )
                                    } catch (err) {
                                        Logger.err(err);
                                    }
                                }
                            });
                        })
                    }

                    /* -------------------------------------------------------------------------------- */

                    /* Tell users to use Too Many Items */

                    addTMI() {
                        Patcher.after(SlashCommandStore, "Kh", (_, args, res) => {
                            if (args[0] !== 1) return;
                            res.push({
                                applicationId: "-1",
                                name: "tmi",
                                displayName: "tmi",
                                description: "Sends the 'Too Many Items' CurseForge project page url.",
                                displayDescription: "Sends the 'Too Many Items' CurseForge project page url.",
                                id: (-1 - res.length).toString(),
                                type: 1,
                                target: 1,
                                predicate: () => true,
                                execute: async ([send], {
                                    channel
                                }) => {
                                    try {
                                        MessageActions.sendMessage(
                                            channel.id, {
                                                content: "Use TMI: https://www.minecraftforum.net/forums/mapping-and-modding-java-edition/minecraft-mods/1272385-toomanyitems-the-inventory-editor-and-more-1-8",
                                                tts: false,
                                                bottom: true,
                                                invalidEmojis: [],
                                                validNonShortcutEmojis: [],
                                            },
                                            undefined, {}
                                        )
                                    } catch (err) {
                                        Logger.err(err);
                                    }
                                }
                            });
                        })
                    }


                    /* -------------------------------------------------------------------------------- */

                    /* Tell users to use How Many Items */

                    addHMI() {
                        Patcher.after(SlashCommandStore, "Kh", (_, args, res) => {
                            if (args[0] !== 1) return;
                            res.push({
                                applicationId: "-1",
                                name: "hmi",
                                displayName: "hmi",
                                description: "Sends the 'How Many Items' GitHub releases page url.",
                                displayDescription: "Sends the 'How Many Items' GitHub releases page url.",
                                id: (-1 - res.length).toString(),
                                type: 1,
                                target: 1,
                                predicate: () => true,
                                execute: async ([send], {
                                    channel
                                }) => {
                                    try {
                                        MessageActions.sendMessage(
                                            channel.id, {
                                                content: "Use HMI: https://github.com/rekadoodle/HowManyItems/releases",
                                                tts: false,
                                                bottom: true,
                                                invalidEmojis: [],
                                                validNonShortcutEmojis: [],
                                            },
                                            undefined, {}
                                        )
                                    } catch (err) {
                                        Logger.err(err);
                                    }
                                }
                            });
                        })
                    }

                    onStop() {
                        Patcher.unpatchAll();
                    }

                    getSettingsPanel() {
                        return SettingPanel.build(
                            this.saveSettings.bind(this),
                            new Switch(
                                "Just Enough Items",
                                "Enable the /jei Command",
                                this.jei,
                                (e) => {
                                    this.jei = e;
                                }
                            ),
                            new Switch(
                                "Had Enough Items",
                                "Enable the /hei Command",
                                this.hei,
                                (e) => {
                                    this.hei = e;
                                }
                            ),
                            new Switch(
                                "Roughly Enough Items",
                                "Enable the /rei Command",
                                this.rei,
                                (e) => {
                                    this.rei = e;
                                }
                            ),
                            new Switch(
                                "Not Enough Items (GT:NH Fork)",
                                "Enable the /nei Command",
                                this.nei,
                                (e) => {
                                    this.nei = e;
                                }
                            ),
                            new Switch(
                                "Not Enough Items (Original)",
                                "Enable the /oldnei Command",
                                this.oldnei,
                                (e) => {
                                    this.oldnei = e;
                                }
                            ),
                            new Switch(
                                "Too Many Items",
                                "Enable the /tmi Command",
                                this.tmi,
                                (e) => {
                                    this.tmi = e;
                                }
                            ),
                            new Switch(
                                "How Many Items",
                                "Enable the /hmi Command",
                                this.hmi,
                                (e) => {
                                    this.hmi = e;
                                }
                            )
                        );
                    }
                    saveSettings() {
                        Utilities.saveData(config.info.name, "jei", this.jei);
                        Utilities.saveData(config.info.name, "hei", this.hei);
                        Utilities.saveData(config.info.name, "rei", this.rei);
                        Utilities.saveData(config.info.name, "nei", this.nei);
                        Utilities.saveData(config.info.name, "oldnei", this.oldnei);
                        Utilities.saveData(config.info.name, "tmi", this.tmi);
                        Utilities.saveData(config.info.name, "hmi", this.hmi);
                    }
                };
                return plugin(Plugin, Library);
            })(global.ZeresPluginLibrary.buildPlugin(config));
    })
    ();