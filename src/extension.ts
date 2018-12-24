'use strict';
import * as vscode from 'vscode';

import { PROP_THEME, COMMAND_SWITCH, PROP_DARK_THEME, PROP_LIGHT_THEME } from './constants';

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

function switchTheme() {
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