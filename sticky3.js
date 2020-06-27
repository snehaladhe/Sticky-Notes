var daily = [];
var draft = [];
loadpage();
setTheDate();

  if (!localStorage.pageLoadCount)
    localStorage.pageLoadCount = 0;
  localStorage.pageLoadCount = parseInt(localStorage.pageLoadCount) + 1;
  document.getElementById('count').textContent = localStorage.pageLoadCount;

function addNewTask(newTask, taskDoDate) {
            var note_container = document.querySelector('.note_container');
            var closeButton = document.createElement('button');
            closeButton.textContent = "delete";
            closeButton.classList.add('delete');
            
            closeButton.addEventListener('click', function(e) {
                var n = e.target.parentNode;
                daily.splice(daily.length-1 - $(".note").index(n), 1);
                var jsondaily = JSON.stringify(daily);
                localStorage.setItem("other", jsondaily);
                //e.target.parentNode.classList.add('fade-out');
                n.parentNode.removeChild(n);
                console.log (localStorage);
            });

            var noteContent = document.createElement('div');
            noteContent.classList.add('noteContent');
            var task = document.createElement('span');
            task.classList.add('task');
            task.textContent = newTask;
            noteContent.appendChild(task);
            var date = document.createElement('div');
            date.classList.add('date');
            date.textContent = taskDoDate;
            noteContent.appendChild(date);

            var note = document.createElement('div');
            note.classList.add('note');
            //note.classList.add('fade-out');

            //apend all elements
            note.appendChild(closeButton);
            note.appendChild(noteContent);
            //note_container.appendChild(note);
            $(".note_container").prepend(note);
            console.log (localStorage);
}

function addNewTask_old(keys) {
    var note_container = document.querySelector('.note_container');
    var closeButton = document.createElement('button');
    closeButton.textContent = "✖";
    closeButton.classList.add('delete');

    var note = document.createElement('div');
    note.classList.add('note');
    note.classList.add('fade-out');

    var noteContent = document.createElement('div');
    noteContent.classList.add('noteContent');

    var task = document.createElement('span');
    task.classList.add('task');
    task.textContent = keys[0].newTask;
    noteContent.appendChild(task);

    var date = document.createElement('div');
    date.classList.add('date');
    date.textContent = keys[0].taskDoDate;
    noteContent.appendChild(date);

    //apend all elements
    note.appendChild(closeButton);
    note.appendChild(noteContent);
    note_container.appendChild(note);
    note_container.insertBefore(note, note_container.childNodes[0]);
}

// add to page and localstorage
document.querySelector('form').addEventListener('submit', function(e) { 
    var form = document.querySelector('form');
    var newTask = form.querySelector('textarea').value;
    var taskDoDate = form.querySelector('input[type="date"]').value;
    if (localStorage.getItem('daily') !== null){
        daily = JSON.parse(localStorage.getItem('daily'));       
    }
    // enters localstorage
    daily.push({
        newTask: newTask,
        taskDoDate: taskDoDate,
    });
 
    addNewTask(newTask, taskDoDate);
    var jsondaily = JSON.stringify(daily);
    localStorage.setItem("daily", jsondaily);
    setForm();//to clear
    e.preventDefault();
    return false;
});
// submit with enter button
$("textarea").keyup(function(e){
    if(e.keyCode == 13){
        $(".submit").click();
    }
});

 //save draft from textarea
function saveDraft(Draft, selector,TaskJsonDraft){ //for creating drafts
    var form = document.querySelector('form');
    var Draft = form.querySelector(selector).value;
    var jsonDraft = JSON.stringify(Draft);
    localStorage.setItem(TaskJsonDraft, jsonDraft);
}

function loadpage()
{
    var form = document.querySelector('form');
    var t = JSON.parse(localStorage.getItem('newDraft'));


    t = localStorage.getItem('daily');
    if ( t !== null) {
        //var note_container = document.querySelector('.note_container');
        daily = JSON.parse(localStorage.getItem('daily'));

        for (var i = 0; i < daily.length; i++)
            addNewTask(daily[i].newTask, daily[i].taskDoDate);
    }
}

// for loading last draft when form loaded
function loadDraft(newDraft, selector) { 
    var form = document.querySelector('form');
    if (localStorage.getItem(newDraft) !== null) {
        var newDraft = JSON.parse(localStorage.getItem(newDraft));
        form.querySelector(selector).value = newDraft;
    }
}


function setForm() { 
    var form = document.querySelector('form');
    form.querySelector('textarea').value = "";
}


//not working properly
function setTheDate() { 
    $(document).ready( function() {
    var now = new Date(); 
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear()+"-"+(month)+"-"+(day) ;
   $('#date').val(today);
   });
}