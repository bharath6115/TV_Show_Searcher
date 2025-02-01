const submit = document.querySelector("button");
const res = document.querySelector("#results");
const inp = document.querySelector("input");
const form = document.querySelector("form");

form.addEventListener("submit",(e)=> {
    e.preventDefault();
    const tot = res.childElementCount;
    for(let i=0 ; i< tot; i++){
        res.firstElementChild.remove();
    }
})

submit.addEventListener("click", async function(){
    fetch(`https://api.tvmaze.com/search/shows?q=${inp.value}`)
        .then((res)=>{
            // console.log(res);
            inp.value='';
            return res.json();
        })
        .then((data)=>{
            for(let d of data){
                const div = document.createElement("div");
                div.classList.add("res")
                const img = document.createElement("img");
                img.setAttribute("src",d.show.image.medium);
                const text = document.createElement("h4");
                text.innerText = d.show.name;
                div.append(img);
                div.append(text);
                res.append(div);
            }

            if(data.length === 0){
                const div = document.createElement("div");
                const text = document.createElement("h1");
                text.innerText = "No shows Exist!";
                div.append(text);
                res.append(div);
                
            }

            console.log(data);
        })
        .catch((e)=>{
            console.log("No such shows Exist!");
            console.log(e);
        })
})
