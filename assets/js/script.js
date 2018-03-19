const buttonSearch = document.querySelector('.search');
const inputSearch = document.querySelector('.input1');
const contentWrapper = document.querySelector('.content');
const iconPlus = document.querySelectorAll('.plus')

const createList = tracks => {
    const groupMarkup = track =>
     `
    <div class = "wrapper">
        <img class ="artist" src=${track.artworkUrl100}>
        <p>${track.artistName}</p>
        <p class = "track-name">${track.trackName}</p>
        <p>${track.collectionName}</p>
        <p>${track.primaryGenreName}</p>
      <img class = "plus" src="assets/img/plus-black-symbol.svg">
    </div>
    <div class = "details">
        <div class = first-column>
            <h3>${track.trackName}<sup><img class="note" src="assets/img/note.png"></sup></h3>
            <p><b>Collection:</b> ${track.collectionName}</p>
            <p><b>Track count:</b> ${track.trackCount}</p>
            <p><b>Price:</b> ${track.collectionPrice}</p>
        </div>
        <div class = second-column>
            <p><b>Track duration:</b> ${Math.floor(track.trackTimeMillis/60000) + ":"+ (((((track.trackTimeMillis%60000)/1000).toFixed(0)) < 10) ? '0': '') + (((track.trackTimeMillis % 60000)/1000).toFixed(0))} min</p>
            <p><b>Track price:</b> ${track.trackPrice} ${track.currency}</p>
        </div>
    </div>
        `
        contentWrapper.innerHTML = tracks.map(groupMarkup).join('');

        const wrapper = document.querySelectorAll('.wrapper');
        const details = document.querySelectorAll('.details');

        for (let i = 0; i < wrapper.length; i++){
            if (i%2 == 0){
                wrapper[i].style.backgroundColor = '#ccdff0';
                details[i].style.backgroundColor = '#ccdff0';
            }
        }

        for(const wrapper of document.querySelectorAll('.wrapper'))
        {

            wrapper.addEventListener('click', (event) =>{
                const detail = event.target.closest('.wrapper').nextElementSibling;
                const plus = event.target.closest('.wrapper').lastElementChild;
                if (detail.style.display === 'none' || detail.style.display === '') {
                    const details = document.querySelectorAll('.details');
                    for (const detail of details) {
                      detail.style.display = 'none';
                      for(const plus of document.querySelectorAll('.plus')){
                      plus.src = "assets/img/plus-black-symbol.svg";
                      }
                    }
                    detail.style.display = 'flex'
                    plus.src = "assets/img/minus-symbol.svg";
                    
                  } else {
                    detail.style.display = 'none';
                    plus.src = "assets/img/plus-black-symbol.svg";
                  }
            })
        }
}

inputSearch.addEventListener('keydown', (event)=>{
    if (event.keyCode === 13){
    const signature = event.target.closest('.head').nextElementSibling;
    signature.style.display = 'flex';
    let searchString = encodeURIComponent(inputSearch.value).replace(/%20/g,'+');
    let promise = fetch (`https://itunes.apple.com/search?term=${searchString}`)
        .then (response => response.json())
        .then (data => createList(data.results))
    }
})

buttonSearch.addEventListener('click', (event)=>{
    const signature = event.target.closest('.head').nextElementSibling;
    signature.style.display = 'flex';
    let searchString = encodeURIComponent(inputSearch.value).replace(/%20/g,'+');
    let promise = fetch (`https://itunes.apple.com/search?term=${searchString}`)
        .then (response => response.json())
        .then (data => createList(data.results))
})
