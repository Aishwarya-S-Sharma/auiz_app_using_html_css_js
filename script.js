const questions=[{
    question: 'What is the capital of France?',
    answer:[{text:"Paris",correct:true},
        {text:"Berlin", correct:false},
        {text:"London", correct:false},
        {text:"Madrid", correct:false},
    ]
},
{
    question: 'Who is the author of the book "To Kill a Mockingbird"?',
    answer:[
        {text:"Harriet Tubman", correct:false},
        {text:"Harper Lee", correct:true},
        {text:"J.D. Salinger", correct:false},
        {text:"Ernest Hemingway", correct:false},
    ]

},
{
    question: 'Who painted the Mona Lisa?',
    answer:[
        {text:"Pablo Picasso", correct:false},
        {text:"Vincent van Gogh", correct:false},
        {text:"Leonardo da Vinci", correct:true},
        {text:"Edgar Degas", correct:false},
    ]   
},{
    question: 'What is the name of the ancient city-state in Asia?',
    answer:[
        {text:"Tokyo", correct:false},
        {text:"Babylon", correct:true},
        {text:"Mecca", correct:false},
        {text:"Shanghai", correct:false},
    ]
},
{
    question: 'Who is the author of the book "The Great Gatsby"?',
    answer:[
        {text:"Harper Lee", correct:false},
        {text:"J.D. Salinger", correct:false},
        {text:"F. Scott Fitzgerald", correct:true},
        {text:"Ernest Hemingway", correct:false},
    ]
},{
    question: 'What is the name of the first American city?',
    answer:[
        {text:"Los Angeles", correct:false},
        {text:"Chicago", correct:false},
        {text:"New York City", correct:true},
        {text:"San Francisco", correct:false},
    ]
},
{
    question: 'What is the name of the first U.S. state?',
    answer:[
        {text:"Alabama", correct:false},
        {text:"New York", correct:false},
        {text:"California", correct:false},
        {text:"Texas", correct:true},
    ]
},{
    question: 'What is the name of the largest ocean in the world?',
    answer:[
        {text:"Atlantic Ocean", correct:false},
        {text:"Pacific Ocean", correct:true},
        {text:"Indian Ocean", correct:false},
        {text:"Arctic Ocean", correct:false},
    ]
},{
    question: 'Who is the author of the book "1984"?',
    answer:[
        {text:"F. Scott Fitzgerald", correct:false},
        {text:"J.D. Salinger", correct:false},
        {text:"Ernest Hemingway", correct:false},
        {text:"George Orwell", correct:true}
    ]
},{
    question: 'Who is the author of the book "The Catcher in the Rye"?',
    answer:[
        {text:"F. Scott Fitzgerald", correct:false},
        {text:"J.D. Salinger", correct:true},
        {text:"Harper Lee", correct:false},
        {text:"Ernest Hemingway", correct:false},
    ]
}];

const questionElement=document.getElementById("question");
const answerButton=document.getElementById("answer-buttons");
const nextButton=document.getElementById("next-btn");

let currentQuestionIndex=0;
let score=0;

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion=questions[currentQuestionIndex]
    let questionNo=currentQuestionIndex+1;
    questionElement.innerHTML=questionNo+". "+currentQuestion.question;


    currentQuestion.answer.forEach(answer => {
        let button=document.createElement("button");
        button.innerText=answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }

        button.addEventListener("click", selectAnswer)
        
    });
}


function selectAnswer(e){
    let selectedButton=e.target;
    const isCorrect=selectedButton.dataset.correct==="true";
    if(isCorrect){
        selectedButton.classList.add("correct");
        score++;
    }
    else{
        selectedButton.classList.add("incorrect");
    }

    Array.from(answerButton.children).forEach(button=>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    })
    nextButton.style.display="block";

}

function resetState(){
    nextButton.style.display="none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}


nextButton.addEventListener("click", ()=>{
    
    if(currentQuestionIndex<questions.length){
        handleNextButton();
    }
    else{

        startQuiz();
    }

})

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
    showQuestion();}
    else{
        showScore()
    }
}

function showScore(){
    resetState();
    questionElement.innerHTML="Your final score is: "+score+"/"+questions.length;
    nextButton.innerHTML="Play Again";
    nextButton.style.display="block"
}
startQuiz();