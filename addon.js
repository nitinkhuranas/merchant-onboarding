const addon = function(){
    const setStates = async () => {
        try{
            const cities = await apiServices.getAllCities();
            const node = document.querySelector('#addon .state select');
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
        const node = document.querySelector('#addon .city select');
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

    const setType = async () => {
        try{
            const serviceTypes = await apiServices.getAllServiceTypes();
            const node = document.querySelector('#addon .type select');
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

    setService = async () => {
        const city = document.querySelector('#addon .city select').value;
        const type = document.querySelector('#addon .type select').value;
        const obj = {
            city,
            type,
        };
        const postUrl = `${config.baseUrl}/service/linking`;

        try{
            const response = await apiServices.postData(postUrl, obj);
            // const response = await fetch(`./services.json`);
            const data = await response.json();
            const services = data.response;

            const node = document.querySelector('#addon .service select');
            node.innerHTML = '';

            services.forEach((service)=>{
                const selectNode = document.createElement('option');
                selectNode.text = service.name;
                selectNode.value = service.servicId;
                node.appendChild(selectNode);
            });
        }
        catch(e){
            console.log("an error occured on fetching services",e);
        }
    };

    const save = () => {
        const name = document.querySelector('#addon .name input').value;
        const displayName = document.querySelector('#addon .display-name input').value;
        const unitPrice = document.querySelector('#addon .price input').value;
        const serviceId = document.querySelector('#addon .service select').value;
        const isVeg = document.querySelector('#addon .veg input').checked;
        const InStock = document.querySelector('#addon .in-stock input').checked;

        const obj = {
            name,
            displayName,
            unitPrice,
            serviceId,
            isVeg,
            InStock
        };
        
        const postUrl = `${config.baseUrl}/service/add/addons`;

        apiServices.postData(postUrl, obj);
    };

    const addListeners = () => {
        document.querySelector('#addon .state select')
        .addEventListener('change', function(event){
            setCities(this.value);
        });

        document.querySelector('#addon .type select')
        .addEventListener('change', function(event){
            setService(this.value);
        });

        document.querySelector('#addon .save')
        .addEventListener('click', function(event){
            save();
        });
    };

    const load = ()=> {
        setStates();
        setType();
        addListeners();
    };

    load();
}
addon();