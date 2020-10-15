import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import { terser } from "rollup-plugin-terser";
import typescript from 'rollup-plugin-typescript';

const plugins = [
    commonjs(),
    resolve(),
    typescript({
        target: "es5",
        module: "es2015"
    })
];

if (process.env.MINIFY) {
    plugins.push(terser());
}

export default {
    input: './src/index.ts',
    external: [
        "blakejs",
        "cross-fetch",
        "crypto",
        "tweetnacl"
    ],
    output: {
        file: `dist/iota2.js${process.env.MINIFY ? '.min' : ''}.js`,
        format: 'umd',
        name: 'Iota2',
        compact: process.env.MINIFY,
        globals: {
            "blakejs": "blakejs",
            "cross-fetch": "cross-fetch",
            "crypto": "crypto",
            "tweetnacl": "tweetnacl"
        }
    },
    plugins
}