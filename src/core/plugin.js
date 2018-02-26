/**
  * The global props, every component can get this props
  * The inspiration is from http://eggjs.org/
  *
  */

export let plugins = {};

export function addPlugins(extraPlugins = []) {
  plugins = { ...plugins, ...extraPlugins };
}