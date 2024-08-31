const subject = document.querySelector('#abc');
const quest = document.querySelector('#pqr');
const submit = document.querySelector('#bttn');
const rdiv = document.querySelector('.rdiv');
const qbutton = document.getElementById('bttn1');
const leftdiv = document.getElementsByClassName('ldiv')[0];
const responsediv = document.getElementById('respdiv');
const lastdiv = document.getElementById('lastdivs');
const lastheading = document.querySelector('#name');
const lapara = document.querySelector('#comment');
const heading2 = document.getElementById('heading2');
const resolvebtn = document.getElementById('resolvebtn');
const lastbttn = document.getElementById('lastsubmit');
let count = 0;


function loadData() {
    count = parseInt(localStorage.getItem('id')) || 0;
    return JSON.parse(localStorage.getItem("data")) || [];
}


function saveCount() {
    localStorage.setItem('id', JSON.stringify(count));
}


function saveData(data) {
    localStorage.setItem("data", JSON.stringify(data));
}


const arr = loadData();
arr.forEach(displayQuestion);

qbutton.addEventListener("click", () => {
    leftdiv.style.display = "block";
    responsediv.style.display = "none";
    subject.value = "";
    quest.value = "";
});


submit.addEventListener("click", () => {
    if (subject.value.trim() === "" || quest.value.trim() === "") {
        alert("Fields cannot be empty");
    } else {
        const obj = {
            id: count++,
            subject: subject.value,
            question: quest.value,
            reply: []
        };

        arr.push(obj);
        saveData(arr);
        saveCount();

        displayQuestion(obj);

        subject.value = "";
        quest.value = "";
    }
});


function displayQuestion(obj) {
    const inner = document.createElement('div');
    inner.setAttribute('id', 'inner');
    inner.setAttribute('data-id', obj.id);
    rdiv.appendChild(inner);

    const head = document.createElement('h3');
    head.setAttribute('id', 'heading');
    head.textContent = obj.subject;
    inner.appendChild(head);

    const para = document.createElement('p');
    para.setAttribute('id', 'para');
    para.textContent = obj.question;
    inner.appendChild(para);

    inner.addEventListener("click", () => viewResponses(obj));
}


function viewResponses(obj) {
    leftdiv.style.display = "none";
    responsediv.style.display = "block";
    lastdiv.innerHTML = "";
    const parafrst = document.getElementById('paraupper');
    const hding = document.getElementById('hd3');
    hding.textContent = obj.subject;
    parafrst.textContent = obj.question;

    if (obj.reply.length > 0) {
        heading2.style.display = "block";
        lastdiv.style.display = "block";

        obj.reply.forEach(e => {
            const mydiv = document.createElement('div');
            mydiv.setAttribute('id', 'mydiv');
            lastdiv.appendChild(mydiv);

            const lasthead = document.createElement('h1');
            lasthead.textContent = e.name;
            mydiv.appendChild(lasthead);

            const lastpara = document.createElement('p');
            lastpara.textContent = e.ans;
            mydiv.appendChild(lastpara);
        });
    } else {
        heading2.style.display = "none";
        lastdiv.style.display = "none";
    }

    lastbttn.onclick = () => addResponse(obj);
    resolvebtn.onclick = () => deleteQuestion(obj);
}

 function deleteQuestion(obj) {
    const index = arr.findIndex(el => el.id === obj.id);

    if (index !== -1) {
        arr.splice(index, 1);
        saveData(arr);

        const questionElement = document.querySelector(`[data-id="${obj.id}"]`);
        if (questionElement) {
            questionElement.remove();
        }

        resetView();
    }
}

 function addResponse(obj) {
    if (lastheading.value.trim() === "" || lapara.value.trim() === "") {
        alert("All fields must be filled");
    } else {
        const response = {
            name: lastheading.value,
            ans: lapara.value
        };

        const index = arr.findIndex(e => e.id === obj.id);

        if (index !== -1) {
            arr[index].reply.push(response);
            saveData(arr);

             lastdiv.innerHTML = "";

             arr[index].reply.forEach(e => {
                const mydiv = document.createElement('div');
                mydiv.setAttribute('id', 'mydiv');
                lastdiv.appendChild(mydiv);

                const lasthead = document.createElement('h1');
                lasthead.textContent = e.name;
                mydiv.appendChild(lasthead);

                const lastpara = document.createElement('p');
                lastpara.textContent = e.ans;
                mydiv.appendChild(lastpara);
            });

             if (arr[index].reply.length > 0) {
                lastdiv.style.display = "block";
            }

            lastheading.value = "";
            lapara.value = "";
        }
    }
}

 function resetView() {
    leftdiv.style.display = "block";
    responsediv.style.display = "none";
    subject.value = "";
    quest.value = "";
}
