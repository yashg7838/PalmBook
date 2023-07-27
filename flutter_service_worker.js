'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.json": "ed6feb0471076b2b29153c4e6ecf4a5a",
"assets/AssetManifest.smcbin": "d8ddf35db40b27803929f7f608b13f24",
"assets/assets/font/Inter/Inter-Black.ttf": "980c7e8757e741bb49c7c96513924c61",
"assets/assets/font/Inter/Inter-Bold.ttf": "275bfea5dc74c33f51916fee80feae67",
"assets/assets/font/Inter/Inter-ExtraBold.ttf": "c9709fb8e32755490795ce5bd226c3a0",
"assets/assets/font/Inter/Inter-ExtraLight.ttf": "0f3ac0692901f70f1ac32cf079355051",
"assets/assets/font/Inter/Inter-Light.ttf": "d55f45d07cfe01e8797bd1566561f718",
"assets/assets/font/Inter/Inter-Medium.ttf": "ed533866b5c83114c7dddbcbc2288b19",
"assets/assets/font/Inter/Inter-Regular.ttf": "079af0e2936ccb99b391ddc0bbb73dcb",
"assets/assets/font/Inter/Inter-SemiBold.ttf": "07a48beb92b401297a76ff9f6aedd0ed",
"assets/assets/font/Inter/Inter-Thin.ttf": "2dce622147cace7b467d9929b7708430",
"assets/assets/icons/flat-color-icons_google.png": "c64cc7417d59ee247f79241fc03fa6b4",
"assets/assets/icons/ic_round-apple.png": "a0ec1152cb608a2198985ebc27fb2c2e",
"assets/assets/icons/ic_round-facebook.png": "babd5733c4d8e4f5e7c4b76dc31d12a2",
"assets/assets/icons/more.png": "8495c6975c2089dc34a636e56c900de0",
"assets/assets/icons/Path%2520(Stroke).svg": "5aefaf544db6e9adfa176c50956d72cd",
"assets/assets/images/5.png": "244ba32120c0436fbd406f0b8a23c955",
"assets/assets/images/bollywoodnight_icon.jpeg": "5a441cd4229ed1d6defef7da3e52f969",
"assets/assets/images/boxingworkshop_icon.jpeg": "4b0a879e719ae14df83327bcb50489e5",
"assets/assets/images/debate_icon.png": "8762f805c46dcfce42e93d651eb6036b",
"assets/assets/images/djnight_icon.jpg": "2997b3dd63a2a1123133cd0ee1cbd7a0",
"assets/assets/images/Group%2520181.png": "f55426a18d8e98e611ceecc8e0409807",
"assets/assets/images/GYM.jpg": "d71d95057d2b165ed52c7b0346b7c322",
"assets/assets/images/login_image.png": "93012a3b7a351fcf7eff1d6f62aee0aa",
"assets/assets/images/mahabharat_icon.jpg": "b512223f4a1ea1ae7b04bdd0a9179325",
"assets/assets/images/plantationdrive_icon.jpg": "f6b6803d5cea1620692995f6f8678ef2",
"assets/assets/images/pradeep_kumar_arya-1.jpg": "c9f62687c6169d1ed848fc3e0ebc212d",
"assets/FontManifest.json": "edc12bd93e726d51799917b02506050c",
"assets/fonts/MaterialIcons-Regular.otf": "59447e25bb0fc93704fcfac396c30b72",
"assets/NOTICES": "10e1164e8ba8bf0e3294951e7e3003b7",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "57d849d738900cfd590e9adc7e208250",
"assets/shaders/ink_sparkle.frag": "f8b80e740d33eb157090be4e995febdf",
"canvaskit/canvaskit.js": "76f7d822f42397160c5dfc69cbc9b2de",
"canvaskit/canvaskit.wasm": "f48eaf57cada79163ec6dec7929486ea",
"canvaskit/chromium/canvaskit.js": "8c8392ce4a4364cbb240aa09b5652e05",
"canvaskit/chromium/canvaskit.wasm": "fc18c3010856029414b70cae1afc5cd9",
"canvaskit/skwasm.js": "1df4d741f441fa1a4d10530ced463ef8",
"canvaskit/skwasm.wasm": "6711032e17bf49924b2b001cef0d3ea3",
"canvaskit/skwasm.worker.js": "19659053a277272607529ef87acf9d8a",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "6b515e434cea20006b3ef1726d2c8894",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "70af513784b316a17287247cde9f1821",
"/": "70af513784b316a17287247cde9f1821",
"main.dart.js": "55bc292170e900a50aaa974c384a2157",
"manifest.json": "ebe183d8340db6a1b9a8f5f2f3aaff20",
"version.json": "780b10cc7cce1d1168a5cb64a371fd67"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
