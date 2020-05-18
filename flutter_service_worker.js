'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "index.html": "69eeb5d05be0be6b1d0770428dca1efc",
"/": "69eeb5d05be0be6b1d0770428dca1efc",
"main.dart.js": "ddd8864eebc8018fdaa7d695f7af794d",
"favicon.png": "0c5b0bc26726f87e86ed7442ad02c76a",
"icons/Icon-192.png": "534fa97dabc788cbfe346c364cd10af3",
"icons/Icon-512.png": "3e986fc1c7d67ee9f10b208c171276ea",
"manifest.json": "e6e97a7a60723df961614f3b7c61541e",
"assets/LICENSE": "4d1e5a6a8fc0645830d04622cbb81f81",
"assets/AssetManifest.json": "8fdce899972e372d3026eb11b19c5bbe",
"assets/lang/zh.json": "bfa02ecfc35de37c18147fd01b6f6860",
"assets/lang/en.json": "a08c2b5af7cc340acdf7574a846bdcdd",
"assets/lang/fr.json": "57bbe4afd6553dad05130af0d2bd4115",
"assets/videos/dreamhouse.mp4": "ed720331d3acba337f27d7d0b45a699b",
"assets/FontManifest.json": "96880f5cbd12a15751331cdbdac93202",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "115e937bb829a890521f72d2e664b632",
"assets/packages/open_iconic_flutter/assets/open-iconic.woff": "3cf97837524dd7445e9d1462e3c4afe2",
"assets/fonts/MaterialIcons-Regular.ttf": "56d3ffdef7a25659eab6a68a3fbfaf16",
"assets/assets/images/home/me.png": "df73738a06a6b5a5fe9fc95b80b31c19",
"assets/assets/images/home/class.png": "ec2b1f91a14af3831fe0d33bcacdc988",
"assets/assets/images/home/download.png": "e59184a5a878c1ca5d6542f678a88759",
"assets/assets/images/home/flutter.png": "9b850e6ab54323ce376986bfd94d4e46",
"assets/assets/images/home/home.png": "2d560dc2c7bbabf1e78bab2803d90ddf",
"assets/assets/images/home/lesson.png": "3f381088349feafd53b1f51cb92510ce",
"assets/assets/images/home/find.png": "9c8fc7d5255a339354862eaf0f960bdb",
"assets/assets/images/home/diary.png": "0ef77574576ff21245458e778f6e2eca",
"assets/assets/images/home/dart.png": "c5464aec62caa5b73caffc3e98e876b3",
"assets/assets/images/home/refresh.png": "efdc7d65a89cc8cbb20b33f1e4bf25fb",
"assets/assets/images/logo_black.png": "3e900b167b3449648d09ab7807a5c5e5",
"assets/assets/images/theme.png": "cafb6ec026d0b5b5144def08fcee54b9",
"assets/assets/images/dreamhouse.gif": "b7f5605b1c0c65cfb8de788b5e79f5d1",
"assets/assets/images/hans.png": "ec34e51bd0abfc8e6088a4dd3ef9e3cd",
"assets/assets/images/dreamhouse_color.jpg": "35425f2bcbc2259675027d5185f7c8e5",
"assets/assets/images/logo.png": "2b4a72928b661af7330c175a8bd10717",
"assets/assets/images/under_construction.gif": "442f2fade2d4d49a21d19a3a5f5c4ed5",
"assets/assets/images/profile.png": "b4714066ff94737077807fb802d90ea2",
"assets/assets/images/logo_red.png": "f2e966c847c56ecde7bd05bdce43afb7",
"assets/assets/images/lesson/me.png": "df73738a06a6b5a5fe9fc95b80b31c19",
"assets/assets/images/lesson/class.png": "ec2b1f91a14af3831fe0d33bcacdc988",
"assets/assets/images/lesson/flutter.png": "adf7122e175ba33c52b0047c68b1678f",
"assets/assets/images/lesson/home.png": "2d560dc2c7bbabf1e78bab2803d90ddf",
"assets/assets/images/lesson/lesson.png": "3f381088349feafd53b1f51cb92510ce",
"assets/assets/images/lesson/head.png": "485c3a3128d85c857860b2b6d4f8d410",
"assets/assets/images/lesson/dart.png": "dd6d1391862491139330e9d31c24773a"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/LICENSE",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      // Provide a no-cache param to ensure the latest version is downloaded.
      return cache.addAll(CORE.map((value) => new Request(value, {'cache': 'no-cache'})));
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
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#')) {
    key = '/';
  }
  // If the URL is not the the RESOURCE list, skip the cache.
  if (!RESOURCES[key]) {
    return event.respondWith(fetch(event.request));
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache. Ensure the resources are not cached
        // by the browser for longer than the service worker expects.
        var modifiedRequest = new Request(event.request, {'cache': 'no-cache'});
        return response || fetch(modifiedRequest).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.message == 'skipWaiting') {
    return self.skipWaiting();
  }

  if (event.message = 'downloadOffline') {
    downloadOffline();
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
  for (var resourceKey in Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.add(resourceKey);
    }
  }
  return Cache.addAll(resources);
}
