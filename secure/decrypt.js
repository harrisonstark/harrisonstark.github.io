(async () => {
  if (window.__DECRYPTED__) return;
  window.__DECRYPTED__ = true;

  // ===============================
  // PASSWORD (hash fragment)
  // ===============================
  const hashParams = new URLSearchParams(location.hash.slice(1));
  const password = hashParams.get("pw");

  const statusEl = document.getElementById("status");

  if (!password) {
    if (statusEl) statusEl.textContent = "Missing password.";
    return;
  }

  // ===============================
  // ACCESS LIMIT (query param)
  // ===============================
  const queryParams = new URLSearchParams(location.search);
  const accessKey = queryParams.get("k");

  const ACCESS_MAP = {
    id5: 1,
    op2: 2,
    kv9: 3,
    uq1: 4
  };

  window.ACCESS_LIMIT = ACCESS_MAP[accessKey] ?? 1;

  try {
    // ===============================
    // LOAD ENCRYPTED CONTENT
    // ===============================
    const resp = await fetch("encrypted.json", { cache: "force-cache" });
    const payload = await resp.json();

    const salt = Uint8Array.from(atob(payload.salt), c => c.charCodeAt(0));
    const iv   = Uint8Array.from(atob(payload.iv),   c => c.charCodeAt(0));
    const data = Uint8Array.from(atob(payload.data), c => c.charCodeAt(0));

    const enc = new TextEncoder();
    const dec = new TextDecoder();

    const keyMaterial = await crypto.subtle.importKey(
      "raw",
      enc.encode(password),
      "PBKDF2",
      false,
      ["deriveKey"]
    );

    const key = await crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt,
        iterations: 250000,
        hash: "SHA-256"
      },
      keyMaterial,
      { name: "AES-GCM", length: 256 },
      false,
      ["decrypt"]
    );

    const plaintext = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv },
      key,
      data
    );

    // ===============================
    // INJECT HTML (NO document.write)
    // ===============================
    const container = document.getElementById("secure-root");
    if (!container) {
      throw new Error("Missing #secure-root container");
    }

    container.innerHTML = dec.decode(plaintext);

    // ===============================
    // RUN ANY SCRIPTS INSIDE THE DECRYPTED HTML
    // ===============================
    const scripts = container.querySelectorAll("script");
    scripts.forEach(oldScript => {
      const newScript = document.createElement("script");
      if (oldScript.src) {
        newScript.src = oldScript.src;
      } else {
        newScript.textContent = oldScript.textContent;
      }
      document.body.appendChild(newScript);
    });

  } catch (err) {
    console.error(err);
    if (statusEl) statusEl.textContent = "Invalid access link.";
  }
})();
