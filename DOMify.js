

// Design Inspiration :-
// at this stage if its feeling hard to think about design 
// then search on Pintrest :-
// => Productivity Dashboard design
// => Productivity Dashboard cards


// Icons :-
// Use remix icon, but before using it, use its cdn 
// so click on github option in remix icons website


// Absolute and Relative for Single Page Application :-
// > These sections are stacked on top of each other.
// > Only one of them is shown at a time using display: block, 
//   others are hidden using display: none.
// > ✅ Because #main is the outer container and not explicitly relative, 
//   your absolutely positioned sections still refer to it (because it's the 
//   first non-static ancestor — which defaults to #main).


// ✅ querySelectorAll returns a NodeList :-
// js
// var allFullElems = document.querySelectorAll(".fullElem");
// This gives you a NodeList — a special list of DOM elements.

// A NodeList is array-like, meaning:
// > It supports indexing (like allFullElems[0])
// > It has .length
// > You can loop with forEach
// > But it doesn't have full array methods like .map() or .filter() unless you convert it.








// HANDLING SPA :-
function openFeatures() {
    // Grabbing all small cards (.elem) on the dashboard
    var allElems = document.querySelectorAll(".elem");

    // Grabbing all the fullscreen sections (.fullElem)
    var FullElemsPage = document.querySelectorAll(".fullElem");
    var FullElemPageBackBtn = document.querySelectorAll(".fullElem .back");


    allElems.forEach(function(elem) {
        elem.addEventListener("click", function() {

        // This gives the id of the clicked card (like "0", "1", etc.)
        var id = elem.id;
        // Shows the corresponding full page section using its index
        FullElemsPage[id].style.display = "block";

        // Hides the dashboard cards (optional — can be done via CSS or JS)
        // document.querySelector(".allElems").style.display = "none";
        });
    });


    FullElemPageBackBtn.forEach(function(back) {
        back.addEventListener("click", function() {
            console.log(back.id);
            FullElemsPage[back.id].style.display = "none"
            // document.querySelector(".allElems").style.display = "initial";
        })
    })
}
openFeatures();








// TODO LIST PAGE :-
function todoList() {

// HANDLING FORM :-
let form = document.querySelector(".addTask form");
let taskInput = document.querySelector(".addTask form #task-input");
let taskDetailsInput = document.querySelector(".addTask form textarea");
let taskCheckbox = document.querySelector(".addTask form #checkbox")




// FOR PREVENTING MERGING OF PAGES IN SPA :-
document.querySelector(".todo").addEventListener("click", function () {
    document.querySelector(".todo-list-fullpage").style.display = "block";
    document.querySelector(".allElems").style.display = "none";
});

document.querySelector(".back-1").addEventListener("click", function () {
    document.querySelector(".todo-list-fullpage").style.display = "none";
    document.querySelector(".allElems").style.display = "block";
});




// LOCAL STORAGE :-
var currentTask = []
if(localStorage.getItem("currentTask")) {
    console.log("Task list is full");
    currentTask = JSON.parse(localStorage.getItem("currentTask"));
} else {
    console.log("Task List is Empty");
    localStorage.setItem("currentTask", currentTask);
}




// RENDERING THE TASK :-
function renderTask() { 
    var allTask = document.querySelector(".allTask");
    var sum = ""

    currentTask.forEach(function(elem, idx) {
        console.log(elem);
        sum += 
        `<div class="task">
            <h5>
                <details>
                    <summary>${elem.task} <span class=${elem.imp}> IMP </span></summary>
                    <p> ${elem.details} </p>
                </details> 
            </h5>
            <button id=${idx}>Mark as Completed</button>
        </div>`
    })
    allTask.innerHTML = sum;
    mark_completed();




    // WHY MARK AS COMPLETED IS HERE !!! :-
    // I'm using a NodeList (querySelectorAll) of the 'Mark as Completed' 
    // buttons. So, after every render, I must update that NodeList. Otherwise, 
    // the index might be wrong when I try to delete the 2nd or 3rd task."

    // 🧠 What's Happening:
    // When you run document.querySelectorAll(".task button"):
    // It gives you a snapshot (NodeList) of the current buttons in the DOM.
    // Then you render new tasks using:

    // allTask.innerHTML = sum;
    // This destroys all old .task button elements and creates new ones.
    // But your old NodeList still points to the old buttons that no longer  exist.
    // So if you don’t re-run querySelectorAll(), you're referencing dead or outdated buttons.
    // And yes — because you're using the index or .id, it may refer to the wrong task or not work at all.
}




// SUBMIT FORM ACTION :-
form.addEventListener("submit", function(e) {
    // This prevnts event of page reloading while submitting form
    e.preventDefault();
    currentTask.push(
        {
            task: taskInput.value, 
            details: taskDetailsInput.value, 
            imp: taskCheckbox.checked
        }
    );
    localStorage.setItem("currentTask", JSON.stringify(currentTask));
    taskInput.value = "";
    taskDetailsInput.value = "";
    taskCheckbox.checked = false;
    renderTask();
})




// MARK AS COMPLETED :-
function mark_completed() {
    var markCompletedBtn = document.querySelectorAll(".task button")
    markCompletedBtn.forEach(function(btn) {
        btn.addEventListener("click", function() {

            currentTask.splice(btn.id, 1);
            // Dont worry about duplication, Local Storage handles it
            localStorage.setItem("currentTask", JSON.stringify(currentTask));

            // You also need to re render the currentTask node list
            // We used render task becoz we want screen to change after 
            // this delete action
            renderTask(); 
        }) 
    }) 
}; 
renderTask(); 
// Splice method :- 
// var arr = [10, 20, 30, 40]
// arr.splice(1, 2);
// first ke baad ke 2 elements gayab karne hai (including 20)
// 20, 30 gayab ho gaye








// LOCAL STORAGE :-
// localStorage.clear();
};
todoList();








