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

    let command = vscode.commands.registerCommand(
        "extension.capitalizeMarkdownList",
        () => {
            capitalizeListItems();
        }
    );
    context.subscriptions.push(command);
}

function capitalizeListItems() {
    if (!editor) {
        return;
    }
    const document = editor.document;
    editor.edit((editBuilder) => {
        for (let i = 0; i < document.lineCount; i++) {
            const line = document.lineAt(i);
            if (
                line.text.trim().startsWith("* ") ||
                line.text.trim().startsWith("- ")
            ) {
                const capitalizedText = line.text.replace(
                    /(\* |- )([a-z])/g,
                    (match, p1, p2) => {
                        return p1 + p2.toUpperCase();
                    }
                );

                const range = new vscode.Range(
                    line.range.start,
                    line.range.end
                );
                editBuilder.replace(range, capitalizedText);
            }
        }
    });
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

