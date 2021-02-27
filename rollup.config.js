import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import esbuild from 'rollup-plugin-esbuild'
import { chromeExtension, simpleReloader } from 'rollup-plugin-chrome-extension'
import { emptyDir } from 'rollup-plugin-empty-dir'
import zip from 'rollup-plugin-zip'

const production = !process.env.ROLLUP_WATCH

export default {
  input: 'src/manifest.json',
  output: {
    dir: 'dist',
    format: 'esm',
  },
  plugins: [
    chromeExtension(),
    simpleReloader(),
    resolve({
      extensions: ['.js', '.ts'],
    }),
    commonjs(),
    esbuild({}),
    emptyDir(),
    production && zip({ dir: 'releases' }),
  ],
}
