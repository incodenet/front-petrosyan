function toggleElements(opener, dropper, classname, bodyClip) {
  var openers = document.querySelectorAll(opener);
  var droppers = document.querySelectorAll(dropper);

  for( let i=0; i < openers.length; i++ ) {
    openers[i].addEventListener('click', function (e) {
      e.stopPropagation();

      if ( this.classList.contains(classname) ) {
        for( let t = 0; t < droppers.length; t++ ) {
          openers[t].classList.remove(classname);
        }

        for( let k = 0; k < droppers.length; k++ ) {
          droppers[k].classList.remove(classname);
        }

        if( bodyClip ) {
          document.querySelector("body").classList.remove(classname);
        }
      } else {
        cancelActiveEvents();

        this.classList.add(classname);

        for( let j=0; j < droppers.length; j++ ) {
          droppers[j].classList.add(classname);
        }

        if( bodyClip ) {
          document.querySelector("body").classList.add(classname);
        }
      }
    })
  }
}

function toggleWrappedElements(opener, dropper, classname, closeSiblings) {
  var openers = document.querySelectorAll(opener);
  var droppers = document.querySelectorAll(dropper);

  for (var i = 0; i < openers.length; i++) {
    openers[i].addEventListener('click', function (e) {
      e.stopPropagation();

      if (this.classList.contains(classname)) {
        if (closeSiblings) {
          for (var t = 0; t < droppers.length; t++) {
            openers[t].classList.remove(classname);
          }

          for (var k = 0; k < droppers.length; k++) {
            droppers[k].classList.remove(classname);
          }
        } else {
          this.classList.remove(classname);
          this.parentNode.querySelector(dropper).classList.remove(classname);
        }
      } else {
        if (closeSiblings) {
          for (var ta = 0; ta < droppers.length; ta++) {
            openers[ta].classList.remove(classname);
          }

          for (var ka = 0; ka < droppers.length; ka++) {
            droppers[ka].classList.remove(classname);
          }
        }

        this.classList.add(classname);
        this.parentNode.querySelector(dropper).classList.add(classname);
      }
    })
  }

  preventCloseOnClick(dropper);
}

function scrollTo(element) {
  window.scroll({
    behavior: 'smooth',
    left: 0,
    top: element.offsetTop
  });
}

function preventCloseOnClick(elem) {
  var content = document.querySelectorAll(elem);

  for (var i = 0; i < content.length; i++) {
    content[i].addEventListener("click", function (e) {
      e.stopPropagation();
    });
  }
}

function cancelActiveEvents() {
  const drops = document.querySelectorAll('.has-drop');
  const droppers = document.querySelectorAll('.dropper');

  for( let i=0; i < drops.length; i++ ) {
    drops[i].classList.remove('active', 'show');
  }

  for( let j=0; j < droppers.length; j++ ) {
    droppers[j].classList.remove('active', 'show');
  }
}