
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

	const vscode 			= require('vscode');
	const getCommentSign 	= require('./commentsign');
	const messenger 		= require('messenger');
	const path 				= require('path');
	const fs 				= require('fs');
	const exec        		= require('child_process').exec

//
// ─── ACTIVATE EXTENSION ─────────────────────────────────────────────────────────
//

	function activate ( context ) {
		context.subscriptions.push(
			vscode.commands.registerCommand(
				'orchestra.open', openOrchestraBasedOnRegExp )
		);
	}

	exports.activate = activate;

//
// ─── DEACTIVATE EXTENSION ──────────────────────────────────────────────────────
//

	function deactivate ( ) { };
	exports.deactivate = deactivate;

//
// ─── CLIENT ─────────────────────────────────────────────────────────────────────
//

	const orchestraClient = messenger.createSpeaker( 5994 );

	function sendOpenRequest ( regX ) {
		let command = regX.replace( /"/g, '\\"' );
		let fullCommand =
			`"/Users/pmk/OneDrive/Codes/Orchestra/_release/Orchestra-darwin-x64/Orchestra.app/Contents/MacOS/Orchestra" "parse" "${ command }"`
		exec( fullCommand, err => {
            if ( err )
			vscode.window.showInformationMessage('Could not launch Orchestra')
        })
	}

//
// ─── OPEN ORCHESTRA BASED ON ADDRESS ────────────────────────────────────────────
//

	function openOrchestraBasedOnRegExp ( ) {
		const currentLine = vscode.window.activeTextEditor.selection.active.line;
		const regExp = getRegExpFromLine( );
		if ( regExp !== null | undefined | '' )
			sendOpenRequest( regExp );
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

	function getRegExpFromLine ( ) {
		// defs
		const currentLineNumber = vscode.window.activeTextEditor.selection.active.line;
		const line = getLineAt( currentLineNumber );
		const regXFormula = /(?:\/[^\/]+\/|new(?:\s)+RegExp(?:\s)*\((?:\s)*(['"`])(?:\\\1|[^\1])+\1(?:\s)*\))/g;

		// get regXFormula
		const matches = regXFormula.exec( line );

		// did we find anything?
		if ( matches.length > 1 ) {
			try {
				const regX = eval( matches[ 0 ] );
				if ( regX.constructor.name === "RegExp" )
					// yes! it's a regX
					return regX.source;
			} catch ( e ) {
				return null;
			}
		}
		return null;
	}

// ────────────────────────────────────────────────────────────────────────────────
