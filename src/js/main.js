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
  toggleNavMenu();
  toggleSubMenus();
  toggleHeaderNavSticky();
};

window.onresize = function() {
  toggleNavMenu();
  toggleSubMenus();
  toggleHeaderNavSticky();
};

function toggleNavMenu() {
  const isTabletOrMobile = window.innerWidth < 1025;

  if ( isTabletOrMobile ) {        
    document.querySelector('.nav-open').addEventListener('click', function() {
      document.querySelector('.nav-wrapper').classList.add('active');
    });

    document.querySelector('.nav-close').addEventListener('click', function() {
      document.querySelector('.nav-wrapper').classList.remove('active');
    });

    document.querySelector('.nav-wrapper-inner').addEventListener('click', function(e) {
      e.stopPropagation();
    });

    document.querySelector('.nav-wrapper').addEventListener('click', function(e) {
      document.querySelector('.nav-wrapper').classList.remove('active');
    });
  }
}

function toggleSubMenus() {
  const isTabletOrMobile = window.innerWidth < 1025;

  if ( isTabletOrMobile ) {
    toggleWrappedElements(".prim-nav-link", ".sub-menu-primary", "active", false);
    toggleWrappedElements(".sub-nav-btn.sub-inherit", ".sub-menu-secondary", "active", false);
  }
}

function toggleHeaderNavSticky() {
  const isDesktop = window.innerWidth > 1025;

  if ( isDesktop ) {
    window.onscroll = function() {
      const scrollOfsset = window.pageYOffset
        
      if(scrollOfsset > 200) {
        document.querySelector('.nav-wrapper').classList.add('hide-from-screen');
      } else {
        document.querySelector('.nav-wrapper').classList.remove('hide-from-screen');
      }
    };
  }
}