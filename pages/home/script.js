import { getPostsAPI, getUserDataAPI, deletePostAPI, editPostAPI, createPostAPI } from "../../scripts/api.js";
import { modal } from "../../scripts/modal.js";
import { toast } from "../../scripts/toasty.js";

// REDIRECIONA CASO NÃO ESTEJA LOGADO
function redirectIfNotLoged(){
    let token = localStorage.getItem("token")

    if (!token){
        window.location.replace("../../index.html")
    }
    
}
redirectIfNotLoged()


// RENDERIZAR POSTS
async function renderPosts() {
    let cardContainer = document.querySelector('.card-container')
    cardContainer.innerHTML = ""

    let userToken = JSON.parse(localStorage.getItem('token'))

    let APIPostsResponse = await getPostsAPI(userToken)
    let APIUserResponse = await getUserDataAPI(userToken)

    let userAvatar = document.querySelector('#userAvatar')
    userAvatar.src = APIUserResponse.avatar

    APIPostsResponse.forEach(({content, createdAt, title, user, id}) => {
        const date = new Date(createdAt)
        const formatedDate = Intl.DateTimeFormat('pt-BR', {
            dateStyle: 'long', 
        })

        if(APIUserResponse.id === user.id){
            cardContainer.insertAdjacentHTML('beforeend', `
            <div class="card flex-col gap-3">
                <div class="card-top flex spc-btwn">
                    <div class="flex gap-6 align-center">
                        <img src="${user.avatar}" alt="">
                        <p class="font-14-600">${user.username}</p>
                        <p class="font-14-500 color-grey-4">|   ${formatedDate.format(date)}</p>
                    </div>
                    <div class="flex gap-6">
                        <button class="btn-outline edit-btn" id="edt-${id}">Editar</button>
                        <button class="btn-grey-1 delete-btn" id="del-${id}">Excluir</button>
                    </div>
                </div>
                <div class="card-info flex-col gap-3">
                    <p class="font-24-600">${title}</p>
                    <p class="font-16-400 postText">${content}</p>
                    <p class="btn-link btn-post-view" id="${id}">Acessar publicação</p>
                </div>
            </div>
            `)
            
        } else {
            cardContainer.insertAdjacentHTML('beforeend', `
            <div class="card flex-col gap-3">
                <div class="card-top flex spc-btwn">
                    <div class="flex gap-6 align-center">
                        <img src="${user.avatar}" alt="">
                        <p class="font-14-600">${user.username}</p>
                        <p class="font-14-500 color-grey-4">|   ${formatedDate.format(date)}</p>
                    </div>
                </div>
                <div class="card-info flex-col gap-3">
                    <p class="font-24-600">${title}</p>
                    <p class="font-16-400 postText">${content}</p>
                    <p class="btn-link btn-post-view" id="${id}">Acessar publicação</p>
                </div>
            </div>
            `)

        }


    });
    modalPostView(APIPostsResponse)
    deletePost(APIPostsResponse, userToken)
    editPost(APIPostsResponse, userToken)

}
renderPosts()


// MODAL DE VISUALIZAR POST
function modalPostView(postList){
    let postViewBtns = document.querySelectorAll('.btn-post-view')
    
    postViewBtns.forEach(post => {
        post.addEventListener('click', e => {
            let selectedPostID = e.target.id

            let selectedPost = postList.find(post => post.id === selectedPostID)

            const date = new Date(selectedPost.createdAt)
            const formatedDate = Intl.DateTimeFormat('pt-BR', {
                dateStyle: 'long', 
            })

            let modalBody = `
                <div class="card-top flex spc-btwn">
                    <div class="flex gap-6 align-center">
                        <img src="${selectedPost.user.avatar}" alt="">
                        <p class="font-14-600">${selectedPost.user.username}</p>
                        <p class="font-14-500 color-grey-4">|   ${formatedDate.format(date)}</p>
                    </div>
                    <div class="flex gap-6">
                        <button class="btn-grey-1 close-modal">X</button>
                    </div>
                </div>
                <div class="card-info flex-col gap-3">
                    <p class="font-24-600">${selectedPost.title}</p>
                    <p class="font-16-400">${selectedPost.content}</p>
                </div>
            `
            modal(modalBody)
            
            let modalTag = document.querySelector('dialog')
            modalTag.showModal()
            modalTag.classList.toggle("display-none")
            
            document.querySelector('.close-modal').addEventListener('click', () => {
                modalTag.close()
                modalTag.innerHTML = ""
                modalTag.classList.toggle("display-none")
                
            })

        })
    })
}


// EXCLUIR PUBLICAÇÃO
async function deletePost(postList, token) {
    let deleteBtns = document.querySelectorAll(".delete-btn")
    
    deleteBtns.forEach(btn => {
        btn.addEventListener('click', async e => {
            let btnClickedId = e.target.id.slice(4)

            let selectedPost = postList.find(post => post.id === btnClickedId)
            let selectedPostID = selectedPost.id

            let APIresponse = await deletePostAPI(token, selectedPostID)
            toast('Deletado!', APIresponse.message)
            renderPosts()


        })
    })
}


