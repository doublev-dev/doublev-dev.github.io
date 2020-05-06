'use strict';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "index.html": "fb1e99766a2c76789a6ba2fa25a919c0",
"/": "fb1e99766a2c76789a6ba2fa25a919c0",
"main.dart.js": "6116b3ee685258a218448aabf0550f3f",
"favicon.png": "0c5b0bc26726f87e86ed7442ad02c76a",
"icons/Icon-192.png": "534fa97dabc788cbfe346c364cd10af3",
"icons/Icon-512.png": "3e986fc1c7d67ee9f10b208c171276ea",
"manifest.json": "e6e97a7a60723df961614f3b7c61541e",
"assets/LICENSE": "be8ce49bb9ac75f172c710683e90a57b",
"assets/images/theme.png": "cafb6ec026d0b5b5144def08fcee54b9",
"assets/images/dreamhouse.gif": "b7f5605b1c0c65cfb8de788b5e79f5d1",
"assets/images/dreamhouse_color.jpg": "35425f2bcbc2259675027d5185f7c8e5",
"assets/images/logo.png": "2b4a72928b661af7330c175a8bd10717",
"assets/images/under_construction.gif": "442f2fade2d4d49a21d19a3a5f5c4ed5",
"assets/images/profile.png": "b4714066ff94737077807fb802d90ea2",
"assets/AssetManifest.json": "d7bf67c267faf7fcd30254b115c78c33",
"assets/videos/dreamhouse.mp4": "ed720331d3acba337f27d7d0b45a699b",
"assets/FontManifest.json": "96880f5cbd12a15751331cdbdac93202",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "115e937bb829a890521f72d2e664b632",
"assets/packages/open_iconic_flutter/assets/open-iconic.woff": "3cf97837524dd7445e9d1462e3c4afe2",
"assets/fonts/MaterialIcons-Regular.ttf": "56d3ffdef7a25659eab6a68a3fbfaf16"
};

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheName) {
      return caches.delete(cacheName);
    }).then(function (_) {
      return caches.open(CACHE_NAME);
    }).then(function (cache) {
      return cache.addAll(Object.keys(RESOURCES));
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
