import esbuild from "esbuild";

// Build côté serveur Node.js
esbuild.build({
    entryPoints: ["src/index.ts"], // point d'entrée principal
    bundle: true,                  // bundle tous les imports
    platform: "node",              // cible Node.js
    target: ["node24"],            // version de Node
    outfile: "dist/index.js",      // fichier de sortie
    sourcemap: true,               // source map pour debug
    minify: false,                 // pas besoin de minifier côté serveur
    external: ["mongodb", "dotenv"], // garder les dépendances externes non bundle
    format: "esm",
}).then(() => {
    console.log("✅ Build terminé !");
}).catch((err) => {
    console.error(err);
    process.exit(1);
});


//  watch: {
//     onRebuild(error) {
//       if (error) console.error("❌ rebuild failed:", error);
//       else console.log("✅ rebuild finished");
//     }
//   }