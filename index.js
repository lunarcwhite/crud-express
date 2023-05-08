const http = require('http');
const url = require('url');
const {
    fetch,
    create,
    update,
    destroy,
    getOne
} = require('./database/barang');

function setResponse(res, statusCode = 200, data = null, options = {}) {
    const headers = options.headers;
    for (const key in headers) {
        res.setHeader(
            key, headers[key]
        );
    }
    res.statusCode = statusCode;
    if (!data) {
        res.end();
        return;
    }
    res.end(
        JSON.stringify(data)
    );
}

const server = http.createServer((req, res) => {
    const reqUrl = req.url;
    const method = req.method;
    const dataBarang = fetch();
    let requestBody = '';
    const {
        pathname,
        query
    } = url.parse(reqUrl, true);
    let id = query.id;
    if (pathname === '/barang') {
        if (method === "GET") {
            if(id === undefined){
                res.setHeader(
                    'Content-Type', 'application/json'
                );
                setResponse(res, 200, dataBarang, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            }else{
                if(!getOne(id)){
                    setResponse(res, 200, "Data Tidak Ditemukan", {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }); 
                    return;
                }
            setResponse(res, 200, getOne(id), {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }
        return;
        } else if (method === "POST") {
            req.on('data', (chunk) => {
                requestBody += chunk.toString();
            });
            req.on('end', () => {
                requestBody = JSON.parse(requestBody);
                create(requestBody);
                setResponse(res, 200, requestBody, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            });
            return;
        } else if (method === "PUT") {
            req.on('data', (chunk) => {
                requestBody += chunk.toString();
            });
            req.on('end', () => {
                requestBody = JSON.parse(requestBody);
                update(requestBody, id);
                setResponse(res, 200, requestBody, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            });
            return;
        } else if (method === "DELETE") {
            destroy(id);
            setResponse(res, 200, "Data Barang Berhasil Dihapus", {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return;
        }
    }
    setResponse(res, 404, "404 Not Found", {
        headers: {
            'Content-Type': 'application/json',
        },
    });

});

const PORT = 3000;

server.listen(PORT);

console.log(`Server started on localhost:${PORT}`);