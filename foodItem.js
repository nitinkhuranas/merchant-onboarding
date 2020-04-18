const foodItem = function(){
    const setStates = async () => {
        try{
            const cities = await apiServices.getAllCities();
            const node = document.querySelector('#food-item .state select');
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
        const node = document.querySelector('#food-item .city select');
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
            const node = document.querySelector('#food-item .type select');
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
        const city = document.querySelector('#food-item .city select').value;
        const type = document.querySelector('#food-item .type select').value;
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

            const node = document.querySelector('#food-item .service select');
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

    const setCategory = async () => {
        const serviceId = document.querySelector('#food-item .service select').value;
        const fetchUrl = apiServices.getAllCatagoriesUrl(servicId);

        try{
            const response = await fetch(fetchUrl);
            // const response = await fetch(`./categories.json`);
            const data = await response.json();
            const catagories = data.response;

            const node = document.querySelector('#food-item .category select');
            node.innerHTML = '';

            catagories.forEach((category)=>{
                const selectNode = document.createElement('option');
                selectNode.text = category.name;
                selectNode.value = category.name;
                node.appendChild(selectNode);
            });
        }
        catch(e){
            console.log("an error occured on fetching categories",e);
        }
    };

    const setFoodItemGroup = async () => {
        const serviceId = document.querySelector('#food-item .service select').value;
        const fetchUrl = apiServices.getAllGroupsUrl(servicId);

        try{
            const response = await fetch(fetchUrl);
            // const response = await fetch(`./foodItemGroup.json`);
            const data = await response.json();
            const foodItemGroups = data.response;

            const node = document.querySelector('#food-item .food-item-group select');
            node.innerHTML = '';

            foodItemGroups.forEach((foodItemGroup)=>{
                const selectNode = document.createElement('option');
                selectNode.text = foodItemGroup.groupName;
                selectNode.value = JSON.stringify(foodItemGroup);
                node.appendChild(selectNode);
            });
        }
        catch(e){
            console.log("an error occured on fetching categories",e);
        }
    };

    const save = () => {
        const name = document.querySelector('#food-item .name input').value;
        const serviceId = document.querySelector('#food-item .service select').value;
        const description = document.querySelector('#food-item .description input').value;
        const category = document.querySelector('#food-item .category select').value;
        const displayUrl = document.querySelector('#food-item .display-url input').value;
        const isVeg = document.querySelector('#food-item .veg input').checked;
        const InStock = document.querySelector('#food-item .in-stock input').checked;
        const unitPrice = document.querySelector('#food-item .price input').value;
        const itemScore = document.querySelector('#food-item .item-score input').value;
        const discount = document.querySelector('#food-item .discount input').value;
        const addons = [document.querySelector('#food-item .food-item-group select').value];

        const obj = {
            name,
            serviceId,
            description,
            category,
            displayUrl,
            isVeg,
            InStock,
            unitPrice,
            itemScore,
            discount,
            addons,
        };
        
        const postUrl = `${config.baseUrl}/service/add/foodItem`;

        apiServices.postData(postUrl, obj);
    };

    const addListeners = () => {
        document.querySelector('#food-item .state select')
        .addEventListener('change', function(event){
            setCities(this.value);
        });

        document.querySelector('#food-item .type select')
        .addEventListener('change', function(event){
            setService();
        });

        document.querySelector('#food-item .service select')
        .addEventListener('change', function(event){
            setCategory();
            setFoodItemGroup()
        });

        document.querySelector('#food-item .save')
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
foodItem();