import axios from 'axios';
import { url } from './url';

const createAd = async({user_id, type, description, specialization, price_type, price, createdAt, updatedAt, id}) => {

    const contenta = {
        id,
        user_id,
        type,
        description,
        specialization,
        price_type,
        price,
        createdAt,
        updatedAt
    }
    debugger;
    await axios.post(`${url}/services`, contenta).then( (res) => {
        console.log(res);
        // window.location.reload();
    }).catch((error) => {
        console.log(error);
    }); 
}

const findServices = async() => {
    const response = await axios.get(`${url}/services`);

    if(response.status === 200) {
        return response.data
    }
}

const sendFile = async (file, id) => {
    debugger;
    
    if (file != undefined) {
        const data = new FormData();
        data.append("file", file[0]);

        const res = await axios({
            url: `${url}/file/${id}`,
            method: "POST",
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            data
        })
        console.log(res);
    }
}

const createUser = async ({ name, email, password, user_uf, user_city, cel, date, file }) => {

    const content = {
        name,
        email,
        password,
        user_uf,
        user_city,
        phone: cel,
        birth_date: date,
    }

    const res = await axios.post(`${url}/users`, content);
    await sendFile(file, res.data.id);

    if (res.status === 200) {
        window.location.href = `/${res.data.id}`;
    } else {
        return (res);
    }
}

const findServicesByType = async ({ categoria }) => {

    const res = await axios.get(`${url}/services/${encodeURIComponent(categoria)}`)
    if (res.status === 200) {
        return res.data;
    }
}

const findServicesById = async (perfil) => {
    const res = await axios.get(`${url}/services/id/${perfil}`)
    if (res.status === 200) {
        return res.data;
    }
}

const findServicesByUserId = async (user_id) => {
    const res = await axios.get(`${url}/services/user_id/${user_id}`)
    if (res.status === 200) {
        return res.data;
    }
}

const findUserById = async (id_user) => {
    const res = await axios.get(`${url}/users/${id_user}`)

    if (res.status === 200) {
        return res.data
    }
}

const createrWork = async ({ worker_id, contractor_id, service_id, created_at, updated_at }) => {
    
    const content = {
        worker_id,
        contractor_id,
        service_id,
        created_at,
        updated_at,
        status: "A",
    }

    const res = await axios.post(`${url}/doneWorkers`, content);
    if (res.status === 200) {
        window.location.href = `/${contractor_id}/${service_id}/await`;
    } else {
        return (res);
    }
}

const findWorks = async () => {

    const res = axios.get(`${url}/doneWorkers`);
    if (res.status === 200) {
        return res.data
    } else {
        return (res);
    }
}

const findFile = async (user_id) => {
    const res = await axios.get(`${url}/file/${user_id}`);
    if (res.status === 200) {
        return res.data;
    } else {
        console.log(res);
    }
}

const deleteServiceById = async ({ userId, serviceId }) => {

    const res = await axios.delete(`${url}/services/${serviceId}`)
    window.location.href = `/${userId}/miServices/`;
}

const updateService = async (content, serviceId) => {
    const res = await axios.put(`${url}/services/${serviceId}`, content)
    window.location.reload();
}

const updateUser = async (content, userId) => {
    const res = await axios.put(`${url}/users/${userId}`, content)
    window.location.reload();
}

const updateWork = async (content, workId) => {
    const res = await axios.put(`${url}/doneWorkers/${workId}`, content)
    window.location.reload();
}

const login = async(content) => {
    const res = await axios.post(`${url}/users/login`, content) 

    if(res.status === 200) {
        window.location.href =  `/${res.data.user.id}`;
    }else {
        return (res);
    }
}

export { createUser, sendFile, createAd, findServicesByType, findServicesById, findUserById, createrWork, findWorks, findFile, findServicesByUserId, deleteServiceById, updateService, updateUser, updateWork, login, findServices }