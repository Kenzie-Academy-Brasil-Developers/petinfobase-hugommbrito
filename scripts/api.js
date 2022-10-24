let baseURL = "http://localhost:3333"

// LOGIN
async function loginAPI(body) {
    let options = {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify(body),
    }

    let responseJSON = await fetch(baseURL+"/login", options);
    let response = await responseJSON.json()

    return response
}


// CADASTRAR
async function registerAPI(body) {
    let options = {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify(body)
    }
    let responseJSON = await fetch(baseURL+"/users/create", options)
    let response = await responseJSON.json()

    return response
}


// PEGAR TODOS OS POSTS EXISTENTES
async function getPostsAPI(token){
    let options = {
        "method": "GET",
        "headers": {
            "Content-Type": "application/json",
            "authorization": `bearer ${token}`,
        },
    }

    const responseJSON = await fetch(baseURL+"/posts", options)
    const response = await responseJSON.json()

    return response
}


// PEGAR DADOS DO USUÁRIO ATUAL
async function getUserDataAPI(token){
    let options = {
        "method": "GET",
        "headers": {
            "Content-Type": "application/json",
            "authorization": `bearer ${token}`,
        },
    }

    const responseJSON = await fetch(baseURL+"/users/profile", options)
    const response = await responseJSON.json()

    return response
}


// DELETAR POST
async function deletePostAPI(token, postId){
    let options = {
        "method": "DELETE",
        "headers": {
            "Content-Type": "application/json",
            "authorization": `bearer ${token}`,
        },
    }

    const responseJSON = await fetch(baseURL+"/posts/"+postId, options)
    const response = await responseJSON.json()

    return response
}


// EDITAR POST
async function editPostAPI(body, token, postId) {
    let options = {
        "method": "PATCH",
        "headers": {
            "Content-Type": "application/json",
            "authorization": `bearer ${token}`,
        },
        "body": JSON.stringify(body)
    }
    let responseJSON = await fetch(baseURL+"/posts/"+postId, options)
    let response = await responseJSON.json()

    return response
}


// CRIAR POST
async function createPostAPI(body, token) {
    let options = {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "authorization": `bearer ${token}`,
        },
        "body": JSON.stringify(body)
    }

    let responseJSON = await fetch(baseURL+"/posts/create", options)
    let response = await responseJSON.json()

    return response
}

export {loginAPI, registerAPI, getPostsAPI, getUserDataAPI, deletePostAPI, editPostAPI, createPostAPI}