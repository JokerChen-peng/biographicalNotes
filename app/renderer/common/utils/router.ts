/**
 * @description 判断是否属于外部链接
 * @param {string} url - 链接
 */
 import { compile } from 'path-to-regexp/dist/index.js';

 export function compilePath(route: string, params?: { [key: string]: any }) {
   const toPath = compile(route, { encode: encodeURIComponent });
   return toPath(params);
 }
export function isHttpOrHttpsUrl(url: string): boolean{
  let regRule =/(http|https):\/\/([\w.]+\/?)\S*/;
  return regRule.test(url.toLowerCase())
}