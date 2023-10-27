const container = document.querySelector(".container");

window.onload = () => {
  loadImages();
};

// scroll logic
window.addEventListener("scroll", () => {
  if (
    window.scrollY + window.innerHeight >
    document.documentElement.scrollHeight
  ) {
    loadImages();
  }
});

const loadImages = async () => {
  const imagesAvailable = 988;
  const imagesToGenerate = 10;

  for (let i = 0; i < imagesToGenerate; i++) {
    const randomImageIndex = Math.floor(Math.random() * imagesAvailable);

    await renderImage(randomImageIndex);
  }
};

const renderImage = async (imageIndex) => {
  const imageWidth = 480;
  const imageHeight = 480;
  const imageCollectionId = 928423;

  try {
    const response = await fetch(
      `https://source.unsplash.com/collection/${imageCollectionId}/${imageWidth}x${imageHeight}/?sig=${imageIndex}`
    );

    const img = document.createElement("img");
    img.src = response.url;
    container.appendChild(img);
  } catch (error) {
    console.error("Could not load images", error);
  }
};
