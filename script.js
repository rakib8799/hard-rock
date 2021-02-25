'use-strict';
const handleSearchSong = async function () {
	const inputSong = document.getElementById('input-song').value;
	const url = `https://api.lyrics.ovh/suggest/${inputSong}`;
	try {
		const res = await fetch(url);
		const data = await res.json();
		handleSongs(data.data);
	} catch (error) {
		handleError(error);
	}
};
const handleSongs = function (songs) {
	const searchResult = document.querySelector('.search-result');
	searchResult.innerHTML = '';
	songs.forEach(s => {
		const { album, artist, preview, title_short } = s;
		// console.log(s);
		const { title } = album;
		const { name } = artist;
		const resultDiv = document.createElement('div');
		resultDiv.className = 'single-result row align-items-center my-3 p-3';
		const result = `
		<div class="col-md-9">
			<div class='ms-3'>
				<h3 class="lyrics-name">${title}</h3>
				<p class="author lead">
					Album by <span class="author-name">${name}</span>
				</p>
				<audio controls>
					<source src='${preview}' type="audio/mpeg">
				</audio>
			</div>
		</div>
		<div class="col-md-3 text-md-right text-center">
			<button onclick="handleLyrics('${title_short}','${name}')" class="btn btn-success">Get Lyrics</button>
		</div>
                `;
		resultDiv.innerHTML = result;
		searchResult.appendChild(resultDiv);
	});
};
const handleLyrics = async function (songTitle, artistName) {
	const url = `https://api.lyrics.ovh/v1/${artistName}/${songTitle}`;
	// const cookie = 'url; SameSite=Lax; Secure';
	try {
		const res = await fetch(url);
		const data = await res.json();
		handleFindLyrics(data.lyrics);
	} catch (error) {
		handleError(error);
	}
};
const handleFindLyrics = function (lyrics) {
	const singleLyrics = document.querySelector('.single-lyrics');
	singleLyrics.innerText = lyrics;
};
const handleError = error => {
	const errorMessage = document.querySelector('.error-message');
	errorMessage.innerText = error;
};
