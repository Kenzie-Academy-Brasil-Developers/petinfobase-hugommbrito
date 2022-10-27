function toast(title, messagem){
    const body = document.querySelector('body')
    
    const container = document.createElement('div')
    container.classList.add('toast-container')
    
    const icon = document.createElement('img')
    icon.alt = `Iconde da mensagem de ${title}`
    
    if(title === 'Sucesso!'){
        container.classList.add('successToast')
        icon.src = '../../assets/img/toastyImgs/check.png'
    } else if (title === 'Deletado!'){
        container.classList.add('deleteToast')
        icon.src = '../../assets/img/toastyImgs/signDelete.png'

    } else if (title === 'Erro!'){
        container.classList.add('erroToast')
        icon.src = '../../assets/img/toastyImgs/signError.png'

    } else if (title === 'Adicionado!'){
        container.classList.add('addToast')
        icon.src = '../../assets/img/toastyImgs/signAdd.png'

    }

    const textContainer = document.createElement('div')

    const h3 = document.createElement('h3')
    h3.innerText = title

    const span = document.createElement('span')
    span.innerText = messagem

    textContainer.append(h3, span)

    container.append(icon, textContainer)
    body.appendChild(container)
}

export {toast}