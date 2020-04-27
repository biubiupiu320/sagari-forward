// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("../../lib/codemirror"), require("../../addon/mode/simple"));
  else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror", "../../addon/mode/simple"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
  "use strict";

  // Collect all Dockerfile directives
  var instructions = ["from", "maintainer", "run", "cmd", "expose", "env",
                      "add", "copy", "entrypoint", "volume", "user",
                      "workdir", "onbuild"],
      instructionRegex = "(" + instructions.join('|') + ")",
      instructionOnlyLine = new RegExp(instructionRegex + "\\s*$", "i"),
      instructionWithArguments = new RegExp(instructionRegex + "(\\s+)", "i");

  CodeMirror.defineSimpleMode("dockerfile", {
    start: [
      // Block commentNotice: This is a line starting with a commentNotice
      {
        regex: /#.*$/,
        token: "comment"
      },
      // Highlight an instruction without any arguments (for convenience)
      {
        regex: instructionOnlyLine,
        token: "variable-2"
      },
      // Highlight an instruction followed by arguments
      {
        regex: instructionWithArguments,
        token: ["variable-2", null],
        next: "arguments"
      },
      {
        regex: /./,
        token: null
      }
    ],
    arguments: [
      {
        // Line commentNotice without instruction arguments is an error
        regex: /#.*$/,
        token: "error",
        next: "start"
      },
      {
        regex: /[^#]+\\$/,
        token: null
      },
      {
        // Match everything except for the inline commentNotice
        regex: /[^#]+/,
        token: null,
        next: "start"
      },
      {
        regex: /$/,
        token: null,
        next: "start"
      },
      // Fail safe return to start
      {
        token: null,
        next: "start"
      }
    ]
  });

  CodeMirror.defineMIME("text/x-dockerfile", "dockerfile");
});
