function cursorEffect() {
    var page1Content = document.querySelector("#page1-content");
    var cursor = document.querySelector("#cursor");

    page1Content.addEventListener("mousemove", function (dets) {
        gsap.to(cursor, {
            x: dets.x,
            y: dets.y
        })
    })
    page1Content.addEventListener("mouseenter", function () {
        gsap.to(cursor, {
            scale: 1,
            opacity: 1
        })
    })
    page1Content.addEventListener("mouseleave", function () {
        gsap.to(cursor, {
            scale: 0,
            opacity: 0
        })
    })
}

function locoScroll() {

    gsap.registerPlugin(ScrollTrigger);


    // --- SETUP START ---
    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, { duration: 0, disableLerp: true }) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });

    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    ScrollTrigger.defaults({ scroller: "#main" });
    // --- SETUP END ---


    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();

}
function cursorEffectBall() {
    var cursor2 = document.querySelector("#cursor2");
    var orangeBall = document.querySelector("#page3");

    orangeBall.addEventListener("mousemove", function (dets) {
        gsap.to(cursor2, {
            x: dets.x / 8,
            y: dets.y / 8,
            scrub: 1
        })
    })
    orangeBall.addEventListener("mouseenter", function () {
        gsap.to(cursor2, {
            scale: 1,
            opacity: 1
        })
    })
    orangeBall.addEventListener("mouseleave", function () {
        gsap.to(cursor2, {
            scale: 0,
            opacity: 0
        })
    })
}
cursorEffect();
locoScroll();
cursorEffectBall();
function swiperAnimation() {
    var swiper = new Swiper(".mySwiper", {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 2500,
            smooth: 5,
            disableOnInteraction: true,
        },

    });
}
swiperAnimation();

var tl = gsap.timeline();
tl.from("#loader h3", {
    x: 40,
    opacity: 0,
    duration: .5,
    stagger: 0.2
})
tl.to("#loader h3", {
    opacity: 0,
    x: -40,
    duration: .5,
    stagger: 0.2
})
tl.to("#loader", {
    opacity: 0,

})
tl.from("#page1-content h1 span", {
    y: 100,
    duration: .3,
    opacity: 0,
    stagger: 0.1,
    delay: -.5
})
tl.to("#loader", {
    display: "none"

})

// function page2Animation(){
//     gsap.to("#page2-top h4",{
//         y:120,
//         opacity:1 ,
//         duration:0.6,
//         scrollTrigger:{
//             trigger:"#page2",
//             scroller:"body",
//             start:"top 50%",
//             end:"top 20%",
//             markers:true,
//             srcub:2
//         }
//     })
// }
// page2Animation();
