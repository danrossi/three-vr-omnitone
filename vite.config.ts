import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'unplugin-dts/vite';

export default defineConfig(({ mode }) => {
  return {
    root: '.',
    envDir: resolve(import.meta.dirname),
    plugins: [
      dts({
        outDirs: './build',

        //entryRoot: './src',
        declarationOnly: true,
        //bundleTypes: true,
        // tsconfigPath: './tsconfig.json',
      }),
    ],

    resolve: {
      //alias: {},
    },
    define: {
      // Statically replaces process.env.NODE_ENV with the current string mode
      'process.env.NODE_ENV': JSON.stringify(mode),
    },
    build: {
      //minify: "terser",
      minify: false,
      outDir: 'build',
      sourcemap: false,
      //license: true,
      emptyOutDir: false,
      lib: {
        entry: ['./index.js'],
        fileName: (format, entryName) => {
          return `three-vr-omnitone.module.js`;
        },
        formats: ['es'],
      },
      rolldownOptions: {
        external: ['three', 'omnitone/build/omnitone.min.esm.js'],

        output: {
          format: 'es',
          globals: {
            //'omnitone/build/omnitone.min.esm.js': 'Omnitone',
          },

          // Inlines dynamic imports to prevent separate chunk files
          codeSplitting: false,
          comments: false,
        },
      },
    },
  };
});
