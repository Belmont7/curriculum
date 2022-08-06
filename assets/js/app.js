

if ( navigator.serviceWorker ) {
    navigator.serviceWorker.register('/sw.js');
}



/*if (window.caches){//Si el navegador soporta cahce storage
    caches.open('prueba-1');
    caches.open('prueba-2');
    caches.open('cache-v1.1').then(cache=>{
        //cache.add('/index.html');
        cache.addAll(['index.html',
        'css/style.css','/img/main.jpg']);
    });

}*/