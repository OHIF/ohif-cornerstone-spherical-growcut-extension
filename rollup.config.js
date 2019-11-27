import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import {terser} from 'rollup-plugin-terser';

export default {
    input: 'src/index.js',
    output: [
        {
            file: 'bundle.js',
            format: 'cjs'
        },
        {
            file: 'bundle.es.js',
            format: 'esm',
        },
        {
            file: 'bundle.min.js',
            format: 'iife',
            name: 'OHIFGrowcutExt',
            plugins: [terser()]
        }
    ],
    plugins: [
        // ohif-step not published w/ esm or es5 target
        babel({ exclude: 'node_modules/** '}),
        resolve({ extensions: ['.js'] }),
        // Docs: https://github.com/rollup/rollup-plugin-commonjs
        commonjs({
            // explicitly specify unresolvable named exports
            namedExports: {
                'ohif-step': ['fields', 'GrowCutGenerator', 'step', 'init'],
                'dcmjs': ['derivations', 'data']
            },
        }),
    ]
  };