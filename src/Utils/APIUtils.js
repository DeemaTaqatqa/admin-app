export function getRequest(url, method, body = {}, options = {
    headers: {
        'Content-Type': 'application/json',
    },
}) {
    let _options = {
        ...options
    }

    if (method.toUpperCase() === 'POST') {

        _options.body = JSON.stringify(body)
    }

    console.log(_options)

    return fetch(url, {
        method,
        ..._options // options for header requests
    }).then(async (resp) => {
        const status = resp.status
        return {
            data: await resp.json(),
            status
        }
    })

}
