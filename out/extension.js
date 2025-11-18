"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = require("vscode");
function activate(context) {
    console.log('Morph Syntax Highlighting extension is now active!');
    // Check if language is registered
    vscode.languages.getLanguages().then(languages => {
        const morphLanguage = languages.includes('morph');
        console.log('Morph language registered:', morphLanguage);
    });
    // Register commands for testing
    const disposable = vscode.commands.registerCommand('morph.helloWorld', () => {
        vscode.window.showInformationMessage('Hello from Morph Syntax Highlighting!');
    });
    context.subscriptions.push(disposable);
}
function deactivate() { }
//# sourceMappingURL=extension.js.map