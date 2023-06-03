with import <nixpkgs> {};

stdenv.mkDerivation {
    name = "node";
    buildInputs = [
        nodejs-16_x
        autoconf
        automake
        yarn
        bash
        docker-compose
    ];

    shellHook = ''
        export PATH="$PWD/node_modules/.bin/:$PATH"
        . ~/.bashrc
    '';
}
