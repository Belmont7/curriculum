

//Caso 1
//Manejo de erroress cuando manejamos error de conexion
//Petición

/*
self.addEventListener('fetch', event =>{

    const offlineResp=new Response ("Bienvenido ..." 
    + "Para usarla necesitas internet   ");
    const resp = fetch(event.request)
        .catch(()=>{
        return offlineResp; //Cuando capture el error
        //se retome offlineResp
    });
    event.respondWith(resp);
});

*/

const CACHE_NAME = 'cache-1'

//App Shell en cache storage
//Todo lo que la app requiere para trabajar
//varia deendiende de la app
self.addEventListener('install', e =>{
    //Cuando se instala se guarda las cosas necesarias
    const cacheProm = caches.open('CACHE_NAME')
    .then( cache =>{ //se regresa una promesa
        return cache.addAll([
            '/',
            '/index.html',
            '/assets/css',
            '/assets/images/profile.jpg',
            '/js/app.js',
            '/vendor/bootstrap/css/bootstrap.min.css'
        ]);
    });
    e.waitUntil( cacheProm );
});

//Para la estrategia del Cache Only
self.addEventListener('fetch', e =>{
    //1-Cache Only, cuando toda la petici[on surge del Cache
    //Todo lo que sea que se esta pidiendo surge el Cache

    //Se va a todos los caches para ver si existe
    e.respondWith(caches.match( e.request)); //Cache Only

    //2- Cache with netwwork Fallback - Primero cache y luego internet

    const respuesta = cache.match(e.request)
    .then(res => {
        if ( res ) return res;
        //No existe el archivo
        //tengo que ir a la web
        console.log('No existe', e.request.url);

        return fetch(e. request). then(newResp => {
            cache.open( CACHE_NAME)
            .then( cache => {
                cache.put(e.request, newResp);
            });
            return newResp.clone;
        });
    }); //Termina definicione de constante respuesta
    e.respondWith( respuesta);
});


function limpiarCache( cacheName, numeroItems ){
    caches.open( cacheName )
    .then( cache => {
        return cache.keys()
        .then( keys => {
            if ( keys.length > numeroItems ) {
                cache.delete( keys[0] )
                .then( limpiarCache(cacheName, numeroItems) );
            }
        });
    });
}



/*
self.addEventListener('fetch', event =>{
    const offlineResp = new Response(`
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Mi PWA</title>
    </head>
    <body style="background: rgb(255,238,0);">
        <h1>Offline Mode</h1>
    </body>
    </html>
    `,{
        headers:{
            'Content-Type':'text/html'
        }
    });

    const resp = fetch(event.request)
        .catch(()=>{
        return offlineResp; //Cuando capture el error
        //se retome offlineResp
    });
    event.respondWith(resp);
});*/