// DAILY PLANNER PAGE :-
function dailyPlanSet() {
// DAILY PLANNER :-
// ARRAY.FROM :-
// A dummy array made, A shallow copy of array
var hours = Array.from({length:18}, (elem, idx) => {
    let start = (6 + idx) > 12 ? (6 + idx - 12) : (6 + idx);
    let end = (7 + idx) > 12 ? (7 + idx - 12) : (7 + idx);
    return `${start}:00 - ${end}:00`;
})
console.log(hours);




// FOR PREVENTING MERGING OF PAGES IN SPA :-
document.querySelector(".daily").addEventListener("click", function () {
    document.querySelector(".daily-planner-fullpage").style.display = "block";
    document.querySelector(".allElems").style.display = "none";
});

document.querySelector(".back-2").addEventListener("click", function () {
    document.querySelector(".daily-planner-fullpage").style.display = "none";
    document.querySelector(".allElems").style.display = "block";
});




// RENDERING ON SCREEN :-
// Putting the back tick string in innerHTML of .day-planner
var dayPlanData = JSON.parse(localStorage.getItem("dayPlanData")) || {}; 
var dayPlanner = document.querySelector(".day-planner");
var wholeDaySum = "";
hours.forEach(function(elem, idx) {

    let start = (6 + idx) > 12 ? (6 + idx - 12) : (6 + idx);
    let end = (7 + idx) > 12 ? (7 + idx - 12) : (7 + idx);

    // Dont panic if conditions are made by you
    if (6+idx < 12) {
        start = start + " a.m."
    } if (7+idx <= 11) {
        end = end + " a.m."
    } if (6+idx >= 12) {
        start = start + " p.m."
    } if (7+idx > 11 && 7+idx-12 != 12) {
        end = end + " p.m."
    } if (7+idx-12 == 12) {
        end = end + " a.m."
    }


    var savedData = dayPlanData[idx] || "";
    console.log(savedData)
    wholeDaySum += 
    `<div class="day-planner-time">
        <p>${start} - ${end}</p>
        <input id=${idx} type="text" placeholder="..." value=${savedData}>
    </div>`;
})
dayPlanner.innerHTML = wholeDaySum




// LOCAL STORAGE :-
// This will give us node list of 18 elements :-
var dayPlannerInput = document.querySelectorAll(".day-planner input");
console.log(dayPlannerInput);

dayPlannerInput.forEach(function(elem) {
    console.log(elem.id);

    elem.addEventListener("input", function() {
        dayPlanData[elem.id] = elem.value;

        console.log(dayPlanData);
        localStorage.setItem("dayPlanData", JSON.stringify(dayPlanData))
    })
})


};
dailyPlanSet();








// MOTIVATION PAGE :-
// This is the api key we are going to use :-
// > https://github.com/lukePeavey/quotable
// > After entering the github accn. mentioned above 
// > Use api key => http://api.quotable.io/random
// > Just put /random in front of our api key https://api.quotable.io
// Search page design on Pintrest

