'use strict';
import * as vscode from 'vscode';

/**
 * The ID of this extension as configured in the package.json.
 */
export const EXT_ID = 'theme_switcher';
/**
 * The ID of the switch command as configured in the package.json.
 */
export const COMMAND_SWITCH = `${EXT_ID}.switchTheme`;

module Settings {
  /**
   * The name of the vscode theme settings property.
   */
  const SETTING_THEME = 'workbench.colorTheme';
  /**
   * The name of this extension's dark theme setting.
   */
  const SETTING_DARK_THEME = `${EXT_ID}.dark_theme`;
  /**
   * The name of this extension's light theme setting.
   */
  const SETTING_LIGHT_THEME = `${EXT_ID}.light_theme`;

  /**
   * Retrieves and returns the configured dark theme from vscode settings.
   */
  export function dark(): string {
    return vscode.workspace.getConfiguration().get(SETTING_DARK_THEME);
  }

  /**
   * Retrieves and returns the configured light theme from vscode settings.
   */
  export function light(): string {
    return vscode.workspace.getConfiguration().get(SETTING_LIGHT_THEME);
  }

  /**
   * Retrieves and returns the currently active theme from vscode settings.
   */
  export function current(): string {
    return vscode.workspace.getConfiguration().get(SETTING_THEME);
  }

  /**
   * Retrieves and returns the theme, which should be activated next.
   * If the current theme is light, returns the dark theme and vice-versa.
   */
  export function next(): string {
    const currentTheme = current();
    const lightTheme = light();
    const darkTheme = dark();

    return currentTheme === lightTheme ? darkTheme : lightTheme;
  }

  /**
   * Sets the global color theme setting with the given value.
   *
   * @param theme The theme which should be activated.
   */
  export function set(theme: string): void {
    vscode.workspace
      .getConfiguration()
      .update(SETTING_THEME, theme, vscode.ConfigurationTarget.Global);
  }
}

/**
 * Switches the vscode theme to the opposite of the currently active theme.
 */
async function switchTheme() {
  Settings.set(Settings.next());
}

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    COMMAND_SWITCH,
    switchTheme,
  );
  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
