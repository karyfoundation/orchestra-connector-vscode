
const vscode = require('vscode');
const messenger = require('messenger');

//
// ─── ACTIVATE EXTENSION ─────────────────────────────────────────────────────────
//

	exports.activate = context => {
		for ( let language of [ 'typescript', 'javascript' ] ) {
            context.subscriptions.push(
				
            );
        }
	}

//
// ─── DEACTIVEATE EXTENSION ──────────────────────────────────────────────────────
//

	exports.deactivate = ( ) => { };

// ────────────────────────────────────────────────────────────────────────────────
