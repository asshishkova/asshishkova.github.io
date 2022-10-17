function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("project-slide");
  if (n > slides.length) {
    slideIndex = 1
  } else if (n < 1) {
    slideIndex = slides.length
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex-1].style.display = "block";
}

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function randomIntFromInterval(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function elementsOverlap(el1, el2) {
  const domRect1 = el1.getBoundingClientRect();
  const domRect2 = el2.getBoundingClientRect();

  return !(
    domRect1.top > domRect2.bottom ||
    domRect1.right < domRect2.left ||
    domRect1.bottom < domRect2.top ||
    domRect1.left > domRect2.right
  );
}

function elementOverlapWithElements(el1, elements) {
  for (let el2 of elements) {
    if (elementsOverlap(el1, el2)) {
      return true;
    }
  }
  return false;
}

const showSkills = () => {
  const skills = Array.from(document.getElementsByClassName('skills'));
  const about = document.getElementById('about');
  const aboutRect = about.getBoundingClientRect();
  const aboutChildrenWithoutSkills = Array.from(about.querySelectorAll(":not(.skills)"));

  const showSkill = (skillIndex) => {
    const thisDiv = skills[skillIndex];
    const thisDivRect = thisDiv.getBoundingClientRect();

    thisDiv.style.top = randomIntFromInterval(about.offsetTop, about.offsetTop + about.offsetHeight - thisDiv.offsetHeight) + "px";
    thisDiv.style.left = randomIntFromInterval(about.offsetLeft, about.offsetLeft + about.offsetWidth - thisDiv.offsetWidth) + "px";

    let notOverlappingElements = aboutChildrenWithoutSkills;
    notOverlappingElements = notOverlappingElements.concat(skills.slice(skillIndex === 0 ? 1 : 0, skillIndex).concat(skills.slice(skillIndex+1)));

    while (elementOverlapWithElements(thisDiv, notOverlappingElements)) {
      thisDiv.style.top = randomIntFromInterval(about.offsetTop, about.offsetTop + about.offsetHeight - thisDiv.offsetHeight) + "px";
      thisDiv.style.left = randomIntFromInterval(about.offsetLeft, about.offsetLeft + about.offsetWidth - thisDiv.offsetWidth) + "px";
    }
  }

  for (let i = 0; i < skills.length; i++) {
    showSkill(i);
    skills[i].style.animationDelay = Math.random() * 3 + "s";
    skills[i].onanimationiteration = () => showSkill(i);
  }
}

let slideIndex = 1;
showSlides(slideIndex);
showSkills();
