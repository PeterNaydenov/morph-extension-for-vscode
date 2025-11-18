import * as assert from 'assert';
import * as vscode from 'vscode';
suite('Extension Test Suite', () => {
    test('Should register morph language', async () => {
        const languages = await vscode.languages.getLanguages();
        assert.ok(languages.includes('morph'), 'Morph language should be registered');
    });
    test('Should open morph file with correct language', async () => {
        const document = await vscode.workspace.openTextDocument({
            content: '<div>{{::test}}</div>',
            language: 'morph'
        });
        assert.strictEqual(document.languageId, 'morph', 'Document should have morph language');
    });
});
//# sourceMappingURL=extension.test.js.map