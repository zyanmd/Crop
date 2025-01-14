const fileInput = document.getElementById('file-input');
const image = document.getElementById('image');
const result = document.getElementById('result');
const resultContainer = document.getElementById('result-container');
const download = document.getElementById('download');

let cropper;

fileInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      image.src = reader.result;
      if (cropper) {
        cropper.destroy();
      }
      cropper = new Cropper(image, {
        aspectRatio: 3 / 4, // Proporsi pasfoto
        viewMode: 1,
        movable: true,
        zoomable: true,
        rotatable: true,
        scalable: true,
      });
    };
    reader.readAsDataURL(file);
  }
});

document.getElementById('zoom-in').addEventListener('click', () => {
  if (cropper) cropper.zoom(0.1);
});

document.getElementById('zoom-out').addEventListener('click', () => {
  if (cropper) cropper.zoom(-0.1);
});

document.getElementById('rotate-left').addEventListener('click', () => {
  if (cropper) cropper.rotate(-15);
});

document.getElementById('rotate-right').addEventListener('click', () => {
  if (cropper) cropper.rotate(15);
});

document.getElementById('move-up').addEventListener('click', () => {
  if (cropper) cropper.move(0, -10);
});

document.getElementById('move-down').addEventListener('click', () => {
  if (cropper) cropper.move(0, 10);
});

document.getElementById('move-left').addEventListener('click', () => {
  if (cropper) cropper.move(-10, 0);
});

document.getElementById('move-right').addEventListener('click', () => {
  if (cropper) cropper.move(10, 0);
});

document.getElementById('reset').addEventListener('click', () => {
  if (cropper) cropper.reset();
});

document.getElementById('crop').addEventListener('click', () => {
  if (cropper) {
    const canvas = cropper.getCroppedCanvas({
      width: 300,
      height: 400, // Ukuran pasfoto
    });
    resultContainer.style.display = 'block';
    result.width = 150; // Ditampilkan kecil
    result.height = 200;
    const ctx = result.getContext('2d');
    ctx.clearRect(0, 0, result.width, result.height);
    ctx.drawImage(canvas, 0, 0, 150, 200);

    // Simpan hasil asli
    download.href = canvas.toDataURL('image/png');
  }
});
