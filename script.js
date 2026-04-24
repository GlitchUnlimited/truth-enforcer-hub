document.querySelectorAll(".portal").forEach(portal => {

  portal.addEventListener("click", () => {
    const link = portal.getAttribute("data-link");

    portal.style.transform = "scale(1.6) rotateY(360deg)";
    portal.style.transition = "0.6s ease";

    setTimeout(() => {
      window.location.href = link;
    }, 500);
  });

  portal.addEventListener("mousemove", e => {
    const rect = portal.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = (y - rect.height / 2) / 10;
    const rotateY = (rect.width / 2 - x) / 10;

    portal.style.transform =
      `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.08)`;
  });

  portal.addEventListener("mouseleave", () => {
    portal.style.transform = "rotateX(0) rotateY(0) scale(1)";
  });

});
