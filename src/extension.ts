// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import {
    commands,
    Disposable,
    Event,
    EventEmitter,
    FileType,
    Uri,
    TreeDataProvider,
    TreeItem,
    TreeItemCollapsibleState,
    window,
    workspace,
    ExtensionContext
} from 'vscode';

interface Entry { 
	key: string;
 }
 
class TestTreeDataProvider implements TreeDataProvider<{ key: string }> {

    async getChildren(element?: Entry): Promise<{ key: string }[]> {
		if (!element) {
			return [{key: "a"}];
		}
		if (element.key === "a") {
			return [{key: "b"}];
		}
		return [];
    }

    getTreeItem(element: Entry): TreeItem {
        return new TreeItem(
            element.key,
            TreeItemCollapsibleState.Collapsed
        );
    }

    async getParent(element: Entry): Promise<Entry | undefined> {
        return element.key === "b" ? {key: "a"} : undefined;
    }

    
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "vscode-tree-expand" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = commands.registerCommand('vscode-tree-expand.revealb', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		window.showInformationMessage('Revealing b!');
		testExplorerTreeView.reveal({key: "b"});
	});

	const treeDataProvider = new TestTreeDataProvider();
    const testExplorerTreeView = window.createTreeView<Entry>('amiram.testview', {
        treeDataProvider
    });


	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
