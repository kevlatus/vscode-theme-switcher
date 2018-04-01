'use strict';
import * as vscode from 'vscode';

const PROP_THEME = 'workbench.colorTheme';
const THEME_DARK = 'Default Dark+';
const THEME_LIGHT = 'Default Light+';

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('theme_swapper.swapTheme', () => {
    const currentTheme = (vscode.workspace.getConfiguration().get(PROP_THEME) as string).toLowerCase();
    if (currentTheme.includes('light')) {
      vscode.workspace.getConfiguration().update(PROP_THEME, THEME_DARK, vscode.ConfigurationTarget.Global);
    } else {
      vscode.workspace.getConfiguration().update(PROP_THEME, THEME_LIGHT, vscode.ConfigurationTarget.Global);
    }
  });

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}