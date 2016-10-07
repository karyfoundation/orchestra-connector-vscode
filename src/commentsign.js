
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    const vscode = require('vscode');

//
// ─── RETURN LANGUAGE COMMENT SIGN ───────────────────────────────────────────────
//

    module.exports = ( ) => {
        switch ( vscode.window.activeTextEditor.document.languageId ) {
            case 'arendelle':
            case 'pageman':
            case 'javascript':
            case 'javascriptreact':
            case 'typescript':
            case 'typescriptreact':
            case 'swift':
            case 'csharp':
            case 'cpp':
            case 'objective-c':
            case 'processing':
            case 'java':
            case 'json':
            case 'rust':
            case 'go':
            case 'scala':
            case 'qml':
            case 'stylus':
            case 'groovy':
            case 'less':
            case 'php':
                return '//';

            case 'ruby':
            case 'python':
            case 'julia':
            case 'make':
            case 'makefile':
            case 'shell':
            case 'bash':
            case 'shellscript':
            case 'coffeescript':
            case 'powershell':
            case 'perl':
            case 'r':
            case 'yaml':
            case 'yml':
                return '#';

            case 'tex':
            case 'latex':
            case 'matlab':
            case 'octave':
                return '%';

            case 'lua':
            case 'haskell':
            case 'elm':
                return '--';

            case 'scheme':
            case 'racket':
            case 'lisp':
            case 'clojure':
                return ';;;';

            case 'bat':
                return '::';

            case 'vb':
                return "'";

            case 'plaintext':
                return commentLineCharacter + commentLineCharacter;

            default :
                return null;
        }
    }

// ────────────────────────────────────────────────────────────────────────────────

