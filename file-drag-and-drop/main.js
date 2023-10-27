const uploadButton = document.getElementById("upload-button");
const container = document.querySelector(".image-container");
const errorMessage = document.getElementById("error-message");
const imageDisplay = document.getElementById("image-display");

// event listeners
uploadButton.addEventListener("change", () => {
  imageDisplay.innerHTML = "";
  Array.from(uploadButton.files).forEach((file) => {
    handleUploadedFiles(file, file.name, file.type);
  });
});

container.addEventListener("dragenter", (event) => {
  container.classList.add("active");
});

container.addEventListener("dragover", (event) => {
  event.preventDefault();

  container.classList.add("active");
});

container.addEventListener("dragleave", (event) => {
  container.classList.remove("active");
});

container.addEventListener("drop", (event) => {
  event.preventDefault();

  const dataTransfer = event.dataTransfer;
  const files = dataTransfer.files;

  container.classList.remove("active");
  imageDisplay.innerHTML = "";
  Array.from(files).forEach((file) => {
    handleUploadedFiles(file, file.name, file.type);
  });
});

// image upload
const handleUploadedFiles = (file, name, type) => {
  if (type.split("/")[0] !== "image") {
    errorMessage.innerHTML = "Please upload an image";
    return false;
  }

  errorMessage.innerHTML = "";
  const reader = new FileReader();

  reader.readAsDataURL(file);
  reader.onloadend = () => {
    displayImage(name, reader.result);
  };
};

// image display
const displayImage = (imageName, imageData) => {
  const figure = document.createElement("figure");
  const img = document.createElement("img");

  img.src = imageData;
  figure.appendChild(img);
  figure.innerHTML += `<figcaption>${imageName}</figcaption>`;
  imageDisplay.appendChild(figure);
};
