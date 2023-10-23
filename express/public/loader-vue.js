import("./dist/assets/wp-vite-main.js");

void (() => {
  const reactRefreshTag = document.createElement("script");
  reactRefreshTag.type = "module";
  reactRefreshTag.innerText = `
  import RefreshRuntime from "http://localhost:8080/@react-refresh";
  RefreshRuntime.injectIntoGlobalHook(window);
  window.$RefreshReg$ = () => {};
  window.$RefreshSig$ = () => (type) => type;
  window.__vite_plugin_react_preamble_installed__ = true;
  `;
  const viteTag = document.createElement("script");
  viteTag.type = "module";
  viteTag.src = "http://localhost:8080/@vite/client";
  const mainTag = document.createElement("script");
  mainTag.type = "module";
  mainTag.src = "http://localhost:8080/src/main.tsx";

  document.body.append(reactRefreshTag, viteTag, mainTag);
})();
