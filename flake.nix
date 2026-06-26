{
  description = "Language-agnostic project template with reproducible dev environment";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
  };

  outputs = { self, nixpkgs }:
    let
      supportedSystems = [ "x86_64-linux" "aarch64-linux" "aarch64-darwin" "x86_64-darwin" ];
      forAllSystems = nixpkgs.lib.genAttrs supportedSystems;
    in
    {
      devShells = forAllSystems (system:
        let
          pkgs = nixpkgs.legacyPackages.${system};
        in
        {
          default = pkgs.mkShell {
            packages = with pkgs; [
              # core
              git
              just
              lefthook
              gitleaks

              # add language-specific tools below (or use docs/add-*.md guides)
            ];

            shellHook = ''
              lefthook install
            '';
          };
        }
      );

      templates.default = {
        description = "Language-agnostic project scaffold";
        path = ./.;
      };
    };
}
