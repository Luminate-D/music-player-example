const hbs = require('express-handlebars');
const express = require('express');
const http = require('http');
const path = require('path');
const fs = require('promise-fs');

const app = express();
const server = http.createServer(app);

app.set('view engine', 'hbs');
app.engine('hbs', hbs({
    layoutsDir: path.resolve('views'),
    defaultLayout: 'layout',
    extname: '.hbs'
}));

app.use(express.static(path.resolve('public')));

app.get('/', async (req, res) => {
    let songs = await fs.readdir('public/songs');
    let mapped = songs.map(song => {
        let _song = song.slice(0, song.length - 4);
        return {
            path: './songs/' + song,
            name: _song.split('___')[1],
            dura: '0m 0s',
            author: _song.split('___')[0]
        }
    });
    res.render('general', {
        songs: mapped
    });
});

server.listen(8080, '0.0.0.0', () => {
    console.log('Listening on *:8080');
});