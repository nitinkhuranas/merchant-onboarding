const category = function(){
    const setStates = async () => {
        try{
            const cities = await apiServices.getAllCities();
            const node = document.querySelector('#category .state select');
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
        const node = document.querySelector('#category .city select');
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
            const node = document.querySelector('#category .type select');
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
        const city = document.querySelector('#category .city select').value;
        const type = document.querySelector('#category .type select').value;
        const obj = {
            city,
            type,
        };
        const postUrl = `${config.baseUrl}/service/getAllServices`;

        try{
            const response = await apiServices.postData(postUrl, obj);
            // const response = await fetch(`./services.json`);
            const data = await response.json();
            const services = data.response;

            const node = document.querySelector('#category .service select');
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
        const name = document.querySelector('#category .name input').value;
        const order = document.querySelector('#category .order input').value;
        const serviceId = document.querySelector('#category .service select').value;

        const obj = {
            name,
            order,
            serviceId,
        };
        
        const postUrl = `${config.baseUrl}/service/category`;

        apiServices.postData(postUrl, obj);
    };

    const addListeners = () => {
        document.querySelector('#category .state select')
        .addEventListener('change', function(event){
            setCities(this.value);
        });

        document.querySelector('#category .type select')
        .addEventListener('change', function(event){
            setService(this.value);
        });

        document.querySelector('#category .save')
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
category();