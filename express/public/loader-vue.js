import("./dist/assets/wp-vite-main.js");

void (() => {
  const scriptTag1 = document.createElement("script");
  scriptTag1.type = "module";
  scriptTag1.innerText = `
  import RefreshRuntime from "http://localhost:5173/@react-refresh";
  RefreshRuntime.injectIntoGlobalHook(window);
  window.$RefreshReg$ = () => {};
  window.$RefreshSig$ = () => (type) => type;
  window.__vite_plugin_react_preamble_installed__ = true;
  `;
  const scriptTag2 = document.createElement("script");
  scriptTag2.type = "module";
  scriptTag2.src = "http://localhost:5173/@vite/client";
  const scriptTag3 = document.createElement("script");
  scriptTag3.type = "module";
  scriptTag3.src = "http://localhost:5173/src/main.tsx";
})();
