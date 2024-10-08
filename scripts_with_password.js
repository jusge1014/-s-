
document.addEventListener('DOMContentLoaded', function () {
    
localStorage.setItem('songs', JSON.stringify([])); // Clear all songs on page load
const songs = [];


    function displaySongs(filter = '') {
        const songSection = document.getElementById('songs');
        songSection.innerHTML = '';

        const genres = {};

        songs.forEach((song, index) => {
            if (!genres[song.genre]) {
                genres[song.genre] = [];
            }
            if (song.title.includes(filter) || song.genre.includes(filter) || song.artist.includes(filter)) {
                genres[song.genre].push({ ...song, index });
            }
        });

        for (const genre in genres) {
            const genreDiv = document.createElement('div');
            const genreHeader = document.createElement('h3');
            genreHeader.textContent = genre;
            genreHeader.classList.add('collapsible');
            genreDiv.appendChild(genreHeader);

            const genreContent = document.createElement('div');
            genreContent.classList.add('content');

            genres[genre].forEach(song => {
                const songDiv = document.createElement('div');
                songDiv.classList.add('song');
                songDiv.innerHTML = `
                    <h4>${song.artist} - ${song.title}</h4>
                    <p>평점: ${getRatingStars(song.rating)}</p>
                    <p>${song.review}</p>
                    ${song.youtubeLink ? `<p><a href="${song.youtubeLink}" target="_blank">유튜브 링크</a></p>` : ''}
                    <button onclick="deleteSong(${song.index})">삭제</button>
                `;
                genreContent.appendChild(songDiv);
            });

            genreDiv.appendChild(genreContent);
            songSection.appendChild(genreDiv);
        }

        const coll = document.getElementsByClassName("collapsible");
        for (let i = 0; i < coll.length; i++) {
            coll[i].addEventListener("click", function () {
                this.classList.toggle("active");
                const content = this.nextElementSibling;
                if (content.style.display === "block") {
                    content.style.display = "none";
                } else {
                    content.style.display = "block";
                }
            });
        }
    }

    function getRatingStars(rating) {
        const maxRating = 5;
        let stars = '';
        for (let i = 1; i <= maxRating; i++) {
            stars += i <= rating ? '★' : '☆';
        }
        return stars;
    }

    function deleteSong(index) {
        songs.splice(index, 1);
        localStorage.setItem('songs', JSON.stringify(songs));
        displaySongs();
    }

    if (document.getElementById('songForm')) {
        document.getElementById('songForm').addEventListener('submit', function (e) {
            e.preventDefault();
            const title = document.getElementById('title').value;
            const artist = document.getElementById('artist').value;
            const genre = document.getElementById('genre').value;
            const rating = document.getElementById('rating').value;
            const review = document.getElementById('review').value;
            const youtubeLink = document.getElementById('youtubeLink').value;

            const newSong = { title, artist, genre, rating, review, youtubeLink };
            songs.push(newSong);
            localStorage.setItem('songs', JSON.stringify(songs));

            window.location.href = 'index.html';
        });
    }

    if (document.getElementById('searchBar')) {
        document.getElementById('searchBar').addEventListener('input', function (e) {
            const filter = e.target.value;
            displaySongs(filter);
        });
    }

    displaySongs();
});
