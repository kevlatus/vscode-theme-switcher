'use strict';
import * as vscode from 'vscode';

export const NAMESPACE = 'theme_switcher';
export const COMMAND_SWITCH = `${NAMESPACE}.switchTheme`;
export const PROP_THEME = 'workbench.colorTheme';
export const PROP_DARK_THEME = `${NAMESPACE}.dark_theme`;
export const PROP_LIGHT_THEME = `${NAMESPACE}.light_theme`;

function getDarkTheme(): string {
  return vscode.workspace.getConfiguration().get(PROP_DARK_THEME);
}

function getLightTheme(): string {
  return vscode.workspace.getConfiguration().get(PROP_LIGHT_THEME);
}

function getCurrentTheme(): string {
  return vscode.workspace.getConfiguration().get(PROP_THEME);
}

function getNextTheme(): string {
  const currentTheme = getCurrentTheme();
  const lightTheme = getLightTheme();
  const darkTheme = getDarkTheme();

  return currentTheme === lightTheme ? darkTheme : lightTheme;
}

function setTheme(theme: string): void {
  vscode.workspace.getConfiguration().update(PROP_THEME, theme, vscode.ConfigurationTarget.Global);
}

async function switchTheme() {
  const nextTheme = getNextTheme();
  setTheme(nextTheme);
}

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(COMMAND_SWITCH, switchTheme);
  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}
