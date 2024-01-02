const vscode = require("vscode");
const editor = vscode.window.activeTextEditor;

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    let disposable = vscode.workspace.onDidChangeTextDocument((event) => {
        if (editor && event.document === editor.document) {
            const changes = event.contentChanges;
            if (changes.length > 0) {
                const change = changes[0];
                handleTextChange(change);
            }
        }
    });

    context.subscriptions.push(disposable);
}

function handleTextChange(change) {
    const newText = change.text;
    const startPosition = change.range.start;
    const editor = vscode.window.activeTextEditor;

    if (!editor) {
        return;
    }

    const lineText = editor.document.lineAt(startPosition.line).text;

    if (
        newText.length === 1 &&
        isLowerCase(newText) &&
        startPosition.character >= 2
    ) {
        const precedingChars = lineText.substring(
            startPosition.character - 2,
            startPosition.character
        );
        if (precedingChars === "* " || precedingChars === "- ") {
            const capitalized = newText.toUpperCase();
            // Define the range to cover only the lowercase character
            const range = new vscode.Range(
                startPosition, // End of the range is at the cursor position
                startPosition.translate(0, 1) // Start of the range is one character back
            );

            editor.edit((editBuilder) => {
                editBuilder.replace(range, capitalized);
            });
        }
    }
}

function isLowerCase(str) {
    return str === str.toLowerCase() && str !== str.toUpperCase();
}

function deactivate() {}

module.exports = {
    activate,
    deactivate,
};

