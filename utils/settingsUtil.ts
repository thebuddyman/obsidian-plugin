import { Plugin } from "obsidian";

export interface PluginSettings {
    apiKey: string;
}

export const DEFAULT_SETTINGS: PluginSettings = {
    apiKey: '' // or an empty string ''
};

// export const DEFAULT_SETTINGS: PluginSettings = {
//     apiKey: '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'
// };

export function loadPluginSettings(plugin: Plugin): Promise<PluginSettings> {
    return plugin.loadData().then(data => {
        return { ...DEFAULT_SETTINGS, ...data };
    });
}

export function savePluginSettings(plugin: Plugin, settings: PluginSettings): Promise<void> {
    return plugin.saveData(settings);
}
