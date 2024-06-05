document.getElementById('search-button').addEventListener('click', searchPhones);
const phoneList = document.getElementById('phone-list');
document.body.addEventListener('click', function(event) {
    const dialogBox = document.querySelector('.dialog-box');
    if (dialogBox && !dialogBox.contains(event.target)) {
        closeDialog();
    }
});


async function searchPhones() {
    const userInput = document.getElementById('search-box').value;
    const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${userInput}`);
    const data = await response.json();
    console.log(data);
    data.status == true ? console.log("Right request") : console.log("Wrong request");
    displayPhones(data.data);
}

function displayPhones(phones) {
    phoneList.innerHTML = '';

    for(const phone of phones){
        const newDiv = makeANewDiv(phone);
        phoneList.appendChild(newDiv);
    }
    phoneList.style.display = "block";
}
    
    function makeANewDiv (phone) {
        const newDiv = document.createElement('div');
        newDiv.classList.add('phone-item');

        newDiv.innerHTML = `
            <span>${phone.phone_name}</span>
            <img src="${phone.image}" alt="${phone.phone_name}">
            <button onclick="showDetails('${phone.slug}')">Show Details</button>
        
    `;
        return newDiv;
    }

    async function showDetails(slug) {
        const response = await fetch(`https://openapi.programming-hero.com/api/phone/${slug}`);
        const result = await response.json();
        
        const dialogBox = document.createElement('div');
        dialogBox.classList.add('dialog-box');
    
        dialogBox.innerHTML = `
            <span class="close-btn" onclick="closeDialog()">&times;</span>
            <h2>${result.data.name}</h2>
            <img src="${result.data.image}" alt="${result.data.name}">
            <p><strong>Brand:</strong> ${result.data.brand}</p>
            <p><strong>Release Date:</strong> ${result.data.releaseDate}</p>
            <p><strong>Main Features:</strong></p>
            <ul>
                <li><strong>Chipset:</strong> ${result.data.mainFeatures.chipSet}</li>
                <li><strong>Display Size:</strong> ${result.data.mainFeatures.displaySize}</li>
                <li><strong>Memory:</strong> ${result.data.mainFeatures.memory}</li>
                <li><strong>Storage:</strong> ${result.data.mainFeatures.storage}</li>
            </ul>
            <p><strong>Sensors:</strong> ${result.data.mainFeatures.sensors.join(', ')}</p>
        `;
    
        document.body.appendChild(dialogBox);
        document.body.appendChild(createOverlay()); // Add overlay
    }
    
    function createOverlay() {
        const overlay = document.createElement('div');
        overlay.classList.add('dialog-box-overlay');
        return overlay;
    }
    
    function closeDialog() {
        const dialogBox = document.querySelector('.dialog-box');
        const overlay = document.querySelector('.dialog-box-overlay');
        if (dialogBox && overlay) {
            dialogBox.parentNode.removeChild(dialogBox);
            overlay.parentNode.removeChild(overlay);
            document.querySelector('.container').classList.remove('dimmed');
        }
    }
    



// {
//     "status": true,
//     "data": {
//       "mainFeatures": {
//         "storage": "128GB/256GB storage, no card slot",
//         "displaySize": "6.55 inches, 103.6 cm2 (~89.0% screen-to-body ratio)",
//         "chipSet": "Qualcomm SM8350 Snapdragon 888 5G (5 nm)",
//         "memory": "128GB 8GB RAM, 256GB 8GB RAM, 256GB 12GB RAM",
//         "sensors": [
//           "Fingerprint (under display",
//           "optical)",
//           "accelerometer",
//           "gyro",
//           "proximity",
//           "compass",
//           "color spectrum"
//         ]
//       },
//       "slug": "oppo_find_x5-11378",
//       "name": "Find X5",
//       "releaseDate": "Exp. release 2022, March 14",
//       "brand": "Oppo",
//       "image": "https://fdn2.gsmarena.com/vv/bigpic/oppo-find-x5.jpg",
//       "others": {
//         "WLAN": "Wi-Fi 802.11 a/b/g/n/ac/6, dual-band, Wi-Fi Direct, hotspot",
//         "Bluetooth": "5.2, A2DP, LE, aptX HD",
//         "GPS": "Yes, with dual-band A-GPS, GLONASS, BDS, GALILEO, QZSS",
//         "NFC": "Yes",
//         "Radio": "No",
//         "USB": "USB Type-C 3.1, USB On-The-Go"
//       }
//     }
//   }
