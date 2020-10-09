const hbs = require('express-handlebars');
const express = require('express');
const http = require('http');
const path = require('path');
const Bluebird = require('bluebird');
const fs = require('promise-fs');

const app = express();
const server = http.createServer(app);

const getMP3Duration  = require('get-mp3-duration');

app.set('view engine', 'hbs');
app.engine('hbs', hbs({
    layoutsDir: path.resolve('views'),
    defaultLayout: 'layout',
    extname: '.hbs'
}));

app.use(express.static(path.resolve('public')));

app.get('/', async (req, res) => {
    let songs = await fs.readdir('public/songs');
    let mapped = await Bluebird.map(songs, async song => {
        let _song = song.slice(0, song.length - 4);
        let buf = await fs.readFile('public/songs/' + song);
        return {
            path: './songs/' + song,
            name: _song.split('___')[1],
            dura: getDuration(getMP3Duration(buf) / 1000),
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

function getDuration(seconds) {
    return new Date(seconds * 1000).toISOString().substr(11, 8);
}