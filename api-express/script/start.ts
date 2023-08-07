#! pnpm tsx

// NodeJs Imports
import { dirname, resolve } from "node:path";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

// Third Imports
import { Service } from "node-windows";

const __dirname = dirname(fileURLToPath(import.meta.url));
const scriptPath = resolve(__dirname, "../dist/main.min.js");

// ** Service
const service = new Service({
  name: "A Node.js service by Yang Lee",
  script: scriptPath,
  description: "A Node.js service by Yang Lee",
  abortOnError: true,
});
service.on("install", () => {
  console.log("安装成功！");
});
service.on("uninstall", () => {
  console.log("卸载成功！");
});

const isInstall = toIsArgv("--install");
const isUninstall = toIsArgv("--uninstall");

const bootstrap = async () => {
  try {
    if (isUninstall) {
      return service.uninstall();
    }
    if (isInstall) {
      await readFile(scriptPath, "utf8");
      return service.install();
    }
    service.start();
  } catch (err) {
    console.error("安装时出现了一些问题，可能是没有打包");
  }
};

bootstrap();

function toIsArgv(argv: string) {
  return process.argv.some((item) => item.includes(argv));
}
