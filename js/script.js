const options = {
  rootMargin: "-300px 0px",
};

const intersectionObsever = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      //   console.log(entry.traget);
      entry.target.classList.add("show");
    } else {
      entry.target.classList.remove("show");
    }
  });
}, options);

const boxElements = document.querySelectorAll("section");
console.log(boxElements);
boxElements.forEach((box) => {
  intersectionObsever.observe(box);
});
