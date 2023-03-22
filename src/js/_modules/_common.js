function toggleElements(opener, dropper, classname, bodyClip) {
  var openers = document.querySelectorAll(opener);
  var droppers = document.querySelectorAll(dropper);

  for(var i=0; i < openers.length; i++) {
    openers[i].addEventListener('click', function (e) {
      e.stopPropagation();

      if (this.classList.contains(classname)) {
        for(var t = 0; t < droppers.length; t++) {
          openers[t].classList.remove(classname);
        }

        for(var k = 0; k < droppers.length; k++) {
          droppers[k].classList.remove(classname);
        }

        if(bodyClip) {
          document.querySelector("body").classList.remove(classname);
        }
      } else {
        cancelActiveEvents();

        this.classList.add(classname);

        for(var j=0; j < droppers.length; j++) {
          droppers[j].classList.add(classname);
        }

        if(bodyClip) {
          document.querySelector("body").classList.add(classname);
        }
      }
    })
  }
}

function scrollTo(element) {
  window.scroll({
    behavior: 'smooth',
    left: 0,
    top: element.offsetTop
  });
}

function cancelActiveEvents() {
  var drops = document.querySelectorAll('.has-drop');
  var droppers = document.querySelectorAll('.dropper');

  for(var i=0; i < drops.length; i++) {
    drops[i].classList.remove('active', 'show');
  }

  for(var j=0; j < droppers.length; j++) {
    droppers[j].classList.remove('active', 'show');
  }
}