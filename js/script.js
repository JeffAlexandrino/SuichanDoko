window.addEventListener("DOMContentLoaded", () => {
  const statusText = document.getElementById("status-text");
  const mediaDisplay = document.getElementById("media-display");
  const lastLiveLink = document.getElementById("last-live-link");
  const artSource = document.getElementById("art-source");

  const imagensOffline = [
    { src: 'css/img/offline/img01.jpg', credit: '@Yozora1902' },
    { src: 'css/img/offline/img02.jpg', credit: '@tsuki_nonono' },
    { src: 'css/img/offline/img03.jpg', credit: '@yokke_yokke' },
    { src: 'css/img/offline/img04.jpg', credit: '@WhiteM2020' },
    { src: 'css/img/offline/img05.jpg', credit: '@スコッティ' },
    { src: 'css/img/offline/img06.jpg', credit: '@三宮跨線橋' },
    { src: 'css/img/offline/img07.jpg', credit: '@ゆう(you06)' },
    { src: 'css/img/offline/img08.jpg', credit: '@Omoti' },
    { src: 'css/img/offline/img09.jpg', credit: '@TAiGA' },
    { src: 'css/img/offline/img10.jpg', credit: '@Yuyu' },
    { src: 'css/img/offline/img11.jpg', credit: '@Kukie_nyan' },
    { src: 'css/img/offline/img12.jpg', credit: '@みの' },
    { src: 'css/img/offline/img13.jpg', credit: '@眠々 (Pixiv)'  },
    { src: 'css/img/offline/img14.jpg', credit: '@Csyday (Pixiv)' },
    { src: 'css/img/offline/img15.jpg', credit: '@あ@ (Pixiv)' },
    { src: 'css/img/offline/img16.jpg', credit: '@ジョリンCF (Pixiv)' },
    { src: 'css/img/offline/img17.jpg', credit: '@TELU' },
    { src: 'css/img/offline/img18.jpg', credit: '@tsukihikarinya' },
    { src: 'css/img/offline/img19.png', credit: '@Ixy' },
    { src: 'css/img/offline/img20.jpg', credit: '@micon (Pixiv)' },
    { src: 'css/img/offline/img21.jpg', credit: '@_YuzuYuki_' },
    { src: 'css/img/offline/img22.jpg', credit: '@Red_O7' },
    { src: 'css/img/offline/img23.jpg', credit: '@_karyln' },
    { src: 'css/img/offline/img24.jpg', credit: '@ryu_hoang' },
    { src: 'css/img/offline/img25.jpg', credit: '@MAyMeA (Pixiv)' }
  ];

  let offlineIndex = 0;

  function trocarImagem() {
    const { src, credit } = imagensOffline[offlineIndex];
    const img = document.createElement("img");

    img.src = src;
    img.alt = "Suisei fanart";
    img.className = "fanart";

    img.onload = () => img.classList.add("visible");

    mediaDisplay.innerHTML = "";
    mediaDisplay.appendChild(img);
    artSource.textContent = credit;

    offlineIndex = (offlineIndex + 1) % imagensOffline.length;
  }

  function formatDuration(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    return `${days}d ${hours}h ${minutes}m`;
  }

  async function checkLiveStatus() {
    try {
      const liveRes = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}` +
        `&eventType=live&type=video&key=${apiKey}`
      );
      const liveData = await liveRes.json();

      if (liveData.items && liveData.items.length > 0) {
        // Vtuber online
        const live = liveData.items[0];
        const title = live.snippet.title;
        const url = `https://www.youtube.com/watch?v=${live.id.videoId}`;

        statusText.innerHTML = `ON LIVE!<br><a href="${url}" target="_blank">${title}</a>`;
        
        const gif = document.createElement("img");
        gif.src = 'css/img/onlive.gif';
        gif.alt = "Live now";
        gif.className = "live-gif";
        gif.onload = () => gif.classList.add("visible");
        
        mediaDisplay.innerHTML = "";
        mediaDisplay.appendChild(gif);
        lastLiveLink.textContent = "";  
        artSource.textContent = "";

      } else {
        // Vtuber offline
        const pastRes = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}` +
          `&maxResults=1&order=date&type=video&eventType=completed&key=${apiKey}`
        );
        const pastData = await pastRes.json();

        const video = pastData.items[0];
        const videoId = video.id.videoId;
        const title = video.snippet.title;
        const videoRes = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=liveStreamingDetails` +
          `&id=${videoId}&key=${apiKey}`
        );
        const videoData = await videoRes.json();
        const lastLiveTime = new Date(videoData.items[0].liveStreamingDetails.actualEndTime);
        const duration = formatDuration(Date.now() - lastLiveTime);

        statusText.textContent = `Last stream ended ${duration} ago`;

        // link para a última live
        lastLiveLink.innerHTML = `<a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">` +
                                 `Last live: ${title}</a>`;

        trocarImagem();
        setInterval(trocarImagem, 10000);
      }
    } catch (e) {
      // Se der erro na API, cai direto no modo offline
      statusText.textContent = "Offline Mode | オフラインモード";
      lastLiveLink.textContent = "";
      artSource.textContent = "";
      trocarImagem();
      setInterval(trocarImagem, 10000);
      console.error(e);
    }
  }

  // Inicia verificação
  checkLiveStatus();
});
