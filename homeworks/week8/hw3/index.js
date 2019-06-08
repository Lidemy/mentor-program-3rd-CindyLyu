const request = new XMLHttpRequest();
const liveContainer = document.querySelector('.livecontainer');

function viewersConversion(num) {
  const numLength = num.toString().length;
  let result = '';
  if (numLength >= 4) {
    for (let i = 0; i < numLength - 3; i += 1) {
      result += num.toString()[i];
    }
    return `${result}k`;
  }
  return num;
}

request.onload = () => {
  if (request.status >= 200 && request.status < 400) {
    const data = JSON.parse(request.responseText);
    for (let i = 0; i < (data.streams).length; i += 1) {
      const liveTitle = data.streams[i].channel.status;
      const viewers = viewersConversion(data.streams[i].viewers);
      const pic = data.streams[i].preview.medium;
      const name = data.streams[i].channel.name;
      const link = `https://www.twitch.tv/${name}`;
      const avatar = data.streams[i].channel.logo;
      const item = document.createElement('div');
      item.classList.add('livecontent');
      item.innerHTML = `<a href='${link}' target='_blank'>
        <div class='livecontent__viewers'><i class="fas fa-user"></i>${viewers}</div>
        <img class='livecontent__img' src='${pic}'>
        <div class=livecontent__info>
        <div><img class='livecontent__info-avatar' src='${avatar}'></div>
          <div class='livecontent__info-text'>
            <div class='livecontent__info-title'>${liveTitle}</div>
            <div class='livecontent__info-name'>${name}</div></div>
          </div></a>`;
      liveContainer.appendChild(item);
    }
  } else {
    console.log(request.responseText, request.status);
  }
};

request.onerror = () => {
  console.log(request.status);
};

request.open('GET', 'https://api.twitch.tv/kraken/streams/?game=League of Legends&limit=20', true);
request.setRequestHeader('Client-ID', 'wdplbrt7uhnh4ep6lvk2ogkc1eyw6o');
request.send();
