const services =  () => {
    const getAllCities = () => {
        let allCities = [];
        let resolvedPromise;
        const myPromise = new Promise((resolve)=> {
            resolvedPromise = resolve
        });
    
        const getCities = async () => {
            await myPromise;
            return allCities;
        }
    
        const setCities = async () => {
            try{
                const response = await fetch(`${config.baseUrl}/service/getAllCities`);
                // const response = await fetch(`./cities.json`);
                let data = await response.json();
                allCities = data.response;
                resolvedPromise();
            }
            catch(e){
                console.log("an error occured on fetching states",e);
            }
        };
    
        setCities();
        
        return getCities;
    }
    
    const getAllServiceTypes = () => {
        let serviceTypes = [];
        let resolvedPromise;
        const myPromise = new Promise((resolve)=> {
            resolvedPromise = resolve
        });
    
        const getServiceTypes = async () => {
            await myPromise;
            return serviceTypes;
        }
    
        const setServiceTypes = async () => {
            try{
                const response = await fetch(`${config.baseUrl}/service/getAllServiceTypes`);
                // const response = await fetch(`types.json`);
                let data = await response.json();
                serviceTypes = data.response;
                resolvedPromise();
            }
            catch(e){
                console.log("an error occured on fetching types",e);
            }
        };
    
        setServiceTypes();
    
        return getServiceTypes;
    }
    
    const postData = (url = '', data = {}) => {
        // Default options are marked with *
        return fetch(url, {
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
    };

    return {
        getAllCities: getAllCities(),
        getAllServiceTypes: getAllServiceTypes(),
        postData,
    }
}

const apiServices = services();

