import * as vscode from 'vscode';
import { dirtyTrace } from './dirtytrace';
import { goLogField } from './gologfield';

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "goodies" is now active!');

	context.subscriptions.push(vscode.commands.registerTextEditorCommand(
		'extension.dirtyTraceBefore',
		(textEditor) => dirtyTrace(textEditor, "before")
	));
	context.subscriptions.push(vscode.commands.registerTextEditorCommand(
		'extension.dirtyTraceAfter',
		(textEditor) => dirtyTrace(textEditor, "after")
	));
	context.subscriptions.push(vscode.commands.registerTextEditorCommand(
		'extension.goLogField',
		goLogField
	));
}

export function deactivate() {}
