function loadScript(url, callback) {
    // если url - функция, просто выполняем ее
    switch (typeof url) {
        case 'function':
            url();
            return;
        case 'string':
            url = [url];
            break;
    }
    if (!Array.isArray(url)) return;
    // удалим повторяющиеся модули
    url = Array.from(new Set(url));
    let loaded = 0;     // кол-во загруженных модулей
    url.forEach(item => {
        const element = document.createElement("script");
        element.type = "text/javascript";
        element.src = item;
        element.onload = onload;
        document.body.appendChild(element);
    })

    function onload() {
        loaded++;
        if (loaded === url.length
            && typeof callback === 'function')
            callback();
    }
}

loadScript(['./src/script1.js',
    './src/script2.js',
    './src/script3.js',
    './src/script1.js',
    './src/script2.js'],
    () => {
        console.log('Все скрипты загружены');
    })


