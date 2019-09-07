import * as vscode from 'vscode';
import { dirtyTrace } from './dirtytrace';

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "goodies" is now active!');

	let disposable = vscode.commands.registerTextEditorCommand('extension.dirtyTraceBefore',
		(textEditor) => dirtyTrace(textEditor, "before"));
	context.subscriptions.push(disposable);
	disposable = vscode.commands.registerTextEditorCommand('extension.dirtyTraceAfter',
		(textEditor) => dirtyTrace(textEditor, "after"));

}

export function deactivate() {}
