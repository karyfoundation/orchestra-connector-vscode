
const vscode = require('vscode');
const messenger = require('messenger');

//
// ─── ACTIVATE EXTENSION ─────────────────────────────────────────────────────────
//

	function activate ( context ) {
		context.subscriptions.push(
			vscode.commands.registerCommand( 'orchestra.open', ( args ) => {
				sendOpenRequest( 'hello' );
			})
		);
	}

	exports.activate = activate;

//
// ─── DEACTIVEATE EXTENSION ──────────────────────────────────────────────────────
//

	function deactivate ( ) { };
	exports.deactivate = deactivate;

//
// ─── GLOBAL DEFS ────────────────────────────────────────────────────────────────
//

	const orchestraClient = messenger.createSpeaker( 5994 );

	function sendOpenRequest ( address ) {
		orchestraClient.request( 'open', { address: address }, res => {

		});
	}

// ────────────────────────────────────────────────────────────────────────────────
