document.addEventListener("DOMContentLoaded", function() {
  toggleElements(".has-drop", ".dropper", "active", false);

  document.querySelector('body').addEventListener('click', function () {
    cancelActiveEvents();
    document.querySelector("body").classList.remove("active", 'clip');
  });

  if(document.querySelector(".dropper") != null) {
    document.querySelector(".dropper").addEventListener("click",function(e) {
      e.stopPropagation();
    });
  }

  if(document.querySelector("#scroll-to-btn") != null) {
    document.getElementById("scroll-to-btn").addEventListener('click', () => {
      scrollTo(document.getElementById("all-services"));
    });
  }
});

window.onload = function() {

};

window.onresize = function(event) {

};