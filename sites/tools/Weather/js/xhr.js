function ajax(method, url, query) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest()
        xhr.open(`${method}`, addQuery(url, query))
        xhr.send()
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(xhr.responseText)
                }
                else
                {
                    reject(xhr.responseText)
                }
            }
        }
    })
}



