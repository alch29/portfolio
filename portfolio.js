const hamMenu = document.querySelector('.ham-menu');
const offScreenMenu = document.querySelector('.off-screen-menu');

hamMenu.addEventListener('click', () => {
    hamMenu.classList.toggle('active');
    offScreenMenu.classList.toggle('active');
})

// fetch('logo-og-visitkort-jyderup-haveservice.html')
//   .then(response => response.text())
//   .then(data => {
//     // Opret et midlertidigt DOM-objekt for at kunne søge i den hentede HTML
//     let tempDiv = document.createElement('div');
//     tempDiv.innerHTML = data;

//     // Find elementet med den ønskede class
//     let textElement = tempDiv.querySelector('.portfolio-item-text-full');

//     const createExcerpt = (content, maxNumberOfWords, trailingIndicator = '...') => {
//       const listOfWords = content.trim().split(' ');
//       const truncatedContent = listOfWords.slice(0, maxNumberOfWords).join(' ');
//       const excerpt = truncatedContent + trailingIndicator;
//       const output = listOfWords.length > maxNumberOfWords ? excerpt : content;
      
//       return output;
//     };

//     let excerpt = createExcerpt(textElement.innerText, 15);

//     // Sæt indholdet ind i din container
//     document.querySelector('.text-container').innerHTML =
//       `<p class="portfolio-item-text">${excerpt}</p>`;

//   })
//   .catch(error => console.error('Fejl ved indlæsning:', error));


//https://medium.com/@paulohfev/problem-solving-how-to-create-an-excerpt-fdb048687928


Promise.all([
  fetch('logo-og-visitkort-jyderup-haveservice.html').then(response => response.text()),
  fetch('test.html').then(response => response.text()),
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
    });
  })
  .catch(error => console.error('Fejl ved indlæsning:', error));

