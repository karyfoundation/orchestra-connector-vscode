
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

	const vscode 			= require('vscode');
	const getCommentSign 	= require('./commentsign');
	const messenger 		= require('messenger');

//
// ─── ACTIVATE EXTENSION ─────────────────────────────────────────────────────────
//

	function activate ( context ) {
		context.subscriptions.push(
			vscode.commands.registerCommand( 'orchestra.open', openOrchestraBasedOnAddress )
		);
	}

	exports.activate = activate;

//
// ─── DEACTIVEATE EXTENSION ──────────────────────────────────────────────────────
//

	function deactivate ( ) { };
	exports.deactivate = deactivate;

//
// ─── CLIENT ─────────────────────────────────────────────────────────────────────
//

	const orchestraClient = messenger.createSpeaker( 5994 );

	function sendOpenRequest ( address ) {
		orchestraClient.request( 'open', address , response => {
			vscode.window.showErrorMessage( response );
		});
	}

//
// ─── OPEN ORCHESTRA BASED ON ADDRESS ────────────────────────────────────────────
//

	function openOrchestraBasedOnAddress ( ) {
		sendOpenRequest(
			getAddress( )
		);
	}

//
// ─── GET CURRENT LINE ───────────────────────────────────────────────────────────
//

	function getCurrentLine ( ) {
		return vscode.window.activeTextEditor.document.lineAt(
			vscode.window.activeTextEditor.selection.active.line
		).text;
	}

//
// ─── GET ADDRESS ────────────────────────────────────────────────────────────────
//

	function getAddress ( ) {
		const languageCommentSign = getCommentSign( );
		const line = getCurrentLine( )
				   .replace( /^\s*\/\/\s*/, '' )
				   .trim( );
		return line;
	}

// ────────────────────────────────────────────────────────────────────────────────
