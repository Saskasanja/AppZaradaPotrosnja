const infoBudzet = document.querySelector('#info-budzet');
const prihodInfo = document.querySelector('#cifra');
const rashodInfo = document.querySelector('#cifra2');
const procBackground = document.querySelector('#procenat');
const procenat = document.querySelector('#proc');
const select = document.querySelector('#select');
const opis = document.querySelector('#opis');
const iznos = document.querySelector('#iznos');
const submit = document.querySelector('#submit');
const prikazPrihodi = document.querySelector('#prikaz-prihodi');
const prikazRashodi = document.querySelector('#prikaz-rashodi');

let prihodiLista = [];
let rashodiLista = [];

const rasPrih = () => {
    let unos = {
        select: select.value,
        opis: opis.value,
        iznos: Number(iznos.value)
    }
    if (select.value == "prihod" && opis.value !== "" && iznos.value !== "" && Number(iznos.value) > 0){
        prihodiLista.push(unos);
        createDomPrihod(unos.opis, unos.iznos);
    } else if(select.value == "rashod" && opis.value !== "" && iznos.value !== "" && Number(iznos.value) > 0){
        rashodiLista.push(unos);
        createDomRashod(unos.opis, unos.iznos);
    } else{alert("Niste pravilno uneli podatke")}
    //console.log(select.value);
    dostupanBudzet();
    procBackground.style.display = "block";
}

submit.addEventListener("click", () =>{
    rasPrih();
})
const dostupanBudzet = () =>{
    let prihIznos = [];
    let rashIznos = [];
    for (i = 0; i < prihodiLista.length; i++){
        prihIznos.push(prihodiLista[i].iznos)
    }
    for (i = 0; i < rashodiLista.length; i++){
        rashIznos.push(rashodiLista[i].iznos)
    }
    let prihUkp = prihIznos.reduce((a, b) => a + b, 0);
    let rashUkp = rashIznos.reduce((a, b) => a + b, 0);
    

    let dostupanBudz = prihUkp - rashUkp;
    //return dostupanBudz;
    console.log(dostupanBudz);
    prihodInfo.textContent = `+${prihUkp}`;
    rashodInfo.textContent = `-${rashUkp}`;
    infoBudzet.textContent = `${dostupanBudz}`;

    procenat.textContent = `${Math.round((100 * rashUkp) / prihUkp)}%`


}
const createDomPrihod = (op, iz) =>{
    let prikaz = document.createElement('div');
    prikaz.className = "prihod-prikaz";
    let prikazOpis = document.createElement('p');
    prikazOpis.className = "prikaz-opis";
    let prikazIznos = document.createElement('p');
    prikazIznos.className = "prikaz-iznos";
    let obrisi = document.createElement('button');
    obrisi.className = "obrisiPrih";
    obrisi.textContent ="Obrisi";
    prikaz.appendChild(prikazOpis);
    prikaz.appendChild(prikazIznos);
    prikaz.appendChild(obrisi);
    obrisi.addEventListener("click", ()=>{
        obrisi.parentElement.remove();
    })
    prikazPrihodi.appendChild(prikaz);
    prikazOpis.textContent = `${op}`;
    prikazIznos.textContent = `${iz}`;
}
const createDomRashod = (op, iz) =>{
    let prikaz = document.createElement('div');
    prikaz.className ="rashod-prikaz";
    let prikazOpis = document.createElement('p');
    prikazOpis.className = "prikaz-opis";
    let prikazIznos = document.createElement('p');
    prikazIznos.className = "prikaz-iznos";
    let obrisi = document.createElement('button');
    obrisi.className = "obrisi";
    obrisi.textContent ="Obrisi";
    prikaz.appendChild(prikazOpis);
    prikaz.appendChild(prikazIznos);
    prikaz.appendChild(obrisi);
    obrisi.addEventListener("click", ()=>{
        obrisi.parentElement.remove();
    })
    prikazRashodi.appendChild(prikaz);
    prikazOpis.textContent = `${op}`;
    prikazIznos.textContent = `${iz}`;
}
