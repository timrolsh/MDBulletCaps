// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    let disposable = vscode.workspace.onDidChangeTextDocument((event) => {




        console.log("changed")
        // const editor = vscode.window.activeTextEditor;
        // if (editor && editor.document.languageId === "markdown") {
        //     const changes = event.contentChanges;
        //     changes.forEach((change) => {
        //         if (change.text === "$") {
        //             const position = change.range.start;
        //             editor.edit((editBuilder) => {
        //                 editBuilder.insert(position.translate(0, 1), "$");
        //             });
        //         }
        //     });
        // }
    });

    context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
    activate,
    deactivate,
};

