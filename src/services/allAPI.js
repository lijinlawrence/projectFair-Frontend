

// REGISTER API

const { BASE_URL } = require("./baseUrl")
const { commonAPI } = require("./commonAPI")

export const registerAPI = async (user)=>{
    return await commonAPI("POST",`${BASE_URL}/user/register`,user,"")
}

export const loginAPI = async (user)=>{
    return await commonAPI("POST",`${BASE_URL}/user/login`,user,"")

}

// add project
export const addProjectAPI = async (reqBody,reqHeader)=>{
    return await commonAPI("POST",`${BASE_URL}/projects/add`,reqBody,reqHeader)

}

// homeProjects

export const homeProjectAPI = async ()=>{
    return await commonAPI("GET",`${BASE_URL}/projects/home-projects`,"","")

}

// all project
export const allProjectAPI = async (searchKey ,reqHeader)=>{
    return await commonAPI("GET",`${BASE_URL}/projects/all?search=${searchKey}`,"",reqHeader)

}

// user Project

export const userProjectAPI = async (reqHeader)=>{
    return await commonAPI("GET",`${BASE_URL}/user/all-projects`,"",reqHeader)

}

//edit project
export const editProjectAPI = async (projectId, reqBody, reqHeader) => {
    return await commonAPI("PUT", `${BASE_URL}/projects/edit/${projectId}`, reqBody, reqHeader);
}; // <--- Remove the comma here


// delete Project
export const deleteProjectAPI = async (projectId, reqHeader) => {
    return await commonAPI("DELETE", `${BASE_URL}/projects/remove/${projectId}`, {}, reqHeader);
};



