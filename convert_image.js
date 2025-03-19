import sharp from 'sharp';

sharp('src/images/mario-chipset.jpg')
  .toFormat('webp')
  .toFile('src/images/mario-chipset.webp')
  .then(info => {
    console.log('Image converted successfully:', info);
  })
  .catch(err => {
    console.error('Error converting image:', err);
  });
