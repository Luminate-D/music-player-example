window.status = 0; // 0 - nothing; 1 - play; 2 - pause
window.selected = {
    id: undefined, name: undefined,
    duration: undefined, path: undefined
}

document.addEventListener('DOMContentLoaded', async (_event) => {
    window.playbtn = document.getElementById('play');
    window.pausebtn = document.getElementById('pause');
    window.stopbtn = document.getElementById('stop');

    window.selName = document.getElementById('selName');
    window.selStatus = document.getElementById('selStatus');

    window.playerProgress = document.getElementById('playerProgress');
    window.player = document.getElementById('musicPlayer');

    let songs = Array.from(document.getElementsByClassName('song'));
    songs.forEach(track => {
        track.addEventListener('click', async (event) => {
            window.selected = {
                id: track.dataset['id'],
                name: track.children[2].children[1].textContent,
                path: track.dataset['songPath'],
                duration: 0
            }

            window.selName.textContent = window.selected.name;
            window.player.src = window.selected.path;
        });
    });

    window.playbtn.addEventListener('click', async (event) => {
        window.status = 1;
        window.selStatus.textContent = 'Playing';
        window.player.play();
    });

    window.pausebtn.addEventListener('click', async (event) => {
        window.status = 2;
        window.selStatus.textContent = 'Paused';
        window.player.pause();
    });

    window.stopbtn.addEventListener('click', async (event) => {
        window.status = 0;
        window.selStatus.textContent = 'Not playing';
        window.player.pause();
        window.player.src = undefined;
    });

    window.player.addEventListener('timeupdate', function() {
        let currentTime = player.currentTime;
        let duration = player.duration;
        window.playerProgress.style.width = (duration / 100 * currentTime).toFixed(1) + '%';
        console.log(window.playerProgress.style.width);
    });
});