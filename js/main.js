(function ($) {
    "use strict";
    
    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Vendor carousel
    $('.vendor-carousel').owlCarousel({
        loop: true,
        margin: 29,
        nav: false,
        autoplay: true,
        smartSpeed: 300,
        responsive: {
            0:{
                items:2
            },
            576:{
                items:3
            },
            768:{
                items:4
            },
            992:{
                items:5
            },
            1200:{
                items:6
            }
        }
    });


    // Related carousel
    $('.related-carousel').owlCarousel({
        loop: true,
        margin: 29,
        nav: false,
        autoplay: true,
        smartSpeed: 300,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:2
            },
            768:{
                items:3
            },
            992:{
                items:4
            }
        }
    });


    // Product Quantity
    $('.quantity button').on('click', function () {
        var button = $(this);
        var oldValue = button.parent().parent().find('input').val();
        if (button.hasClass('btn-plus')) {
            var newVal = parseFloat(oldValue) + 1;
        } else {
            if (oldValue > 0) {
                var newVal = parseFloat(oldValue) - 1;
            } else {
                newVal = 0;
            }
        }
        button.parent().parent().find('input').val(newVal);
    });
    
})(jQuery);


const dialog = document.querySelector("dialog");
const showButton = document.querySelector("dialog + button");
const closeButton = document.querySelector("dialog button");

// "Show the dialog" button opens the dialog modally
showButton.addEventListener("click", () => {
  dialog.showModal();
});

// "Close" button closes the dialog
closeButton.addEventListener("click", () => {
  dialog.close();
  addAnnouncement();
  saveFile();
});


const titleField = document.getElementById("title");
const descField = document.getElementById("description");
const announcements = document.getElementById("announcements");
// const inputField = document.getElementById("todo-input");

function addAnnouncement() {
    const titleText = titleField.value.trim();
    const descText = descField.value.trim();
  
    if (titleText !== "") {
      // Create a new card element
      const card = document.createElement("div");
      card.classList.add("card");
      card.classList.add("col-lg-3");
      card.style.width = "18rem";
  
      // Create a card body element
      const cardBody = document.createElement("div");
      cardBody.classList.add("card-body");
  
      // Create a heading for the card title
      const cardTitle = document.createElement("h5");
      cardTitle.classList.add("card-title");
      cardTitle.innerText = titleText;
  
      // Create a paragraph for the task text
      const taskParagraph = document.createElement("p");
      taskParagraph.classList.add("card-text");
      taskParagraph.innerText = descText;
  
      // Append the title and task text to the card body
      cardBody.appendChild(cardTitle);
      cardBody.appendChild(taskParagraph);
  
      // Append the card body to the card
      card.appendChild(cardBody);
  
      // Append the card to the todo list
      announcements.appendChild(card);
  
      // Save the updated todo list to local storage
      saveTasks();
  
      // Clear the input field
      titleField.value = "";
      descField.value = "";
    }
  }

  function saveFile() {
    const fileInput = document.getElementById('file');
  
    if (fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const reader = new FileReader();
  
      reader.onload = function() {
        const link = document.createElement('a');
        link.href = reader.result;
        link.download = file.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };
  
      reader.readAsDataURL(file);
    } else {
      alert("Please select a file.");
    }
  }


  function saveTasks() {
    const cards = announcements.querySelectorAll('.card');
    const tasks = [];
  
    cards.forEach((card) => {
      const title = card.querySelector('.card-title').innerText;
      const desc = card.querySelector('.card-text').innerText;
      tasks.push({ title, desc });
    });
  
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  
  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
    tasks.forEach((task) => {
      const { title, desc } = task;
  
      const card = document.createElement('div');
      card.classList.add('card');
      card.classList.add('col-lg-3');
      card.style.width = '18rem';
  
      const cardBody = document.createElement('div');
      cardBody.classList.add('card-body');
  
      const cardTitle = document.createElement('h5');
      cardTitle.classList.add('card-title');
      cardTitle.innerText = title;
  
      const taskParagraph = document.createElement('p');
      taskParagraph.classList.add('card-text');
      taskParagraph.innerText = desc;
  
      cardBody.appendChild(cardTitle);
      cardBody.appendChild(taskParagraph);
  
      card.appendChild(cardBody);
  
      announcements.appendChild(card);
    });
  }
  
  // Call loadTasks when the page loads to load any saved announcements
  window.addEventListener('load', loadTasks);
  