import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
import { terser } from 'rollup-plugin-terser';

const plugins = [
    commonjs(),
    resolve({
        browser: process.env.BROWSER
    }),
    replace({
        'process.env.NODE_ENV': JSON.stringify('production')
    })
];

if (process.env.BROWSER) {
    plugins.push(globals());
    plugins.push(builtins());
}

if (process.env.MINIFY) {
    plugins.push(terser());
}

export default {
    input: './es/index.js',
    output: {
        file: `dist/iota2${process.env.BROWSER ? '.browser' : ''}${process.env.MINIFY ? '.min' : ''}.js`,
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
    external: process.env.BROWSER ? [] : [
        "blakejs",
        "cross-fetch",
        "crypto",
        "tweetnacl"
    ],
    plugins
}