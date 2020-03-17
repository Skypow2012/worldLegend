const Jimp = require('Jimp');
const fs = require('fs');

const idxStr = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ,.'

function bornPic(config) {
  let { w, h, colors, arr, pixelSize=10, name } = config;
  new Jimp(w, h, 0x00000000, (err, image) => {
    // this image is 256 x 256, every pixel is set to 0x00000000
    let imgStr = arr[0];
    let { data } = image.bitmap;
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        let idx = y * w + x;
        let color = getColor(imgStr[idx], colors);
        data[idx * 4 + 0] = Number(trans(color.substr(0, 2), 16, 10));
        data[idx * 4 + 1] = Number(trans(color.substr(2, 2), 16, 10));
        data[idx * 4 + 2] = Number(trans(color.substr(4, 2), 16, 10));
        data[idx * 4 + 3] = Number(trans(color.substr(6, 2), 16, 10));
      }
    }
    image.resize(w*pixelSize, h*pixelSize, Jimp.RESIZE_NEAREST_NEIGHBOR);
    fs.existsSync('egg') || fs.mkdirSync('egg');
    image.write('./egg/' + name + '.png');
  });
}
function getColor(char, colors) {
  let idx = idxStr.indexOf(char);
  return colors[idx];
}
function trans(num, m, n) {
  var s = num + '';
  var result = parseInt(s, m).toString(n);
  return result;
}
// bornPic({
//   w: 16,
//   h: 16
// })

// bornPic({"h": 12, "w": 12, "arr": ["000000000000000011110000000100001100001000000010001010001001010000000001010001110001010012221101010012222101010001111101010000122101010000011001"], "colors": ["ffffffff", "000000ff", "fb9f1eff"], "colorCount": 3})
let infos = fs.readFileSync('infos.csv').toString().split('\n');
console.log(infos.length);
for (let i = 0; i < infos.length; i++) {
  console.log(infos[i].substr(10), i);
  const info = JSON.parse(infos[i]);
  info.name = i+1;
  bornPic(info);
}

