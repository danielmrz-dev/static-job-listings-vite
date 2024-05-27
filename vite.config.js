import { defineConfig } from "vite";

export default defineConfig({
    base: "/", // Base URL para o projeto
    build: {
        outDir: "dist", // Diretório de saída para os arquivos construídos
        rollupOptions: {
            output: {
                assetFileNames: "assets/[name]-[hash][extname]", // Nomear arquivos de assets
            },
        },
    },
    assetsInclude: ["**/*.png", "**/*.jpg", "**/*.jpeg", "**/*.svg"], // Incluir tipos de arquivos de imagem

    server: {
        port: 3000, // Porta para o servidor de desenvolvimento
    },
    // Outras configurações...
});
