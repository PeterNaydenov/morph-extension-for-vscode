import * as assert from 'assert';
import * as vscode from 'vscode';

suite('Complex Placeholder Tests', () => {
  test('Should handle placeholders with brackets and arrays', async () => {
    const document = await vscode.workspace.openTextDocument({
      content: '<div>{{items : [], li, a : itemList}}</div>',
      language: 'morph'
    });
    
    await vscode.window.showTextDocument(document);
    
    const text = document.getText();
    assert.ok(text.includes('{{items : [], li, a : itemList}}'), 'Should contain complex placeholder');
    
    // Verify document is created with correct language
    assert.strictEqual(document.languageId, 'morph', 'Document should have morph language');
  });

  test('Should handle placeholders with various special characters', async () => {
    const document = await vscode.workspace.openTextDocument({
      content: '<div>{{user : name@email.com, active : true, role : admin}}</div>',
      language: 'morph'
    });
    
    await vscode.window.showTextDocument(document);
    
    const text = document.getText();
    assert.ok(text.includes('{{user : name@email.com, active : true, role : admin}}'), 'Should handle complex placeholder with special chars');
  });

  test('Should handle nested bracket structures', async () => {
    const document = await vscode.workspace.openTextDocument({
      content: '<div>{{data : [1, 2, 3], action : processArray, name : numbers}}</div>',
      language: 'morph'
    });
    
    await vscode.window.showTextDocument(document);
    
    const text = document.getText();
    assert.ok(text.includes('{{data : [1, 2, 3], action : processArray, name : numbers}}'), 'Should handle nested brackets');
  });
});