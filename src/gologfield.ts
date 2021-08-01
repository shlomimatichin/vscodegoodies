import * as vscode from 'vscode';

export function goLogField(textEditor: vscode.TextEditor) {
    const position = textEditor.selection.active;
    const language = textEditor.document.languageId;
    let folder = "NO WORKSPACE FOLDER";
    if (vscode.workspace.workspaceFolders) {
        folder = vscode.workspace.workspaceFolders[0].uri.path;
    }
    let fileName = textEditor.document.fileName;
    if (fileName.startsWith(folder)) {
        fileName = fileName.slice(folder.length + 1)
    }
    if (language === "go") {
        const textLine = textEditor.document.lineAt(position.line);
        const PREFIX = "log.";
        const nonWhitespace = textLine.text.slice(textLine.firstNonWhitespaceCharacterIndex);
        if (!nonWhitespace.startsWith(PREFIX)) {
            vscode.window.showErrorMessage(`Log Field: line does not start with ${PREFIX}`);
            return;
        }
        textEditor.insertSnippet(
            new vscode.SnippetString("WithField(\"$0\", $0)."),
            new vscode.Position(position.line, textLine.firstNonWhitespaceCharacterIndex + PREFIX.length)
        );
    } else {
        vscode.window.showErrorMessage(`Log Field: language ${language} is not yet supported`);
    }
}
