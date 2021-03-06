const socket = io()

const chatForm = document.getElementById('chat-form')
const chatMessages = document.querySelector('.chat-messages')
const username = document.querySelector('#user')

socket.on('message', msg => {
    console.log(msg)
    outputMessage(msg)

    chatMessages.scrollTop = chatMessages.scrollHeight
})

// Message submit
chatForm.addEventListener('submit', e => {
    e.preventDefault()

    // Get message text
    const msg = e.target.elements.msg.value

    socket.emit('chatMessage', msg)

    //Clear input 
    e.target.elements.msg.value = ''
    e.target.elements.msg.focus()
})

// Output message to DOM

function outputMessage(message) {
    const div = document.createElement('div')
    div.classList.add('message')
    div.innerHTML = `
        <p class='meta'>${message.user} <span>${message.time}</span></p>
        <p class='text'>${message.text}</p>
    `

    document.querySelector('.chat-messages').appendChild(div)
}