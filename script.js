class Quiz {
    constructor(questions){
        this.questions = questions;
        this.question = document.getElementById("question");
        this.answerButtons = document.getElementById("answer-buttons");
        this.feedback = document.getElementById("feedback");
        this.buttonNext =document.getElementById("next-button");
        this.questionIndex = 0;
        this.buttonNext.addEventListener("click", () =>{
            this.next();
        });
    }
    

    initialize(){
        const question = this.questions[this.questionIndex];
        this.question.textContent =question.question;
        this.answerButtons.innerHTML = "";
        for(const answer of question.answers){
            const li = document.createElement("li");
            console.log(answer);
            const btn = document.createElement("button");
            btn.className = "btn";
            btn.textContent = answer.text;
            btn.addEventListener("click", () =>{
                if(answer.correct){
                    for(const item of this.answerButtons.children){
                        item.firstChild.classList.remove("wrong");
                        item.firstChild.disabled = true;
                    }
                    btn.classList.add("correct");
                    this.feedback.textContent = question.explanation;
                    this.feedback.className = "text-correct";
                    this.buttonNext.classList.remove("hide");
                
                }else{
                    btn.classList.add("wrong");
                    this.feedback.textContent = "Raspuns gresit. Te rugam sa incerci din nou";
                    this.feedback.className = "text-wrong";
                }
            })
            li.appendChild(btn);
            this.answerButtons.appendChild(li);
        }
    }
     
    next(){
        this.questionIndex++;
        this.feedback.innerHTML = "";
        this.buttonNext.classList.add("hide");
        if(this.questionIndex === this.questions.length){
            const modalContainer = document.querySelector(".modal-container");
            modalContainer.classList.remove("hide");
            const resetButton = document.getElementById("reset-button");
            resetButton.addEventListener("click",() =>{
                window.location.reload();
            })
            return;
        }
        this.initialize();
    }
}

document.addEventListener("DOMContentLoaded", async () =>{
    const fileData = await fetch ("./questions.json");
    const questions = await fileData.json();
    console.log(questions);

    const quiz = new Quiz(questions);
    quiz.initialize();
})