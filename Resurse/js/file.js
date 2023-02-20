function randClass(a, b) {
    return Math.floor(Math.random() * (b - a)) + a;
}

mingistil = ["https://pngimg.com/uploads/football/football_PNG28465.png",
    "https://cdn-icons-png.flaticon.com/512/1165/1165249.png",
    "https://cdn-icons-png.flaticon.com/512/491/491639.png",
    "https://cdn-icons-png.flaticon.com/512/491/491588.png"]

window.onload = function () {
    let idTinterval = setTimeout(function (){
        alert ("Ultimul meci al anului - Supercupa Romaniei: FC CFR 1907 Cluj - Sepsi OSK\n" + "Data desfasurare: 9 iulie 2022\n"
        + "Ora: 20:30\n"+ "Stadion: Arena Francisc Neuman")
    } ,10000);

    let cheielocal = localStorage.getItem("nume");
    if (cheielocal != null) {
        let baraNume = document.getElementById("nume");
        baraNume.value = cheielocal;

    }
    let ulechipe = document.getElementById("echipe");
    let liechipe = ulechipe.getElementsByTagName("li");
    let i = 0;

    let idInterval = setInterval(function () {
        liechipe[i].style.color = "rgb(" + randClass(0, 256) + "," + randClass(0, 256) + "," + randClass(0, 256) + ")";
        i += 1
        if (i == 16) {
            clearInterval(idInterval);
        }
    }, 500)
    let buton = document.getElementById("butonnume");
    buton.onclick = function submit() {
        let nume = document.getElementById("nume").value;
        localStorage.setItem("nume", nume);
    }

    var nrmingi = 0;
    document.body.onclick = function mingi(e) {
        let minge = document.createElement("img");
        minge.classList.add("mingi");
        minge.src = mingistil[randClass(0,4)];
        minge.style.position = "absolute";
        minge.style.left = e.clientX + "px";
        minge.style.top = e.clientY + "px";
        minge.style.width = "15px";
        minge.style.height = "15px";
        nrmingi += 1;
        document.body.appendChild(minge);
    }

    window.onkeydown = function (e) {
        if (e.key == 's') {
            let minge = document.querySelectorAll(".mingi");
            for (let i = 0; i < minge.length; i++) {
                minge[i].remove();
            }
        }
    }
    var casaLiga = document.getElementById("mingipuse");
    casaLiga.onclick = function (e){
        if (e.currentTarget == e.target){
            if (nrmingi == 1){
                alert('S-a inserat o minge!');
            }
            if(nrmingi > 1) {
                alert('S-au inserat pe site ' + nrmingi + ' mingi!');
            }
            else if (nrmingi > 19){
                alert('S-au inserat pe site ' + nrmingi + ' de mingi!');
            }
            e.stopPropagation();
        }
    }

    let arena = document.getElementsByTagName("h6");
    let stil = getComputedStyle(arena[0], null);
    let national = document.getElementsByTagName("figcaption");
    national[0].style.color = stil.color;


}
