import * as vscode from 'vscode';

const JAVASCRIPT = ["javascript", "javascriptreact", "typescript", "typescriptreact"];

export type Where = "before" | "after";

export function dirtyTrace(textEditor: vscode.TextEditor, where: Where) {
    const position = textEditor.selection.active;
    const language = textEditor.document.languageId;
    const line = where === "before" ? position.line : position.line + 1;
    if (JAVASCRIPT.indexOf(language) !== -1) {
        textEditor.insertSnippet(new vscode.SnippetString(
            "// DIRTY TRACE START //////////////////////////////////\n" +
            "console.error('DT', ${1:value});\n" +
            "// DIRTY TRACE END ////////////////////////////////////\n"),
            new vscode.Position(line, 0)
        );
    } else if (language === "python") {
        const textLine = textEditor.document.lineAt(position.line);
        const indent = textLine.text.slice(0, textLine.firstNonWhitespaceCharacterIndex);
        textEditor.insertSnippet(new vscode.SnippetString(
            "### DIRTY TRACE START ###############################\n" +
            indent + `print('X'*100, '${textEditor.document.fileName}:${line + 1}')\n` +
            "### DIRTY TRACE END #################################\n"),
            new vscode.Position(line, 0)
        );
    } else {
        vscode.window.showErrorMessage(`Dirty Trace: language ${language} is not yet supported`);
    }
}
