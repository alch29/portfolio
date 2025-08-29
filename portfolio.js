const hamMenu = document.querySelector('.ham-menu');
const offScreenMenu = document.querySelector('.off-screen-menu');

hamMenu.addEventListener('click', () => {
    hamMenu.classList.toggle('active');
    offScreenMenu.classList.toggle('active');
})


//https://medium.com/@paulohfev/problem-solving-how-to-create-an-excerpt-fdb048687928


Promise.all([
  fetch('jyderup-haveservice.html').then(response => response.text()),
  fetch('illustrationer.html').then(response => response.text()),
  fetch('visitkort.html').then(response => response.text()),
  fetch('lundager-produkt.html').then(response => response.text()),
])
  .then(dataArray => {
    dataArray.forEach((html, index) => {
      let tempDiv = document.createElement('div');
      tempDiv.innerHTML = html;

      let textElement = tempDiv.querySelector('.portfolio-item-text-full');
      if (!textElement) return;

      const createExcerpt = (content, maxNumberOfWords, trailingIndicator = '...') => {
        const listOfWords = content.trim().split(/\s+/);
        const truncatedContent = listOfWords.slice(0, maxNumberOfWords).join(' ');
        return listOfWords.length > maxNumberOfWords
          ? truncatedContent + trailingIndicator
          : content;
      };

      let excerpt = createExcerpt(textElement.innerText, 15);

      // Her bruges index til at finde den rigtige container
      let container = document.querySelector(`.text-container-${index + 1}`);
      if (container) {
        container.innerHTML = `<p class="portfolio-item-text">${excerpt}</p>`;
      }

      let tempH4 = document.createElement('div');
      tempH4.innerHTML = html;

      let heading = tempH4.querySelector('.portfolio-item-heading').innerText;
      if (!heading) return;
      console.log(heading)
      let headingContainer = document.querySelector(`.heading-container-${index + 1}`);
      if (headingContainer) {
        headingContainer.innerHTML = `<h4 class="portfolio-item-heading-small">${heading}</h4>`;
      }
    });
  })
  .catch(error => console.error('Fejl ved indlæsning:', error));

  
  //Slideshow:

function plusSlides(n, slideshowId) {
  let slideIndex = parseInt(document.getElementById(slideshowId).getAttribute("data-slide-index"));
  showSlides(slideIndex += n, slideshowId);
}

function currentSlide(n, slideshowId) {
  showSlides(n, slideshowId);
}

function showSlides(n, slideshowId) {
  let i;
  let slideshow = document.getElementById(slideshowId);
  let slides = slideshow.getElementsByClassName("slides");
  let dots = slideshow.nextElementSibling.getElementsByClassName("dot");
  if (n > slides.length) {n = 1}
  if (n < 1) {n = slides.length}
  slideshow.setAttribute("data-slide-index", n);
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active-dot", "");
  }
  slides[n-1].style.display = "block";
  dots[n-1].className += " active-dot";
}

document.querySelectorAll('.slideshow-container').forEach((slideshow) => {
  slideshow.setAttribute("data-slide-index", 1);
  showSlides(1, slideshow.id);
});

