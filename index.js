const setTypes = async () => {
    try{
        const response = await fetch('./types.json');
        const types = await response.json();
        const node = document.querySelector('#type select');
        types.forEach((type)=>{
             const selectNode = document.createElement('option');
             selectNode.text = type;
             selectNode.value = type;
             node.appendChild(selectNode);
        })
    }
    catch(e){
        console.log("an error occured on fetching types");
    }
}

const setStates = async () => {
    try{
        const response = await fetch(`${config.baseURL}/service/getAllCities`);
        const types = await response.json();
        const node = document.querySelector('#state select');
        types.forEach((type)=>{
             const selectNode = document.createElement('option');
             selectNode.text = type;
             selectNode.value = type;
             node.appendChild(selectNode);
        })
    }
    catch(e){
        console.log("an error occured on fetching states");
    }
}

const setCities = async (state) => {
    try{
        const response = await fetch(`${config.baseURL}/service/getAllCities`);
        const types = await response.json();
        const node = document.querySelector('#city select');
        types.forEach((type)=>{
             const selectNode = document.createElement('option');
             selectNode.text = type;
             selectNode.value = type;
             node.appendChild(selectNode);
        })
    }
    catch(e){
        console.log("an error occured on fetching cities");
    }
}

const postData = (url = '', data = {}) => {
    // Default options are marked with *
    const response = fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *client
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    // return await response.json(); // parses JSON response into native JavaScript objects
}

const save = () => {
    const name = document.querySelector('#name input').value;
    const userId = document.querySelector('#user input').value;
    const type = document.querySelector('#type select').value;
    const phone = document.querySelector('#phone input').value;
    const city = document.querySelector('#city select').value;
    const state = document.querySelector('#state select').value;
    const address = document.querySelector('#address input').value;
    const logoUrl = document.querySelector('#logo input').value;
    const log = document.querySelector('#longitude input').value;
    const lat = document.querySelector('#lattitude input').value;
    const paymentMode = document.querySelector('#payment input').value;
    const haveMultiOutlet = document.querySelector('#multi-outlet input').checked;

    const obj = {
        name,
        userId,
        type,
        phone,
        city,
        state,
        address,
        logoUrl,
        log,
        lat,
        paymentMode,
        haveMultiOutlet,
    }
    
    const postUrl = `${config.baseURL}/service/onboard`;

     postData(postUrl, obj);
}

const addListeners = () => {
  document.querySelector('#state select')
    .addEventListener('change', function(event){
        setCities(this.value);
    });

    document.querySelector('#save')
    .addEventListener('click', function(event){
        save();
    });
}

const load = ()=> {
    setTypes();
    setStates();
    addListeners();
};

load();
