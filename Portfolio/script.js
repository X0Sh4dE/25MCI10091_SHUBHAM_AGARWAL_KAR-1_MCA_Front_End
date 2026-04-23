
document.querySelectorAll('a[href^="#"]').forEach(function(link) {

  // Har link pe click event lagao
  link.addEventListener('click', function(e) {

    // Link ka href leke us ID wala element dhoondo
    // Jaise href="#about" => document.querySelector("#about")
    var targetId = this.getAttribute('href');
    var target = document.querySelector(targetId);

    // Agar woh section exist karta hai toh
    if (target) {
      e.preventDefault(); // Default jump behavior rokke rakhte hain

      // Smoothly scroll karo us section tak
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });

});

// Sabhi sections aur footer ko select karo (jinke id hain)
var sections = document.querySelectorAll('section, footer');

// Sabhi nav links ko select karo
var navLinks = document.querySelectorAll('nav ul li a');

// Jab bhi user scroll kare yeh function chalega
window.addEventListener('scroll', function() {

  var currentSection = ''; // Abhi kaunsa section dikh raha hai

  // Har section check karo
  sections.forEach(function(section) {

    // Section ka top kitna upar hai page se
    var sectionTop = section.offsetTop;

    // Agar scroll position us section ke paas pahunch gayi hai
    // (80px ka offset diya hai taaki navbar ke neeche section count ho)
    if (window.scrollY >= sectionTop - 80) {
      currentSection = section.getAttribute('id'); // Us section ka id save karo
    }
  });

  // Ab sabhi nav links check karo
  navLinks.forEach(function(link) {

    // Pehle sabse 'active' class hata do
    link.classList.remove('active');

    // Jo link current section se match karta hai use active karo
    // Link ka href "#about" hai aur currentSection "about" hai
    if (link.getAttribute('href') === '#' + currentSection) {
      link.classList.add('active'); // CSS mein .active class purple color deti hai
    }
  });

});


