export function generateSecretKey(length = 32) {
  return new Promise((resolve, _reject) => {
    const array = new Uint8Array(length);
    window.crypto.getRandomValues(array);
    const key = btoa(String.fromCharCode.apply(null, Array.from(array))).slice(0, length);
    resolve(key);
  });
}