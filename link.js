const link = function(){
    const setStates = async () => {
        try{
            const cities = await apiServices.getAllCities();
            const node = document.querySelector('#link .state select');
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
        const node = document.querySelector('#link .city select');
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

    const setParentType = async () => {
        try{
            const serviceTypes = await apiServices.getAllServiceTypes();
            const node = document.querySelector('#link .parent-type select');
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

    const setLinkedType = async () => {
        try{
            const serviceTypes = await apiServices.getAllServiceTypes();
            const node = document.querySelector('#link .linked-type select');
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

    setParentService = async () => {
        const city = document.querySelector('#link .city select').value;
        const type = document.querySelector('#link .parent-type select').value;
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

            const node = document.querySelector('#link .parent-service select');
            node.innerHTML = '';

            services.forEach((service)=>{
                const selectNode = document.createElement('option');
                selectNode.text = service.name;
                selectNode.value = service.servicId;
                node.appendChild(selectNode);
            });
        }
        catch(e){
            console.log("an error occured on fetching states",e);
        }
    };

    setLinkedService = async () => {
        const city = document.querySelector('#link .city select').value;
        const type = document.querySelector('#link .linked-type select').value;
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

            const node = document.querySelector('#link .linked-service select');
            node.innerHTML = '';

            services.forEach((service)=>{
                const selectNode = document.createElement('option');
                selectNode.text = service.name;
                selectNode.value = service.servicId;
                node.appendChild(selectNode);
            });
        }
        catch(e){
            console.log("an error occured on fetching states",e);
        }
    };

    const save = () => {
        const parentServiceId = document.querySelector('#link .parent-service select').value;
        const linkingServices = [document.querySelector('#link .linked-service select').value];

        const obj = {
            parentServiceId,
            linkingServices,
        };
        
        const postUrl = `${config.baseUrl}/service/linking`;

        apiServices.postData(postUrl, obj);
    };

    const addListeners = () => {
        document.querySelector('#link .state select')
        .addEventListener('change', function(event){
            setCities(this.value);
        });

        document.querySelector('#link .parent-type select')
        .addEventListener('change', function(event){
            setParentService(this.value);
        });

        document.querySelector('#link .linked-type select')
        .addEventListener('change', function(event){
            setLinkedService(this.value);
        });

        document.querySelector('#link .save')
        .addEventListener('click', function(event){
            save();
        });
    };

    const load = ()=> {
        setStates();
        setParentType();
        setLinkedType();
        addListeners();
    };

    load();
}
link();