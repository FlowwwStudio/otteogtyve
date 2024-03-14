gsap.registerPlugin(ScrollTrigger, Flip);

document.addEventListener("DOMContentLoaded", function () {
  const trigger = document.querySelector("[fs-flip='trigger']");
  const prevParent = document.querySelector("[fs-flip='prev-parent']");
  const target = document.querySelector("[fs-flip='target']");
  const logo = document.querySelector("[fs-flip='logo']");
  var originalLogoHeight = logo.offsetHeight; // Store the original logo height

  function setupAnimations() {
    if (window.matchMedia("(min-width: 480px)").matches) {
      // Desktop setup
      ScrollTrigger.create({
        start: "top center",
        end: "top center",
        markers: false,
        trigger: trigger,
        onEnter: () => desktopEnterAnimation(),
        onEnterBack: () => desktopEnterBackAnimation(),
      });
    } else {
      // Mobile setup
      ScrollTrigger.create({
        start: "top center",
        end: "top center",
        markers: false,
        trigger: trigger, // Using the same trigger for mobile, adjust if necessary
        onEnter: () => mobileEnterAnimation(),
        onEnterBack: () => mobileEnterBackAnimation(),
      });
    }
  }

  function desktopEnterAnimation() {
    const state = Flip.getState(logo);
    target.appendChild(logo); // Append logo to the target container
    Flip.from(state, {
      duration: 1,
      ease: "power1.inOut",
      absolute: true,
      onStart: () => {
        gsap.to(".home_header-content_text", {
          opacity: 0,
          duration: 0.5,
          ease: "power1.inOut",
        });
      },
    });
  }

  function desktopEnterBackAnimation() {
    gsap.to(logo, { height: originalLogoHeight + "px", duration: 0.5 }); // Revert logo height to original
    const state = Flip.getState(logo);
    prevParent.appendChild(logo); // Move logo back to its original container
    Flip.from(state, {
      duration: 1,
      ease: "power1.inOut",
      absolute: true,
      onStart: () => {
        gsap.to(".home_header-content_text", {
          opacity: 1,
          duration: 0.5,
          ease: "power1.inOut",
        });
      },
    });
  }

  function mobileEnterAnimation() {
    // Mobile animation can be different or the same as desktop. Adjust as necessary.
    // desktopEnterAnimation(); // Reuse desktop animations for simplicity. Adjust if needed.

    const state = Flip.getState(logo);
    target.appendChild(logo); // Append logo to the target container
    Flip.from(state, {
      duration: 1,
      ease: "power1.inOut",
      absolute: true,
      onStart: () => {
        gsap.to(".home_header-content_text", {
          opacity: 0,
          duration: 0.5,
          ease: "power1.inOut",
          height: "1.75rem",
        });
      },
    });
  }

  function mobileEnterBackAnimation() {
    // Mobile animation can be different or the same as desktop. Adjust as necessary.
    desktopEnterBackAnimation(); // Reuse desktop animations for simplicity. Adjust if needed.
  }

  setupAnimations();

  // Re-run setupAnimations on window resize to handle breakpoint crossing
  window.addEventListener("resize", setupAnimations);
});