// QUOTES :-
// For quotes icon "" go to website Icons8
// Jut search quotes and you can also choose color of your quote


function motivation_Quote() {




// FOR PREVENTING MERGING OF PAGES IN SPA :-
document.querySelector(".moti").addEventListener("click", function () {
    document.querySelector(".motivational-fullpage").style.display = "block";
    document.querySelector(".allElems").style.display = "none";
});

document.querySelector(".back-3").addEventListener("click", function () {
    document.querySelector(".motivational-fullpage").style.display = "none";
    document.querySelector(".allElems").style.display = "block";
});




let motivationQuote = document.querySelector(".motivation-2 h1")
let motivationAuthor = document.querySelector(".motivation-3 h1")

async function fetchQuote() {
    let response = await fetch("https://api.quotable.io/random");
    let data = await response.json();

    console.log(data.content);
    console.log(data);
    motivationQuote.innerHTML = data.content;
    motivationAuthor.innerHTML = "~ " + data.author ;
}

fetchQuote();
}
motivation_Quote();








// POMODORO PAGE :-

function pomodoro_timer() {




// FOR PREVENTING MERGING OF PAGES IN SPA :-
document.querySelector(".pomo").addEventListener("click", function () {
    document.querySelector(".pomodoro-fullpage").style.display = "block";
    document.querySelector(".allElems").style.display = "none";
});

document.querySelector(".back-4").addEventListener("click", function () {
    document.querySelector(".pomodoro-fullpage").style.display = "none";
    document.querySelector(".allElems").style.display = "block";
});



    
let totalSeconds = 25*60;
let timer = document.querySelector(".pomo-timer h1");
var StartBtn = document.querySelector(".pomo-timer .Start-timer");
var PauseBtn = document.querySelector(".pomo-timer .Pause-timer");
var ResetBtn = document.querySelector(".pomo-timer .Reset-timer");
let timerInterval = null;
var isWorkSession = true;
var session = document.querySelector(".pomodoro-fullpage .session")

function updateTimer() {
    let minutes = Math.floor(totalSeconds/60);
    let seconds = totalSeconds%60;

    timer.innerHTML = `${String(minutes).padStart("2", "0")} : ${String(seconds).padStart("2", "0")}`;
}
updateTimer();


function startTimer() {
    clearInterval(timerInterval)

    // MANUAL TOGGLING :-
    // ITs very easy we're just manually writing the code for toggling 
    // timers, one of 25 mins and for second click when worksession becomes 
    // false then we run the timer of 5 mins

    if (isWorkSession) {
        session.innerHTML = "Work Session"
        session.style.backgroundColor = "rgb(2, 151, 2)"
        // totalSeconds = 25*60;
        timerInterval = setInterval(function() {
            if(totalSeconds > 0) {
                totalSeconds--;
                updateTimer();
            }
            else {
                session.innerHTML = "Take a break"
                session.style.backgroundColor = "#B6648A"

                isWorkSession = false;
                clearInterval(timerInterval);
                timer.innerHTML = "05:00"
            }
        }, 1000)
    }

    else {
        session.innerHTML = "Take a break"
        session.style.backgroundColor = "#B6648A"

        totalSeconds = 5*60;
        timerInterval = setInterval(function() {
            if(totalSeconds > 0) {
                totalSeconds--;
                updateTimer();
            }
            else {
                session.innerHTML = "Work Session"
                session.style.backgroundColor = "rgb(2, 151, 2)"

                isWorkSession = true;
                clearInterval(timerInterval);
                timer.innerHTML = "25:00"
            }
        }, 1000)
    }
}

function PauseTimer() {
    clearInterval(timerInterval);
}

function ResetTimer() {
    session.innerHTML = "Work Session"
    session.style.backgroundColor = "rgb(2, 151, 2)"
    clearInterval(timerInterval);
    totalSeconds = 25*60;
    updateTimer();
}

StartBtn.addEventListener("click", startTimer);
PauseBtn.addEventListener("click", PauseTimer);
ResetBtn.addEventListener("click", ResetTimer);




// PAD START :-
let str1 = "5";
console.log(str1.padStart(2, "0"));
// This will never let us see 5 = "5"
// It will always show 5 = "05"
// First parameter : This is because first parameter = 2
// Second Parameter : This tells us what we wanna place after or before 5
// for example - console.log(str1.padStart(2, "*"))
//               output = *5

};
pomodoro_timer();








