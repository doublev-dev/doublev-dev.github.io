'use strict';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "index.html": "fb1e99766a2c76789a6ba2fa25a919c0",
"/": "fb1e99766a2c76789a6ba2fa25a919c0",
"main.dart.js": "266cce7b0c4074464cb33437a11100d3",
"favicon.png": "0c5b0bc26726f87e86ed7442ad02c76a",
"icons/Icon-192.png": "534fa97dabc788cbfe346c364cd10af3",
"icons/Icon-512.png": "3e986fc1c7d67ee9f10b208c171276ea",
"manifest.json": "e6e97a7a60723df961614f3b7c61541e",
"assets/LICENSE": "aa46f016bc799f25ddb643b3f2f71ae9",
"assets/images/logo_black.png": "3e900b167b3449648d09ab7807a5c5e5",
"assets/images/theme.png": "cafb6ec026d0b5b5144def08fcee54b9",
"assets/images/dreamhouse.gif": "b7f5605b1c0c65cfb8de788b5e79f5d1",
"assets/images/hans.png": "ec34e51bd0abfc8e6088a4dd3ef9e3cd",
"assets/images/dreamhouse_color.jpg": "35425f2bcbc2259675027d5185f7c8e5",
"assets/images/logo.png": "2b4a72928b661af7330c175a8bd10717",
"assets/images/under_construction.gif": "442f2fade2d4d49a21d19a3a5f5c4ed5",
"assets/images/profile.png": "b4714066ff94737077807fb802d90ea2",
"assets/images/logo_red.png": "f2e966c847c56ecde7bd05bdce43afb7",
"assets/AssetManifest.json": "988c11de849bc0843451241d2b4beda4",
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
