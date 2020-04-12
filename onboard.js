const onboard = function() {

    const setTypes = async () => {
        try{
            const serviceTypes = await apiServices.getAllServiceTypes();
            const node = document.querySelector('#onboard .type select');
            serviceTypes.forEach((type)=>{
                const selectNode = document.createElement('option');
                selectNode.text = type;
                selectNode.value = type;
                node.appendChild(selectNode);
            });
        }
        catch(e){
            console.log("an error occured on fetching types",e);
        }
    };

    const setStates = async () => {
        try{
            const cities = await apiServices.getAllCities();
            const node = document.querySelector('#onboard .state select');
            cities.forEach(({state})=>{
                const selectNode = document.createElement('option');
                selectNode.text = state;
                selectNode.value = state;
                node.appendChild(selectNode);
            });
        }
        catch(e){
            console.log("an error occured on fetching states",e);
        }
    };

    const setCities = async (selectedState) => {
        const node = document.querySelector('#onboard .city select');
        node.innerHTML = '';
        let selectedCities = []; 
        
        const cities = await apiServices.getAllCities();
        cities.forEach(({state, cities}) => {
            if(selectedState === state){
                selectedCities = cities;
            }
        })

        selectedCities.forEach((type)=>{
            const selectNode = document.createElement('option');
            selectNode.text = type;
            selectNode.value = type;
            node.appendChild(selectNode);
        });
    };

    const save = () => {
        const name = document.querySelector('#onboard .name input').value;
        const userId = document.querySelector('#onboard .user input').value;
        const type = document.querySelector('#onboard .type select').value;
        const phone = document.querySelector('#onboard .phone input').value;
        const city = document.querySelector('#onboard .city select').value;
        const state = document.querySelector('#onboard .state select').value;
        const address = document.querySelector('#onboard .address input').value;
        const logoUrl = document.querySelector('#onboard .logo input').value;
        const log = document.querySelector('#onboard .longitude input').value;
        const lat = document.querySelector('#onboard .lattitude input').value;
        const paymentMode = document.querySelector('#onboard .payment input').value;
        const haveMultiOutlet = document.querySelector('#onboard .multi-outlet input').checked;

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
        
        const postUrl = `${config.baseUrl}/service/onboard`;

        apiServices.postData(postUrl, obj);
    };

    const addListeners = () => {
        document.querySelector('#onboard .state select')
        .addEventListener('change', function(event){
            setCities(this.value);
        });

        document.querySelector('#onboard .save')
        .addEventListener('click', function(event){
            save();
        });
    };

    const load = ()=> {
        setTypes();
        setStates();
        addListeners();
    };

    load();
}

onboard();
