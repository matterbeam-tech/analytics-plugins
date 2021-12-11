declare module "@segment/load-script" {
  type Options = string | { src: string } | { http: string; https: string };

  type Callback = (err: Error | null, evt: Error) => unknown;

  function loadScript(options: Options, cb?: Callback): HTMLScriptElement;

  export default loadScript;
}
