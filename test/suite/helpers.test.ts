import * as assert from 'assert';
import * as vscode from 'vscode';

suite('Helper Function Visibility Tests', () => {
  test('Should highlight function declarations', async () => {
    const document = await vscode.workspace.openTextDocument({
      content: `
        <script>
          function formatDate(date) {
            return new Date(date).toLocaleDateString();
          }
          
          function calculateTotal(items) {
            return items.reduce((sum, item) => sum + item.price, 0);
          }
        </script>
      `,
      language: 'morph',
    });

    await vscode.window.showTextDocument(document);

    const text = document.getText();
    assert.ok(
      text.includes('function formatDate'),
      'Should contain function declaration'
    );
    assert.ok(
      text.includes('function calculateTotal'),
      'Should contain function declaration'
    );
  });

  test('Should highlight variable declarations', async () => {
    const document = await vscode.workspace.openTextDocument({
      content: `
        <script>
          const API_CONFIG = {
            baseUrl: 'https://api.example.com'
          };
          
          let userSession = null;
          
          var globalVar = 'legacy';
        </script>
      `,
      language: 'morph',
    });

    await vscode.window.showTextDocument(document);

    const text = document.getText();
    assert.ok(
      text.includes('const API_CONFIG'),
      'Should contain const declaration'
    );
    assert.ok(
      text.includes('let userSession'),
      'Should contain let declaration'
    );
    assert.ok(text.includes('var globalVar'), 'Should contain var declaration');
  });

  test('Should highlight class declarations', async () => {
    const document = await vscode.workspace.openTextDocument({
      content: `
        <script>
          class UserService {
            constructor() {
              this.users = [];
            }
            
            addUser(user) {
              this.users.push(user);
            }
          }
        </script>
      `,
      language: 'morph',
    });

    await vscode.window.showTextDocument(document);

    const text = document.getText();
    assert.ok(
      text.includes('class UserService'),
      'Should contain class declaration'
    );
  });

  test('Should highlight arrow functions', async () => {
    const document = await vscode.workspace.openTextDocument({
      content: `
        <script>
          const validateEmail = (email) => {
            // eslint-disable-next-line no-useless-escape
            return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
          };
        </script>
      `,
      language: 'morph',
    });

    await vscode.window.showTextDocument(document);

    const text = document.getText();
    assert.ok(
      text.includes('const validateEmail'),
      'Should contain arrow function declaration'
    );
  });

  test('Should distinguish functions from variables', async () => {
    const document = await vscode.workspace.openTextDocument({
      content: `
        <script>
          function formatDate(date) {
            return new Date(date).toLocaleDateString();
          }
          
          const formatDate = 'string variable';
        </script>
      `,
      language: 'morph',
    });

    await vscode.window.showTextDocument(document);

    const text = document.getText();
    assert.ok(
      text.includes('function formatDate'),
      'Should contain function declaration'
    );
    assert.ok(
      text.includes('const formatDate'),
      'Should contain variable declaration'
    );
  });
});
