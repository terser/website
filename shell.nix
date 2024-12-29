with import <nixpkgs> {};

stdenv.mkDerivation {
    name = "node";
    buildInputs = [
        nodejs_22
        autoconf
        automake
        (yarn.override { nodejs = nodejs_22; })
        bash
        docker-compose
    ];

    shellHook = ''
        export PATH="$PWD/node_modules/.bin/:$PATH"
        . ~/.bashrc
    '';
}
