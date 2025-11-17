"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
function activate(context) {
    console.log('Morph Syntax Highlighting extension is now active!');
    // Check if language is registered
    vscode.languages.getLanguages().then(languages => {
        const morphLanguage = languages.includes('morph');
        console.log('Morph language registered:', morphLanguage);
    });
    // Register commands for testing
    let disposable = vscode.commands.registerCommand('morph.helloWorld', () => {
        vscode.window.showInformationMessage('Hello from Morph Syntax Highlighting!');
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map