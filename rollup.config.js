import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

const plugins = [
    commonjs(),
    resolve({
        browser: process.env.BROWSER
    }),
];

if (process.env.MINIFY) {
    plugins.push(terser());
}

export default {
    input: `./es/index${process.env.BROWSER ? '.browser' : '.node'}.js`,
    output: {
        file: `dist/iota2${process.env.BROWSER ? '.browser' : ''}${process.env.MINIFY ? '.min' : ''}.js`,
        format: 'umd',
        name: 'Iota2',
        compact: process.env.MINIFY,
        globals: {
            "tweetnacl": "tweetnacl",
            "node-fetch": "node-fetch"
        }
    },
    external: (process.env.BROWSER ? [] : ["node-fetch", "tweetnacl"]),
    plugins
}