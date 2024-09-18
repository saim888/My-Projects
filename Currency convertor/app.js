// const BASE_URL ="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/IND/PKR.json";
// const BASE_URL ="https://latest.currency-api.pages.dev/v1/currencies";
// const BASE_URL ="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1";

// const dropdowns = document.querySelectorAll(".dropdown select")
// const btn = document.querySelector("form button")
// const fromCurr = document.querySelector(".from select")
// const toCurr = document.querySelector(".to select")


// for (let select of dropdowns){
//     for(currCode in countryList){
//         let newOption = document.createElement("option")
//         newOption.innerText=currCode;
//         newOption.value=currCode
//         if(select.name === "from" && currCode ==="USD") {
//             newOption.selected = "selected"
//         }
//         else if(select.name ==="to" && currCode === "PKR") {
//             newOption.selected ="selected"
//         }
//         select.append(newOption)
//     }
//     select.addEventListener("change", (evt)=>{
//         updateFlag(evt.target);
//     })
// }

// const updateFlag = (element) => {
//     let currCode = element.value;
//     let countryCode = countryList[currCode];
//     let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
//     let img = element.parentElement.querySelector("img");
//     img.src =newSrc;
// };

// btn.addEventListener("click", async (evt)=>{
//     evt.preventDefault();
//     let amount = document.querySelector(".amount input");
//     let amtVal = amount.value;
//     if (amtVal === "" || amtVal < 1) {
//         amtVal = 1;
//         amount.value = "1";
//     }
    // console.log(fromCurr.value, toCurr.value)
    // const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;

    // let response = await fetch(URL);
    // console.log(response)


//     const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
//     let response = await fetch(URL);
//     let data = await response.json();
//     let rete = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
//     let finalAmount = amtVal*rete;
//     console.log(response);

// })


                                                                    // NEW CODE FOR THIS ONE 


document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const amountInput = document.querySelector('.amount input');
    const fromSelect = document.querySelector('.from select');
    const toSelect = document.querySelector('.to select');
    const msgDiv = document.querySelector('.msg');
    const fromFlag = document.querySelector('.from img');
    const toFlag = document.querySelector('.to img');

    // Generate the options for both selects based on the countryList
    function populateCurrencyOptions() {
        for (const currencyCode in countryList) {
            const option = document.createElement('option');
            option.value = currencyCode;
            option.textContent = currencyCode;
            
            // cloneNode will copy the option's attribute and id so it is identical meaning it can thousands of copies of the orignal option with same CSS
            fromSelect.appendChild(option.cloneNode(true));
            toSelect.appendChild(option);
        }
    }

            


    populateCurrencyOptions();

    // Function to update the flag when a currency is selected dynamically
    function updateFlag(selectElement, flagElement) {
        const currencyCode = selectElement.value;
        const countryCode = countryList[currencyCode];
        flagElement.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
    }

    // Update flags initially it means it will shows the pre selected flags
    updateFlag(fromSelect, fromFlag);
    updateFlag(toSelect, toFlag);

    // Add event listeners to update flags when the selected currency changes
    fromSelect.addEventListener('change', function () {
        updateFlag(fromSelect, fromFlag);
    });

    toSelect.addEventListener('change', function () {
        updateFlag(toSelect, toFlag);
    });

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const amount = parseFloat(amountInput.value);
        const fromCurrency = fromSelect.value;
        const toCurrency = toSelect.value;


        //NaN checks the number typed by the user is number or not
        if (isNaN(amount) || amount <= 0) {
            msgDiv.textContent = 'Please enter a valid amount.';
            return;
        }

        // Fetch the exchange rate from a currency converter API
        fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)// This API will fetch us the data of the currency selected by the user as his first currency and the second currency is his desired currency to be change

            //Here in first promise I am retrieving the response and converting in javscript objects then in second I am using the objects by the Data parameter.
            .then(response => response.json())
            .then(data => {
                //Getting the rate of the currency user wants to change
                const rate = data.rates[toCurrency];
                if (!rate) {
                    msgDiv.textContent = 'Currency not found.';
                    return;
                }
                //Final converted amount after multiplying the rate of the currency selected by the user and multiplying it to the amount typed by the user
                const convertedAmount = (amount * rate).toFixed(2);
                msgDiv.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
            })
            //Catching the error if it arises from the API
            .catch(error => {
                console.error('Error fetching the exchange rate:', error);
                msgDiv.textContent = 'Error fetching the exchange rate.';
            });
    });
});
