# Music Player 🎵

Một trình phát nhạc web hiện đại được xây dựng bằng HTML, CSS và JavaScript với giao diện đẹp mắt và nhiều tính năng thú vị.

## ✨ Tính năng

- **🎮 Điều khiển phát nhạc**: Play, pause, next, previous
- **📊 Thanh tiến trình**: Hiển thị và điều khiển tiến trình bài hát
- **🔊 Điều khiển âm lượng**: Slider âm lượng với hiệu ứng hover
- **🔄 Chế độ lặp**: Lặp lại bài hát hiện tại
- **🔀 Chế độ ngẫu nhiên**: Phát nhạc theo thứ tự ngẫu nhiên
- **💿 Hiệu ứng CD quay**: Animation CD khi phát nhạc
- **📱 Responsive Design**: Tương thích với mọi thiết bị
- **💾 Lưu trạng thái**: Ghi nhớ cài đặt người dùng
- **🎨 Giao diện đẹp**: Thiết kế hiện đại với màu sắc hài hòa

## 🛠️ Công nghệ sử dụng

- **HTML5**: Cấu trúc trang web và Audio API
- **CSS3**: Styling và animations
- **JavaScript ES6+**: Logic xử lý và tương tác
- **Font Awesome 6.6.0**: Icons
- **Google Fonts (Lora)**: Typography
- **SCSS**: CSS preprocessing

## 📁 Cấu trúc thư mục

```
Music_Player/
├── index.html              # Trang chính
├── styles.css              # CSS chính (compiled)
├── styles.css.map          # Source map
├── base.css               # CSS cơ bản
├── main.js                # JavaScript logic
├── base/
│   └── styles.scss        # SCSS source
├── fonts/
│   └── fontawesome-free-6.6.0-web/  # Font Awesome icons
├── music/                 # Ảnh album art
│   ├── La_lung.jpg
│   ├── Can_ca_nuoc_mat.jpg
│   ├── Danh_cho_em.jpg
│   └── ...
└── song/                  # File nhạc MP3
    ├── LaLung.mp3
    ├── CanCaNuocMat.mp3
    ├── DanhChoEm.mp3
    └── ...
```

## 🚀 Cách sử dụng

1. **Clone hoặc download** repository này
2. **Thêm nhạc**: Đặt file MP3 vào thư mục `song/` và ảnh album vào `music/`
3. **Cập nhật playlist**: Chỉnh sửa mảng `songs` trong [`main.js`](main.js) với thông tin bài hát của bạn:

````javascript
songs: [
    {
        name: 'Tên bài hát',
        singer: 'Tên ca sĩ',
        path: './song/file_nhac.mp3',
        image: './music/anh_album.jpg'
    },
    // ...thêm bài hát khác
]
