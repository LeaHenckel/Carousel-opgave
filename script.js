// finder karrusel-beholder-elementet i HTML-dokumentet og tildeler det til carouselContainer-variablen.
const carouselContainer = document.querySelector('.carousel-container');

// finder alle karruselelementerne (slides) i HTML-dokumentet og tildeler dem til variablen carouselItems.
const carouselItems = document.querySelectorAll('.carousel-item');

// finder alle karruselpunkterne (indikatorerne) i HTML-dokumentet og tildeler dem til variablen carouselBullets.
const carouselBullets = document.querySelectorAll('.carousel-bullet');

// finder "previous" knapelementet i HTML-dokumentet og tildeler det til prevButton-variablen.
const prevButton = document.querySelector('.prev');

// finder "next"-knapelementet i HTML-dokumentet og tildeler det til nextButton-variablen.
const nextButton = document.querySelector('.next');

// indstiller antallet af karrusel-elementer til 5.
const numOfItems = 5;

// indstiller indeks for det aktuelt aktive karrusel-element (slide) til 0.
let activeIndex = 0;

// indstiller indekset for det sidste karrusel-element til antallet af karrusel-elementer minus 1.
let lastIndex = carouselItems.length - 1;

// indstiller overgangstilstanden for karrusellen til falsk (not currently transitioning).
let isTransitioning = false;

function goToSlide(index) { // er en funktion, der ændrer det aktive slide og bullet, når karrusellen navigeres til et bestemt slide.
  if (isTransitioning) {
    return;
  }

  isTransitioning = true;
  carouselContainer.style.transform = `translateX(-${index * 100}%)`;

  carouselBullets[activeIndex].classList.remove('active');
  carouselBullets[index].classList.add('active');

  setTimeout(() => {
    carouselItems[activeIndex].classList.remove('active');
    carouselItems[index].classList.add('active');
    activeIndex = index;
    isTransitioning = false;
  }, 600);
}

function goToPrev() { // er en funktion, der navigerer til det forrige slide, når der trykkes på knappen "previous"
  let index = activeIndex === 0 ? lastIndex : activeIndex - 1;
  goToSlide(index);
}

function goToNext() { // er en funktion, der navigerer til næste slide, når der trykkes på knappen "Next"
  let index = activeIndex === lastIndex ? 0 : activeIndex + 1;
  goToSlide(index);
}

function goToIndex(index) { // en funktion, der navigerer til et bestemt slide (efter indeks), når der klikkes på en bullet.
  if (index === activeIndex) {
    return;
  }

  goToSlide(index);
}

carouselContainer.addEventListener('touchstart', handleTouchStart, false);  // knytter en touchstart-begivenhedslytter til karrusel-container, der kalder handleTouchStart-funktionen, når brugeren rører beholderen.
carouselContainer.addEventListener('touchmove', handleTouchMove, false); // knytter en touchmove-begivenhedslytter til karrusel-containeren, der kalder handleTouchMove-funktionen, når brugeren bevæger musen på containeren.

let xDown = null;  // initialiserer xDown-variablen til null.                                                

function handleTouchStart(evt) {  // en funktion, der får x-koordinaten for brugerens berøring, når brugeren begynder at røre ved karrusel containeren.                                   
    xDown = evt.touches[0].clientX;                                      
};                                                

function handleTouchMove(evt) { // en funktion, der får x-koordinaten for brugerens berøring, når brugeren bevæger fingeren på karrusel-containeren, og navigerer til næste eller forrige slide baseret på retningen af ​​brugerens "fingerbevægelse".
    if ( ! xDown ) {
        return;
    }

    let xUp = evt.touches[0].clientX;

    let xDiff = xDown - xUp;

    if ( xDiff > 0 ) {
        goToNext();
    } else {
        goToPrev();
    } 

    xDown = null;                                             
};

carouselBullets.forEach((bullet, index) => { //  tilføjer en event listener ttil hver karrusel-bullet, der navigerer til det tilsvarende slide, når der klikkes på kuglen.
  bullet.addEventListener('click', () => {
    goToIndex(index);
  });
});

prevButton.addEventListener('click', goToPrev); // tilføjer en click event listener til knappen "previous", der navigerer til det forrige dias, når der klikkes på knappen.
nextButton.addEventListener('click', goToNext); // tilføjer en click event listener til knappen "next", der navigerer til næste slide, når der klikkes på knappen.

const buttonGoToSlide3 = document.getElementById("go-to-slide-3"); // vælger HTML-elementet med ID'et "go-to-slide-3" og gemmer det i en variabel kaldet buttonGoToSlide3.

buttonGoToSlide3.addEventListener("click", function() { // tilføjer en click event listener til buttonGoToSlide3-elementet ved hjælp af addEventListener-metoden. 
                                                       //  Det andet 'argument' til addEventListener er en anonym funktion, der kalder goToIndex-funktionen og sender argumentet 2 til den, hvilket vil ændre det aktive slide til det tredje slide.
                                                      // (da arrays i JavaScript er 0-indekseret, har det tredje slide et indeks på 2). 
                                                      // Kortfattet; når knappen med ID "go-to-slide-3" klikkes, kaldes goToIndex-funktionen, og den aktive slide vil blive ændret til den tredje slide i karrusellen.
  goToIndex(2);
});