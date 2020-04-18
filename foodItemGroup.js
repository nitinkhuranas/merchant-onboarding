const foodItemGroup = function(){
    const setStates = async () => {
        try{
            const cities = await apiServices.getAllCities();
            const node = document.querySelector('#food-item-group .state select');
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
        const node = document.querySelector('#food-item-group .city select');
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
            const node = document.querySelector('#food-item-group .type select');
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

    const setService = async () => {
        const city = document.querySelector('#food-item-group .city select').value;
        const type = document.querySelector('#food-item-group .type select').value;
        const obj = {
            city,
            type,
        };
        const postUrl = apiServices.getAllServicesUrl();

        try{
            const response = await apiServices.postData(postUrl, obj);
            // const response = await fetch(`./services.json`);
            const data = await response.json();
            const services = data.response;

            const node = document.querySelector('#food-item-group .service select');
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

    const setAddon = async () => {
        const serviceId = document.querySelector('#food-item-group .service select').value;
        const fetchUrl = apiServices.getAllAddonsUrl(servicId)

        try{
            const response = await fetch(fetchUrl);
            // const response = await fetch(`./addons.json`);
            const data = await response.json();
            const addons = data.response;

            const node = document.querySelector('#food-item-group .addon select');
            node.innerHTML = '';

            addons.forEach((addon)=>{
                const selectNode = document.createElement('option');
                selectNode.text = addon.displayName;
                selectNode.value = JSON.stringify(addon);
                node.appendChild(selectNode);
            });
        }
        catch(e){
            console.log("an error occured on fetching categories",e);
        }
    };

    const save = () => {
        const groupName = document.querySelector('#food-item-group .name input').value;
        const serviceId = document.querySelector('#food-item-group .service select').value;
        const groupOrder = document.querySelector('#food-item-group .order input').value;
        const maxSelections = document.querySelector('#food-item-group .max-selection input').value;
        const multiSelectEnabled = document.querySelector('#food-item-group .enable-multiselect input').checked;
        const addons = [document.querySelector('#food-item-group .addon select').value];

        const obj = {
            groupName,
            serviceId,
            groupOrder,
            maxSelections,
            multiSelectEnabled,
            addons,
        };
        
        const postUrl = `${config.baseUrl}/service/add/group`;

        apiServices.postData(postUrl, obj);
    };

    const addListeners = () => {
        document.querySelector('#food-item-group .state select')
        .addEventListener('change', function(event){
            setCities(this.value);
        });

        document.querySelector('#food-item-group .type select')
        .addEventListener('change', function(event){
            setService();
        });

        document.querySelector('#food-item-group .service select')
        .addEventListener('change', function(event){
            setAddon();
        });


        document.querySelector('#food-item-group .save')
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
foodItemGroup();