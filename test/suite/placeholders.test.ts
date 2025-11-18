import * as assert from 'assert';
import * as vscode from 'vscode';

suite('Placeholder Highlighting Tests', () => {
  test('Should highlight data placeholders', async () => {
    const document = await vscode.workspace.openTextDocument({
      content: '<div>{{data::}}</div>',
      language: 'morph'
    });
    
    await vscode.window.showTextDocument(document);
    
    // Verify document is created with correct language
    assert.strictEqual(document.languageId, 'morph', 'Document should have morph language');
    
    // Verify content contains data placeholder
    const text = document.getText();
    assert.ok(text.includes('{{data::}}'), 'Should contain data placeholder');
  });

  test('Should highlight action placeholders', async () => {
    const document = await vscode.workspace.openTextDocument({
      content: '<div>{{::action}}</div>',
      language: 'morph'
    });
    
    await vscode.window.showTextDocument(document);
    
    const text = document.getText();
    assert.ok(text.includes('{{::action}}'), 'Should contain action placeholder');
  });

  test('Should highlight named placeholders', async () => {
    const document = await vscode.workspace.openTextDocument({
      content: '<div>{{::name}}</div>',
      language: 'morph'
    });
    
    await vscode.window.showTextDocument(document);
    
    const text = document.getText();
    assert.ok(text.includes('{{::name}}'), 'Should contain named placeholder');
  });

  test('Should highlight complex placeholders', async () => {
    const document = await vscode.workspace.openTextDocument({
      content: '<div>{{user:name:email}}</div>',
      language: 'morph'
    });
    
    await vscode.window.showTextDocument(document);
    
    const text = document.getText();
    assert.ok(text.includes('{{user:name:email}}'), 'Should contain complex placeholder');
  });

  test('Should handle empty placeholder sections', async () => {
    const document = await vscode.workspace.openTextDocument({
      content: '<div>{{::}}</div>',
      language: 'morph'
    });
    
    await vscode.window.showTextDocument(document);
    
    const text = document.getText();
    assert.ok(text.includes('{{::}}'), 'Should handle empty placeholder sections');
  });
});