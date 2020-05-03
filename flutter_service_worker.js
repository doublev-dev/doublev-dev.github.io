'use strict';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "index.html": "17d62aa683da1b67991615b2534092bb",
"/": "17d62aa683da1b67991615b2534092bb",
"main.dart.js": "84c367b54aa221d8ef3d12e6c3fe9064",
"favicon.png": "4b309aa90ea597ce9ff99878f95d273f",
"icons/Icon-192.png": "4b309aa90ea597ce9ff99878f95d273f",
"icons/Icon-512.png": "4b309aa90ea597ce9ff99878f95d273f",
"manifest.json": "e6e97a7a60723df961614f3b7c61541e",
"assets/LICENSE": "7daee564e4eda9494ad940990a038883",
"assets/images/icon.png": "c79f790aeed69a854eaa56ac0e5bc2a1",
"assets/images/theme.png": "cafb6ec026d0b5b5144def08fcee54b9",
"assets/images/dreamhouse.gif": "b7f5605b1c0c65cfb8de788b5e79f5d1",
"assets/images/dreamhouse_color.jpg": "35425f2bcbc2259675027d5185f7c8e5",
"assets/images/profile.png": "e877eafbc75505dc2fa8d635a8a2cce1",
"assets/images/dreamhouse.jpg": "7939fb9febca9070d72837f3d9480abe",
"assets/AssetManifest.json": "a92ae290a07240f0d5ce4c9ba2394659",
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
