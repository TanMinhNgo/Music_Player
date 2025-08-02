/*
    1. render songs 
    2. scroll top 
    3. Play / pause / seek 
    4. CD rotate 
    5. next / prev
    6. random
    7. next / repeat when ended
    8. active song
    9. scroll active song into view
    10. play song when click
*/

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
var currentSong;

const PLAYER_STORAGE_KEY = 'LinhbeNh01';

const playlist = $('.playlist');

const player = $('.player');
const heading = $('.dashboard__header h2');
const cdThumb = $('.cd__thumb');
const audio = $('#audio');
const cd = $('.cd');
const playBtn = $('.btn-toggle-play');
const progress = $('#progress');
const nextBtn = $('.btn-next');
const prevBtn = $('.btn-prev');
const randomBtn = $('.btn-random');
const repeatBtn = $('.btn-repeat');
const volume = $('#volume');
const volumeBox = $('.volume-box');

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    isVolumeOpen: false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    songs: [
        {
            name: 'Lạ lùng',
            singer: 'Vũ.',
            path: './song/LaLung.mp3',
            image: './music/La_lung.jpg'
        },
        {
            name: 'Một bước yêu vạn dậm đau',
            singer: 'Mr.Siro',
            path: './song/MotBuocYeuVanDamDau.mp3',
            image: './music/mot_buoc_yeu_van_dam_dau.jpg'
        },
        {
            name: 'Thương',
            singer: 'Karik, Uyên Pím',
            path: './song/Thuong.mp3',
            image: './music/Thuong.jpg'
        },
        {
            name: 'Từng là tất cả',
            singer: 'Karik',
            path: './song/TungLaTatCa.mp3',
            image: './music/Tung_la_tat_ca.jpg'
        },
        {
            name: 'Khóc một mình',
            singer: 'Karik, Windy Quyên',
            path: './song/KhocMotMinh.mp3',
            image: './music/Khoc_mot_minh.jpg'
        },
        {
            name: 'Cạn cả nước mắt',
            singer: 'Karik, Thái Trinh',
            path: './song/CanCaNuocMat.mp3',
            image: './music/Can_ca_nuoc_mat.jpg'
        },
        {
            name: 'Dành cho em',
            singer: 'Hoàng Tôn',
            path: './song/DanhChoEm.mp3',
            image: './music/Danh_cho_em.jpg'
        },
        {
            name: 'Yêu 5',
            singer: 'Rhymastic',
            path: './song/Yeu5.mp3',
            image: './music/Yeu5.jpg'
        },
        {
            name: '2+3=5',
            singer: 'T.R.I, Cammie',
            path: './song/2+3=5.mp3',
            image: './music/2+3=5.jpg'
        },
        {
            name: 'Thằng điên',
            singer: 'JustaTee, Phương Ly',
            path: './song/ThangDien.mp3',
            image: './music/Thang_dien.jpg'
        },
        {
            name: 'Yêu nhau nhé bạn thân',
            singer: 'Phạm Đình Thái Ngân',
            path: './song/YeuNhauNheBanThan.mp3',
            image: './music/Yeu_nhau_nhe_ban_than.jpg'
        },
        {
            name: 'Phía sau một cô gái',
            singer: 'Soobin Hoàng Sơn',
            path: './song/PhiaSauMotCoGai.mp3',
            image: './music/Phia_sau_mot_co_gai.png'
        },
    ],

    setConfig: function (key, value) {
        this.config[key] = value;
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config));
    },

    render: function () {
        const htmls = this.songs.map((song, index) => {
            return `
                    <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index="${index}">
                        <div class="thumb"
                            style="background-image: url('${song.image}')">
                        </div>
                        <div class="body">
                            <h3 class="title">${song.name}</h3>
                            <p class="author">${song.singer}</p>
                        </div>
                        <div class="option">
                            <i class="fa-solid fa-ellipsis"></i>
                        </div>
                    </div>
                `
        })
        playlist.innerHTML = htmls.join('');
    },

    defineProperties: function () {
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.songs[this.currentIndex];
            }
        });
    },

    handleEvents: function () {
        const cdWidth = cd.offsetWidth;


        // Xử lý CD quay / dừng
        const cdThumbAnimate = cdThumb.animate([
            { transform: 'rotate(360deg)' }
        ], {
            duration: 10000, // 10 seconds
            iterations: Infinity
        });
        cdThumbAnimate.pause();

        // Xử lý phóng to / thu nhỏ CD
        document.onscroll = function () {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const newCdWidth = cdWidth - scrollTop;

            cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
            cd.style.opacity = newCdWidth / cdWidth;
        }

        // Xử lý khi click play
        playBtn.onclick = function () {
            if (app.isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
        }

        // Khi song được play
        audio.onplay = function () {
            app.isPlaying = true;
            playBtn.classList.add('playing');
            cdThumbAnimate.play();
        }

        // Khi song được pause
        audio.onpause = function () {
            app.isPlaying = false;
            playBtn.classList.remove('playing');
            cdThumbAnimate.pause();
        }

        // Khi tiến độ bài hát thay đổi
        audio.ontimeupdate = function () {
            if (audio.duration) {
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100);
                progress.value = progressPercent;
                progress.style.backgroundImage = `linear-gradient(90deg, #ec1f55 ${progressPercent}%, transparent 0%)`;
            }
        }

        // Xử lý khi tua song
        progress.onchange = function (e) {
            const seekTime = audio.duration * e.target.value / 100;
            audio.currentTime = seekTime;
        }

        // Khi next song
        nextBtn.onclick = function () {
            if (app.isRandom) {
                app.playRandomSong();
            } else {
                app.nextSong();
            }
            audio.play();
            app.render();
            app.scrollToActiveSong();
        }

        // Khi prev song
        prevBtn.onclick = function () {
            if (app.isRandom) {
                app.playRandomSong();
            } else {
                app.prevSong();
            }
            audio.play();
            app.render();
            app.scrollToActiveSong();
        }

        // Xử lý bật / tắt random song
        randomBtn.onclick = function () {
            app.isRandom = !app.isRandom;
            app.setConfig('isRandom', app.isRandom);
            randomBtn.classList.toggle('active', app.isRandom);
        }

        // Xử lý lặp lại một song
        repeatBtn.onclick = function () {
            app.isRepeat = !app.isRepeat;
            app.setConfig('isRepeat', app.isRepeat);
            repeatBtn.classList.toggle('active', app.isRepeat);
        }

        // Xử lý next song khi audio ended
        audio.onended = function () {
            if (app.isRepeat) {
                audio.play();
            } else {
                nextBtn.click();
            }
        }

        // Lắng nghe hành vi click vào playlist
        playlist.onclick = function (e) {
            const songNode = e.target.closest('.song:not(.active)');
            if (songNode || e.target.closest('.option')) {
                //Xử lý khi click vào song
                if (songNode) {
                    app.currentIndex = Number(songNode.dataset.index);
                    app.loadCurrentSong();
                    app.render();
                    audio.play();
                }

                // Xử lý khi click vào song option
            }
        }

        volume.value = audio.volume * 100;
        volume.style.backgroundImage = `linear-gradient(90deg, #ec1f55 ${volume.value}%, transparent 0%)`
        volume.oninput = function () {
            const newAudioVolume = volume.value / 100;
            audio.volume = volume.value / 100;
            volume.style.backgroundImage = `linear-gradient(90deg, #ec1f55 ${newAudioVolume * 100}%, transparent 0%)`
        }
    },

    scrollToActiveSong: function () {
        setTimeout(() => {
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
            })
        }, 300)
    },

    loadCurrentSong: function () {
        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
        audio.src = this.currentSong.path;
    },

    loadConfig: function () {
        this.isRandom = this.config.isRandom;
        this.isRepeat = this.config.isRepeat;
    },

    nextSong: function () {
        this.currentIndex++;
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
    },

    prevSong: function () {
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong();
    },

    playRandomSong: function () {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * this.songs.length);
        } while (newIndex === this.currentIndex);

        this.currentIndex = newIndex;
        this.loadCurrentSong;
    },

    start: function () {
        // Gán cấu hình từ config vào ứng dụng
        this.loadConfig();

        // Định nghĩa các thuộc tính cho Object
        this.defineProperties();

        // // Lắng nghe / xử lý các sự kiện (DOM events)
        this.handleEvents();

        // // Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
        this.loadCurrentSong();

        // Render playlist
        this.render();

        // Hiển thị trạng thái ban đầu của button repeat & random
        // randomBtn.classList.toggle('active', app.isRandom);
        // repeatBtn.classList.toggle('active', app.isRepeat);
    }
}

app.start();