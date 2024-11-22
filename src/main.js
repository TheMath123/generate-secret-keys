const inputKey = document.getElementById("input-key");
const textKeyLength = document.getElementById("text-key-length");
let key = "";
inputKey.value = "ASBjQbHLenF+SmrhE5sC+6TRCQyyeDPz";
function generateSecureKey(length = 32) {
  return new Promise((resolve, reject) => {
    const array = new Uint8Array(length);
    window.crypto.getRandomValues(array);
    const key = btoa(String.fromCharCode.apply(null, array)).slice(0, length);
    resolve(key);
  });
}

async function main() {
  try {
    key = await generateSecureKey();
    inputKey.value = key;
    textKeyLength.innerText = key.length;
  } catch (e) {
    console.error("Error generating key:", e);
  }
}

function copyKey() {
  navigator.clipboard.writeText(key);
}
