export function timeout() {
  return new Promise((res) => {
    setTimeout(res, 200);
  });
}
