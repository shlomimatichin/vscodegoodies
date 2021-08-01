import * as vscode from 'vscode';

export async function goFoldErrors(textEditor: vscode.TextEditor) {
    // const current = textEditor.selection;
    const language = textEditor.document.languageId;
    if (language !== "go") {
        vscode.window.showErrorMessage(`Dirty Trace: language ${language} is not yet supported`);
        return
    }
    const regex = /^[ \t]*if (err.? != nil|\!ok)/;
    for (let i = textEditor.document.lineCount - 1; i >= 0 ; i--) {
        const textLine = textEditor.document.lineAt(i);
        if (textLine.text.search(regex) !== -1) {
            // textEditor.selection = new vscode.Selection(i, 0, i, 0);
            await vscode.commands.executeCommand('editor.fold', {selectionLines: [i]});
        }
    }
    // textEditor.selection = current;
}
