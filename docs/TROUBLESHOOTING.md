# Troubleshooting Guide

This guide covers common issues encountered when running JS AI Coach in the
browser, with a focus on the in-browser AI model (powered by Transformers.js /
ONNX WebAssembly).

---

## Browser Compatibility

JS AI Coach requires a modern browser with WebAssembly and ES module support.

| Browser | Minimum version | Notes |
|---------|-----------------|-------|
| Chrome / Chromium | 79+ | Full support including SharedArrayBuffer |
| Firefox | 79+ | Full support |
| Safari | 14.1+ | Full support; older versions lack COOP/COEP headers |
| Edge | 79+ (Chromium) | Full support |
| Mobile Chrome (Android) | 80+ | Works; model downloads may be slow on mobile data |
| Mobile Safari (iOS) | 15.4+ | WebAssembly SIMD support added in 15.4 |

Browsers not listed above (Internet Explorer, legacy Edge, Opera Mini, etc.)
are **not supported**.

---

## Checking WebAssembly Support

Open the browser's developer console (F12) and run:

```js
typeof WebAssembly !== 'undefined' && typeof WebAssembly.instantiate === 'function'
// Expected: true
```

If this returns `false`:

- Update your browser to the latest version.
- If you are behind a corporate proxy or firewall, WebAssembly may be blocked by
  a content security policy. Ask your IT team to whitelist `wasm-eval` and
  `wasm-unsafe-eval` in the CSP.

---

## SharedArrayBuffer and COOP/COEP Headers

Some Transformers.js operations can benefit from `SharedArrayBuffer` for
multi-threaded ONNX inference. `SharedArrayBuffer` requires the page to be
served with these HTTP headers:

```
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Embedder-Policy: require-corp
```

**GitHub Pages serves these headers correctly** for the
`jpgarbanzo.github.io/js-ai-coach/` origin, so no configuration is needed in
production.

When running locally with `npm run dev`, Vite's dev server does **not** set
these headers by default. If you see a `SharedArrayBuffer is not defined` error
locally, either:

1. Add the headers to `vite.config.js`:

```js
server: {
  headers: {
    'Cross-Origin-Opener-Policy': 'same-origin',
    'Cross-Origin-Embedder-Policy': 'require-corp',
  },
},
```

2. Or switch the AI coach to "No Coach" mode while developing locally. The app
   works fully without any model loaded.

---

## Checking Whether a Model Is Loading Correctly

1. Open the browser developer tools (F12).
2. Go to the **Network** tab and filter by "Fetch/XHR" or type `onnx` in the
   filter box.
3. Trigger a model load by selecting a model in the Navigation bar.
4. You should see requests to `https://huggingface.co/` (or the CDN mirror)
   downloading `.onnx` and tokenizer files.
5. A progress indicator appears in the AI Coach panel while the model downloads.

You can also check the **Application** tab > **Cache Storage** to see which
model files have already been cached in the browser.

---

## Common Errors and Solutions

### "WebAssembly not supported"

**Symptom:** A warning banner appears in the AI Coach panel or on the
TroubleshootPage stating that WebAssembly is unavailable.

**Causes and fixes:**

- Browser is too old. Update to a supported version (see compatibility table
  above).
- WebAssembly is disabled via browser flags. In Chrome, navigate to
  `chrome://flags` and search for "WebAssembly"; ensure it is not disabled.
- Corporate network CSP blocks WebAssembly. Ask IT to allow `wasm-eval`.

---

### Model download stuck / spinner never stops

**Symptom:** The model loading progress bar stops partway through and never
completes.

**Causes and fixes:**

1. **Slow or intermittent internet connection.** Model files range from ~270 MB
   (SmolLM2-135M) to ~7.6 GB (Phi-3-mini). On slow connections this can take
   several minutes. Wait and monitor the Network tab to confirm bytes are still
   transferring.

2. **Browser storage quota reached.** If the browser has exceeded its storage
   quota the cache write will fail silently. Check the console for
   `QuotaExceededError`. Fix: clear cached models (see below) and try again.

3. **CORS error from Hugging Face CDN.** This should not happen with the
   default Transformers.js CDN, but if you see a CORS error in the console,
   reload the page. If the error persists, the CDN may be temporarily
   unavailable.

4. **Service worker conflict.** If another service worker is intercepting
   requests, unregister it via **Application > Service Workers** in DevTools,
   then reload.

---

### Out of memory / tab crashes

**Symptom:** The browser tab becomes unresponsive or crashes, often with a
"Aw, Snap!" page (Chrome) or similar.

**Causes and fixes:**

- **Phi-3-mini (small model) on a device with limited RAM.** This model
  requires approximately 7.6 GB of memory. Devices with 8 GB of RAM or less
  will likely run out. Switch to the SmolLM2-135M (tiny) model or the "No
  Coach" mode.
