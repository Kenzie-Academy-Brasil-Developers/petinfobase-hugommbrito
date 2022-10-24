import { registerAPI } from "../../scripts/api.js";
import { toast } from "../../scripts/toasty.js";

// ATIVAR/DESATIVAR BOTÃO DE CADASTRAR
function activateRegisterBtn() {
    let userInput = document.querySelector('#userRegister')
    let emailInput = document.querySelector('#emailRegister')
    let avatarInput = document.querySelector('#avatarRegister')
    let passwordInput = document.querySelector('#passwordRegister')
    let allInputs = document.querySelectorAll('input')

    let cadastrarBtn = document.querySelector('#cadastrarBtn')
    
    allInputs.forEach(input => {
        input.addEventListener('keyup', () => {
            ((emailInput.value.length > 0) && (passwordInput.value.length > 0) && (userInput.value.length > 0) && (avatarInput.value.length > 0))
                 ? cadastrarBtn.removeAttribute("disabled") : cadastrarBtn.setAttribute("disabled", "")
        })
        
    })
}
activateRegisterBtn()


// CADASTRAR NOVO USUÁRIO
function registerNewUser(){
    let allInputs = document.querySelectorAll('input')
    let cadastrarBtn = document.querySelector('#cadastrarBtn')

    cadastrarBtn.addEventListener('click', async (e) => {
        e.preventDefault()
        cadastrarBtn.innerHTML = "<div class='loading-btn'></div>"

        try{
            let objectBody = {
                username: allInputs[0].value,
                email: allInputs[1].value,
                password: allInputs[3].value,
                avatar: allInputs[2].value,
            }
    
            let response = await registerAPI(objectBody)
            console.log(response)

            if(response.id){
                toast('Sucesso!', 'Usuário cadastrado com sucesso.')

                setTimeout(() => {
                    window.location.replace('../../index.html')
                }, 4000)
            } else {
                toast('Erro!', response.message)

                setTimeout(() => {
                    cadastrarBtn.innerHTML = "Cadastrar"
                }, 4000)

            }
        } catch {
            console.log("DEU RUIM")
        }
    })
}
registerNewUser()