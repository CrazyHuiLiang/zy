const http = require('http');
const fs = require('fs');
const majors = require('./data/selected_majors.json');

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    const index = fs.readFileSync('./index.html', {
        encoding: 'utf8',
    });
    res.end(index.replace("['__marjors__']", JSON.stringify(majors)));
});

console.log(process.argv);
server.listen(Number(process.argv[2]));
