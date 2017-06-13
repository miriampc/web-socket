var socket = io.connect('http://localhost:8080',{'forceNew': true});

socket.on('messages',function (data) {
    console.log(data);
    render(data);
});

function render(data) {
    var html = data.map(function (elem) {
        return(`<div>
                    <strong>${elem.author}</strong>
                    <em>${elem.text}</em>
                </div>`);
    }).join(" ");

    document.getElementById('msj').innerHTML=html;
}

function addMessage(e) {
    //e.preventDefault();
    var payload = {
        author:document.getElementById('username').value,
        text:document.getElementById('text').value
    };
    socket.emit('newMessage',payload);
    return false;
}
document.getElementById("form").addEventListener('submit',addMessage);