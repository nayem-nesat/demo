// cropImage.js
export default async function getCroppedImg(imageSrc, pixelCrop) {
    const image = new Image();
    const isUnsplashImage = imageSrc.includes('unsplash.com');
    if (isUnsplashImage) {
      image.crossOrigin = 'anonymous';
    }
    
    image.src = imageSrc;
    await new Promise((resolve) => {
      image.onload = resolve;
    });
  
    const canvas = document.createElement('canvas');
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    const ctx = canvas.getContext('2d');
  
    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );
  
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          console.error('Canvas is empty');
          return;
        }
        const fileUrl = URL.createObjectURL(blob);
        resolve(fileUrl);
      }, 'image/jpeg');
    });
  }
  