// EDITAR PUBLICAÇÃO
async function editPost(postList, token){
    let editBtns = document.querySelectorAll(".edit-btn")
    
    editBtns.forEach(btn => {
        btn.addEventListener('click', async e => {
            let btnClickedId = e.target.id.slice(4)
            
            let selectedPost = postList.find(post => post.id === btnClickedId)

            let modalBody = `
                <div class="card-top flex spc-btwn">
                    <div class="flex gap-6 align-center">
                        <h3 class="font-20-500">Edição</h3>
                    </div>
                    <div class="flex gap-6">
                        <button class="btn-grey-1 close-modal">X</button>
                    </div>
                </div>
                <div class="card-info flex-col gap-3">
                    <p class="font-24-500">Título do Post</p>
                    <input type="text" class="input-default" id="titleInput" value="${selectedPost.title}"></input>
                    <p class="font-24-500">Conteúdo do post</p>
                    <textarea class="textarea-default" rows="10" cols="70" id="textInput">${selectedPost.content}</textarea>
                </div>
                <div class="flex gap-5">
                <button class="btn-grey-1 close-modal">Cancelar</button>
                <button class="btn-primary-1" id="sendEdit">Salvar Alterações</button>
                </div>
            `
            modal(modalBody)
            let modalTag = document.querySelector('dialog')
            modalTag.showModal()
            modalTag.classList.toggle("display-none")
            
            document.querySelectorAll('.close-modal').forEach(btn => {
                btn.addEventListener('click', () => {
                    modalTag.close()
                    modalTag.innerHTML = ""
                    modalTag.classList.toggle("display-none")
                    
                })

            })

            let sendEditBtn = document.querySelector('#sendEdit')
            sendEditBtn.addEventListener('click', async e => {
                let newTitle = document.querySelector('#titleInput').value
                let newText = document.querySelector('#textInput').value

                let newBody = {
                    title: newTitle,
                    content: newText,
                }

                let APIresponse = await editPostAPI(newBody, token, btnClickedId)

                if(APIresponse){
                    toast('Sucesso!', "Mensagem editada conforme requisitado.")

                    modalTag.close()
                    modalTag.innerHTML = ""
                    modalTag.classList.toggle("display-none")
                }

                renderPosts()
            })
        })
    })
}


// CRIAR PUBLICAÇÃO
async function createPost(token){
    let createPostBtn = document.querySelector('#createPostBtn')

    createPostBtn.addEventListener('click', async e => {
        let modalBody = `
                <div class="card-top flex spc-btwn">
                    <div class="flex gap-6 align-center">
                        <h3 class="font-20-500">Edição</h3>
                    </div>
                    <div class="flex gap-6">
                        <button class="btn-grey-1 close-modal">X</button>
                    </div>
                </div>
                <div class="card-info flex-col gap-3">
                    <p class="font-24-500">Título do Post</p>
                    <input type="text" class="input-default" id="titleInput" value=""></input>
                    <p class="font-24-500">Conteúdo do post</p>
                    <textarea class="textarea-default" rows="10" cols="70" id="textInput"></textarea>
                </div>
                <div class="flex gap-5">
                <button class="btn-grey-1 close-modal">Cancelar</button>
                <button class="btn-primary-1" id="sendPost">Salvar Publicação</button>
                </div>
            `

        modal(modalBody)
        let modalTag = document.querySelector('dialog')
        modalTag.showModal()
        modalTag.classList.toggle("display-none")
        
        document.querySelectorAll('.close-modal').forEach(btn => {
            btn.addEventListener('click', () => {
                modalTag.close()
                modalTag.innerHTML = ""
                modalTag.classList.toggle("display-none")
                
            })

        })

        let sendPostBtn = document.querySelector('#sendPost')
        sendPostBtn.addEventListener('click', async e => {
            let newPostBody = {
                title: document.querySelector('#titleInput').value,
                content: document.querySelector('#textInput').value
            }
    
            let APIresponse = await createPostAPI(newPostBody, token)
    
            if(APIresponse){
                toast('Sucesso!', "Postagem publicada conforme requisitado.")

                modalTag.close()
                modalTag.innerHTML = ""
                modalTag.classList.toggle("display-none")
            }

            renderPosts()

        })
    }, {})
}
await createPost(JSON.parse(localStorage.getItem('token')))

//MOSTRA CAIXA DE LOGOUT
function showLogoutBox() {
    let userImg = document.querySelector('#userAvatar')
    let logoutBox = document.querySelector('#logoutBox')

    userImg.addEventListener('mouseenter', () => {
        logoutBox.classList.toggle('hide')
    })

    logoutBox.addEventListener('mouseleave', () => {
        logoutBox.classList.toggle('hide')
    })
}
showLogoutBox()


// LOGOUT
function logout() {
    let logoutBtn = document.querySelector('#logoutBtn')

    logoutBtn.addEventListener('click', () => {
        localStorage.setItem('token', "")
        window.location.replace('../../index.html')
    })
}
logout()
