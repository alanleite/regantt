import babel from 'rollup-plugin-babel'
import replace from 'rollup-plugin-replace'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

const NODE_ENV = process.env.NODE_ENV || "development";

const outputFile = NODE_ENV === "production" ? "./lib/prod.js" : "./lib/dev.js";

module.exports = {
    input: "./src/index.js",
    external: ['styled-components'],
    output: {
        file: outputFile,
        format: "cjs"
    },
    plugins: [
        replace({
            "process.env.NODE_ENV": JSON.stringify(NODE_ENV)
        }),
        babel({
            exclude: "node_modules/**"
        }),
        resolve(),
        commonjs({
            include: 'node_modules/**',
            namedExports: {
                'node_modules/react-is/index.js': ['isValidElementType']
            }
        })
    ]
}