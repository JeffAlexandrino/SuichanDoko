# すいちゃんどこ？

A minimalistic fan-made webpage that checks whether the VTuber **Hoshimachi Suisei** is currently live on YouTube.  
When she's online, it shows a live GIF and a link to the stream.  
When she's offline, rotating fanart appears along with the time since the last stream and its title.

---

## Features

- Checks if Suisei is live using the **YouTube Data API v3**
- Displays a "LIVE NOW" GIF with title and clickable link to her stream
- When offline, fanart appears and auto-rotates every 10 seconds
- Fanart sources credited below the image
- Time since last stream is shown in days, hours and minutes
- Fully responsive, with a dark blue theme inspired by Suisei's colors

---

## Fanart Sources

All fanarts used in this project are listed in the file:

```
sources.txt
```

Each entry contains a direct link to the source or artist page.
If you're the artist and want your work removed or properly credited, feel free to reach out.

---

## Disclaimer

> **This is a non-commercial fan project not affiliated with Hololive, Cover Corp, or Hoshimachi Suisei.**
> All trademarks, logos, and fanart belong to their respective owners.

## Folder Structure

```
SuichanDoko/
├── css/
│   ├── style.css
│   └── img/
│       ├── icon.jpg
│       ├── onlive.gif
│       └── offline/
├── js/
│   └── script.js
├── index.html
├── README.md
└── sources.txt
```

---

## Credits

Developed by [Jeff Alexandrino](https://github.com/JeffAlexandrino)
Inspired by a love for Suisei.

```

