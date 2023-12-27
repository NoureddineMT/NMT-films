
const apiKey = '120f0637ca79d38f18ad54d449e3e3de';

function cleanValue(rawAmount, symbol) {
    return rawAmount.replace(symbol, "+").trim();
}

$('#btnMovie').on("click",function(){
    $('.movieInputDiv').removeClass('d-none');
    $('.tvInputDiv').addClass('d-none');
})
$('#btnTV').on("click",function(){
    $('.tvInputDiv').removeClass('d-none');
    $('.movieInputDiv').addClass('d-none');
})

let myTitle;

$("#button-addon1").on("click",function(){
    document.querySelector(".row").innerHTML = ""
    myTitle = $("#inputMovie").val();
    getMovies(cleanValue(myTitle, " "))
})
$("#button-addon2").on("click",function(){
    document.querySelector(".row").innerHTML = ""
    myTitle = $("#inputTv").val();
    getTv(cleanValue(myTitle, " "))
})

async function getTv(title){
    const apiUrl = `https://api.themoviedb.org/3/search/tv?query=${title}&api_key=${apiKey}&page=1`;
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        for (let i = 0; i < data.results.length; i++) {
            if (data.results[i].poster_path == null) {
                console.log("unlucky");
            }else{
                document.querySelector(".tvRow").innerHTML += `
                    <div class="col-3">
                        <div class="card m-1" style="width: 18rem;">
                            <img src="https://image.tmdb.org/t/p/w500/${data.results[i].poster_path}" class="card-img-top" >
                            <div class="card-body">
                                <h5 class="card-title">${data.results[i].name}</h5>
                                <p class="card-text pWidth" >${data.results[i].overview}</p>
                            </div>
                        </div>
                    </div>
                `
            }
            
        }
        $(".pagination").html(`
            <li class="page-item">
                <a class="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
            <li class="page-item"><a class="page-link" href="#">1</a></li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item">
                <a class="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        `)
        return data.results;
    } catch (error) {
        console.error('Errore durante la richiesta API:', error);
    }
}

async function getMovies(title) {
    const apiUrl = `https://api.themoviedb.org/3/search/movie?query=${title}&api_key=${apiKey}&page=1`;
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        for (let i = 0; i < data.results.length; i++) {
            if (data.results[i].poster_path == null) {
                console.log("unlucky");
            }else{
                document.querySelector(".movieRow").innerHTML += `
                    <div class="col-3">
                        <div class="card m-1" style="width: 18rem;">
                            <img src="https://image.tmdb.org/t/p/w500/${data.results[i].poster_path}" class="card-img-top" >
                            <div class="card-body">
                                <h5 class="card-title">${data.results[i].title}</h5>
                                <p class="card-text pWidth" >${data.results[i].overview}</p>
                            </div>
                        </div>
                    </div>
                `
            }
            
        }
        /* $(".pagination").html(`
            <li class="page-item">
                <a class="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
            <li class="page-item"><a class="page-link" href="#">1</a></li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item">
                <a class="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        `) */
        return data.results;
    } catch (error) {
        console.error('Errore durante la richiesta API:', error);
    }
}

