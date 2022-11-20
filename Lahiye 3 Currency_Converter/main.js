const requestURL = 'https://api.exchangerate.host/latest';
async function currency(){
  const res=await fetch(requestURL);
  const data= await res.json();
  const arrValues=Object.values(data.rates);
  const rates=data.rates;
  return rates;
}
console.log(currency());

const input1 = document.getElementsByName("input1")[0];
const input2 = document.getElementsByName("input2")[0];
const res1 = document.querySelector(".res1");
const res2= document.querySelector(".res2");
const btn1 = document.querySelectorAll(".btn1");
const btn2 = document.querySelectorAll(".btn2");
const one = document.getElementsByName("one");
const two = document.getElementsByName("two");
const rubl1 = document.getElementById("rubl1");
const usd1 = document.getElementById("usd1");
const euro1 = document.getElementById("euro1");
const gbp1= document.getElementById("gbp1");
const rubl2 = document.getElementById("rubl2");
const usd2 = document.getElementById("usd2");
const euro2 = document.getElementById("euro2");
const gbp2 = document.getElementById("gbp2");

//-----------------------FUNCTIONS---------------------------//
let first;
let second;
function conversion(event) {
    if (event.target.className == "btn1" || event.target.className == "btn2") {
        const changes = [...event.target.parentElement.children];
        changes.forEach(item => {
            if (item.classList.contains("def")) {
                item.classList.remove("def");
            };
        });
        event.target.classList.add("def");
    };
};
function directConversion() {
    one.forEach(item => {
        if (item.classList.contains("def")) {
            first = item.innerHTML;
        };
    })
    two.forEach(item => {
        if (item.classList.contains("def")) {
            second = item.innerHTML;
        };
    })
    fetch(`https://api.exchangerate.host/latest?base=${first}&symbols=${second}`)
        .then(r => r.json())
        .then((data) => {
            input2.value = Number(input1.value) * data.rates[second];
            res1.innerHTML = `1 ${first} = ${data.rates[second]} ${second}`;
            res2.innerHTML = `1 ${second} = ${1 / data.rates[second]} ${first}`;
        })
        .catch(error => {
            alert("Oops! Something went wrong");
        }
        )
};
function inverseConversion() {
    one.forEach(item => {
        if (item.classList.contains("def")) {
            first = item.innerHTML;
        };
    })
    two.forEach(item => {
        if (item.classList.contains("def")) {
            second = item.innerHTML;
        };
    })
    fetch(`https://api.exchangerate.host/latest?base=${second}&symbols=${first}`)
        .then(r => r.json())
        .then((data) => {
            input1.value = Number(input2.value) * data.rates[first];
            res1.innerHTML = `1 ${first} = ${1 / data.rates[first]} ${second}`;
            res2.innerHTML = `1 ${second} = ${data.rates[first]} ${first}`;
        })
        .catch(error => {
            alert("Oops! Something went wrong");
        }
        )
};
//----------------------------------------------------------------------//
rubl1.addEventListener("click", conversion);
usd1.addEventListener("click", conversion);
euro1.addEventListener("click", conversion);
gbp1.addEventListener("click", conversion);

rubl2.addEventListener("click", conversion);
usd2.addEventListener("click", conversion);
euro2.addEventListener("click", conversion);
gbp2.addEventListener("click", conversion);

input1.addEventListener("keypress", directConversion);
input2.addEventListener("keypress", inverseConversion);



