
// $(document).ready(function(){
//   $("[data-toggle='dropdown']").click(function(e) {   
//       $(this).parents(".dropdown").toggleClass("active");  /*when you click on an element with attr data-toggle='dropdown' it toggle the class "open" on its parent with class "dropdown"*/
//       e.stopPropagation();
//   });

//   $("html").click(function() {
//       $(".active").removeClass("active");  /*when you click out of the dropdown-menu it remove the class "open"*/
//   });
// });

document.addEventListener("click",e =>{
  const isDropDown=e.target.matches("[data-toggle]");
  if (!isDropDown && e.target.closest(".dropdown") !=null) return
    let currentDropdown
  if(isDropDown){
    currentDropdown = e.target.closest(".dropdown")
    currentDropdown.classList.toggle("active")
  }
  document.querySelectorAll(".dropdown").forEach(drop =>{
    if(drop===currentDropdown) return
    drop.classList.remove("active")
  })
 
})


const swiper = new Swiper('.swiper', {
    autoplay:{
        delay:5000,
        disableOnInteraction:false,
    },
    loop: true,
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      clickable:true,
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
  });