// DAILY GOALS PAGE :-
function daily_goals() {
    document.querySelector(".goals").addEventListener("click", function () {
        document.querySelector(".daily-goals-fullpage").style.display = "block";
        document.querySelector(".allElems").style.display = "none";
    });

    document.querySelector(".back-5").addEventListener("click", function () {
        document.querySelector(".daily-goals-fullpage").style.display = "none";
        document.querySelector(".allElems").style.display = "block";
    }); 
};
daily_goals();








function header_section() {

// HEADER SECTION :-
// > Weather api 
// > Type free weather api
// > go to docs
// > heres the first api link 
// > http://api.weatherapi.com/v1
// > Go to MY account and copy your api key, we will need it in future
// > now come back to prev page and copy the current weather -> /current.json
// > and make the url complete -> http://api.weatherapi.com/v1/current.json
// > Remember this pattern -> ?key=${apikey}


let data = null;
let apikey = "e382074d8054475ab4471633252306";
let city = "Pune";

let header1Time = document.querySelector(".header1 h1");
let header1Date = document.querySelector(".header1 h2");
let header2Temp = document.querySelector(".header2 h2");
let header2Condition = document.querySelector(".header2 h4");
let precipitation = document.querySelector(".header2 .precipitation");
let humidity = document.querySelector(".header2 .humidity");
let wind = document.querySelector(".header2 .wind");

async function weatherAPICall() {
    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apikey}&q=${city}`);
    const data = await response.json();   // ✅ wait for JSON parsing
    console.log(data.current.temp_c);     // ✅ logs the actual weather object

    header2Temp.innerHTML = `${data.current.temp_c}°C`;
    header2Condition.innerHTML = `${data.current.condition.text}`

    precipitation.innerHTML = `Precipitation : ${data.current.precip_mm} mm`;
    humidity.innerHTML = `Humidity : ${data.current.humidity} %`;
    wind.innerHTML = `Wind : ${data.current.wind_kph} km/h`;

}
weatherAPICall();

function timeDate() {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const monthsOfYear = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let date = new Date();

    let rawHours = date.getHours();
    let hours = rawHours % 12 || 12;
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let period = rawHours >= 12 ? "pm" : "am";
    header1Time.innerHTML = `${daysOfWeek[date.getDay()]}, ${String(hours).padStart("2", "0")}:${String(minutes).padStart("2", "0")}:${String(seconds).padStart("2", "0")} ${period}`;

    let dates = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    header1Date.innerHTML = `${dates} ${monthsOfYear[date.getMonth()]}, ${year}`;
}
timeDate();

setInterval(function() {
    timeDate();
}, 1000);

};
header_section();









// CUSTOM CURSOR :-
const cursor = document.querySelector(".custom-cursor");
document.addEventListener("mousemove", (e) => {
  cursor.style.top = `${e.clientY}px`;
  cursor.style.left = `${e.clientX}px`;
});








// HEADER NAV CHANGE THEME :-
// This will log whole html structure :-
var rootElement = document.documentElement;
// rootElement.style.setProperty("--pri", "#381c0a");
// rootElement.style.setProperty("--sec", "#faf0ba");
var theme = document.querySelector(".theme");
function changeTheme() {
    var flag = 0
    theme.addEventListener('click', function () {

        if (flag == 0) {
            rootElement.style.setProperty('--pri', '#F8F4E1')
            rootElement.style.setProperty('--sec', '#222831')
            rootElement.style.setProperty('--tri1', '#948979')
            rootElement.style.setProperty('--tri2', '#393E46')
            flag = 1
        } else if (flag == 1) {
            rootElement.style.setProperty('--pri', '#F1EFEC')
            rootElement.style.setProperty('--sec', '#030303')
            rootElement.style.setProperty('--tri1', '#D4C9BE')
            rootElement.style.setProperty('--tri2', '#123458')
            flag = 2
        } else if (flag == 2) {
            rootElement.style.setProperty('--pri', '#F8F4E1')
            rootElement.style.setProperty('--sec', '#381c0a')
            rootElement.style.setProperty('--tri1', '#FEBA17')
            rootElement.style.setProperty('--tri2', '#74512D')
            flag = 0
        }
    })
}
changeTheme();








