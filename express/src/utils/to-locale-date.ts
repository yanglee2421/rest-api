export function toLocaleDate(...args: Args) {
  return new Date(...args).toLocaleString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "2-digit",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

type Args = ConstructorParameters<typeof Date>;
