
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

	const vscode 			= require('vscode');
	const getCommentSign 	= require('./commentsign');
	const messenger 		= require('messenger');
	const path 				= require('path');
	const fs 				= require('fs');

//
// ─── ACTIVATE EXTENSION ─────────────────────────────────────────────────────────
//

	function activate ( context ) {
		context.subscriptions.push(
			vscode.commands.registerCommand(
				'orchestra.open', openOrchestraBasedOnAddress )
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
		// get address
		const commentAddress = getAddressFromComment( );
		if ( commentAddress === null ) return;

		// resolve address
		const address;
		if ( existsSync( commentAddress ) ) {
			address = commentAddress;
		} else {
			address = path.normalize(
				path.join(
					vscode.window.activeTextEditor.document.fileName.replace(/[^\/]*$/, ''),
					commentAddress
				)
			);
		}

		vscode.window.showErrorMessage( address );

		// open address
		sendOpenRequest( address );
	}

//
// ─── GET CURRENT LINE ───────────────────────────────────────────────────────────
//

	function getLineAt ( lineNumber ) {
		return vscode.window.activeTextEditor.document.lineAt( lineNumber ).text;
	}

//
// ─── GET ADDRESS ────────────────────────────────────────────────────────────────
//

	function getAddressFromComment ( ) {
		// defs
		const languageCommentSign = getCommentSign( );
		const currentLineNumber = vscode.window.activeTextEditor.selection.active.line;

		// finding the comment line
		var lineNum = currentLineNumber;
		while ( true ) {
			var line = getLineAt( lineNum );
			if ( /^\s*\/\/\s*.+\.quartet\s*/.test( line ) ) {
				return line.trim( ).replace(/^\s*\/\/\s*/, '');

			} else if ( lineNum === 1 ) {
				return null;

			} else if ( lineNum === currentLineNumber ) {
				lineNum--;

			} else if ( /^\s*$/.test( line ) && lineNum > 1 ) {
				lineNum--;

			} else {
				vscode.window.showErrorMessage('No Quartet file reference was found.');
				return null;
			}
		}
	}

//
// ─── FS EXSISTS ─────────────────────────────────────────────────────────────────
//

	function existsSync ( filename ) {
        try {
            fs.accessSync( filename );
            return true;
        } catch( ex ) {
            return false;
        }
    }


// ────────────────────────────────────────────────────────────────────────────────
