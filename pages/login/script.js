import { loginAPI } from "../../scripts/api.js"

// ATIVAR/DESATIVAR BOTÃO DE ACESSAR
function activateLoginBtn() {
    let emailInput = document.querySelector('#emailInput')
    let passwordInput = document.querySelector('#passwordInput')
    let loginBtn = document.querySelector('#loginBtn')

    emailInput.addEventListener('keyup', () => {
        ((emailInput.value.length > 0) && (passwordInput.value.length > 0)) ? loginBtn.removeAttribute("disabled") : loginBtn.setAttribute("disabled", "")
    })
    passwordInput.addEventListener('keyup', () => {
        ((emailInput.value.length > 0) && (passwordInput.value.length > 0)) ? loginBtn.removeAttribute("disabled") : loginBtn.setAttribute("disabled", "")
    })
}
activateLoginBtn()

// FAZER BUSCA DO USUÁRIO NA API (ativa botão loading)
function login() {
    let loginBtn = document.querySelector("#loginBtn")

    loginBtn.addEventListener("click", async (e) => {
        e.preventDefault()

        loginBtn.innerHTML = "<div class='loading-btn' ></div>"

        let emailValue = document.querySelector("#emailInput").value
        let passwordValue = document.querySelector("#passwordInput").value

        let objectBody = {
            email: emailValue,
            password: passwordValue,
        }

        try{
            let response = await loginAPI(objectBody)
            
            if(response.token){
                let tokenJson = JSON.stringify(response.token)
                localStorage.setItem("token", tokenJson)

                window.location.replace("pages/home/index.html")
            } else {
                let form = document.querySelector("form")
                form.insertAdjacentHTML("beforeend", `
                <p class="color-alert-1 font-14-400" >email e/ou senha estão incorretos</p>
                `)
                loginBtn.innerHTML = "Acessar"
                
            }
        } catch (err) {
            let form = document.querySelector("form")
            form.insertAdjacentHTML("beforeend", `
            <p class="color-alert-1 font-14-400" >ALGO DEU ERRADO, TENTE NOVAMENTE MAIS TARDE</p>
            `)
            loginBtn.innerHTML = "Acessar"
        }
    })
}
login()
