const insult = document.querySelector("#myinsult");//selecting by ID
const btn= document.querySelector("#btn");// selecting by ID

btn.addEventListener("click",getQuote);

//declared a function that could fetch the api and generate a new quote everytime its called
function getQuote(){
    fetch("http://api.quotable.io/random")

    .then(res => res.json())
    .then(data => {
        
        insult.innerHTML=data.content;
        
    })
    
}

