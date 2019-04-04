'use strict';
import * as vscode from 'vscode';

import { PROP_THEME, COMMAND_SWITCH, PROP_DARK_THEME, PROP_LIGHT_THEME } from './constants';
import { uuid } from './util';
import { trackEvent } from './analytics';

let userId: string;

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
  
  await trackEvent(userId, 'command', 'switch-theme', 'switch-theme', 'switch-theme');
}

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(COMMAND_SWITCH, switchTheme);
  context.subscriptions.push(disposable);

  userId = context.globalState.get<string>('userId');
  if (!userId) {
    userId = uuid();
    context.globalState.update('userId', userId);
  }
}

// this method is called when your extension is deactivated
export function deactivate() {
}