- **Multiple large tabs open.** Close other tabs to free memory before loading
  a large model.
- **32-bit browser.** 32-bit processes have a 2 GB address space limit. Use a
  64-bit browser.

---

### "Model not found" / 404 error from Hugging Face

**Symptom:** The console shows a 404 error for a model URL such as
`https://huggingface.co/HuggingFaceTB/SmolLM2-135M-Instruct/...`.

**Causes and fixes:**

- The model repository was moved or renamed on Hugging Face. Check the model ID
  in `src/utils/aiCoach.js` and update it if needed.
- The Hugging Face Hub is temporarily unavailable. Check
  https://status.huggingface.co/ and try again later.
- You are offline. The model has not been cached yet and cannot be downloaded
  without an internet connection. Connect to the internet or use "No Coach"
  mode.

---

### "Failed to load model: TypeError: Failed to fetch"

**Symptom:** Console shows a `Failed to fetch` error when attempting to
download a model.

**Causes and fixes:**

- Ad blocker or privacy extension is blocking requests to `huggingface.co`.
  Temporarily disable the extension for this site.
- Network request is being intercepted by a VPN or firewall. Try on a different
  network.
- The browser is in strict privacy mode (e.g., Firefox's Enhanced Tracking
  Protection blocking cross-site requests). Add an exception for
  `huggingface.co`.

---

### "SharedArrayBuffer is not defined" (local dev only)

**Symptom:** Error appears in the console during local development.

**Fix:** Add COOP/COEP headers to the Vite dev server config (see the
SharedArrayBuffer section above). This error does not appear in production on
GitHub Pages.

---

### Exercises run but AI hints do not appear

**Symptom:** Code runs and tests pass/fail correctly, but clicking "Get Hint"
produces no response.

**Causes and fixes:**

1. No model is selected. Check the model selector in the Navigation bar; select
   "SmolLM2-135M" or "Phi-3-mini" and wait for the model to finish loading.
2. The model is still downloading. The hint button is disabled while the model
   loads. Wait for the progress indicator to disappear.
3. Inference error. Open the console and look for error messages from
   Transformers.js. Reload the page and try again.

---

## Testing Without the AI Coach (No-Coach Mode)

If you want to use the app without any AI model (e.g., on a slow connection or
a low-memory device):

1. Open the app at https://jpgarbanzo.github.io/js-ai-coach/
2. In the Navigation bar, select **"No Coach"** from the model dropdown.
3. All lessons, exercises, and code evaluation work normally. Hint and feedback
   features are simply unavailable.

This mode also persists across page reloads — the selection is saved to
`localStorage`.

---

## Performance Tips for Low-End Devices

- Use the **SmolLM2-135M (tiny)** model instead of Phi-3-mini. It is ~28x
  smaller (~270 MB vs ~7.6 GB) and loads much faster.
- After the model downloads once it is cached in the browser. Subsequent
  sessions do not need to re-download it.
- Close background tabs to free memory for ONNX inference.
- If the page feels sluggish during inference, switch to "No Coach" mode for
  a smoother experience.
- On mobile, use Wi-Fi rather than mobile data for the initial model download.

---

## Clearing Cached Models from Browser Storage

Models are cached in the browser's **Cache Storage** API (not cookies or
localStorage). To clear them:

### Chrome / Edge

1. Open DevTools (F12).
2. Go to **Application** > **Storage** (left sidebar).
3. Expand **Cache Storage**.
4. Right-click the cache entry (usually named after the Hugging Face CDN URL)
   and select **Delete**.

### Firefox

1. Open DevTools (F12).
2. Go to **Storage** > **Cache Storage**.
3. Right-click and delete the relevant cache.

### All browsers (nuclear option)

Go to the browser's **Settings** > **Privacy** > **Clear browsing data** and
check "Cached images and files". Note: this clears all cached files, not just
model weights.

After clearing, the model will be re-downloaded the next time you select it.

---

## How to Report Bugs

1. Check whether the issue is already reported:
   https://github.com/jpgarbanzo/js-ai-coach/issues

2. If it is new, open a bug report at:
   https://github.com/jpgarbanzo/js-ai-coach/issues/new

3. Include the following information in your report:
   - Browser name and version (from `navigator.userAgent` in the console)
   - Operating system and version
   - Device type (desktop / mobile / tablet)
   - Steps to reproduce the issue
   - Expected behaviour vs. actual behaviour
   - Any error messages from the browser console (copy-paste the full text)
   - Whether the issue occurs in "No Coach" mode as well

4. For model-specific bugs, also include:
   - Which model was selected (tiny / small / none)
   - Whether the model had been cached before the error occurred
   - Output of the TroubleshootPage (available in the app's Navigation bar)
