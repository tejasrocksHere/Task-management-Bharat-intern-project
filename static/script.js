$(function () {
  var socket = io();
  var users = [];

  $('form').submit(function(event){
    event.preventDefault();
    const message = $('#m').val();
    socket.emit('chat message', { username, message });
    $('#messages').append($('<li>').html('<span class="sender">' + username + ':</span> ' + message));
    $('#m').val('');
    return false;
  });

  socket.on('chat message', function(data){
    const { username, message } = data;
    $('#messages').append($('<li>').html('<span class="sender">' + username + ':</span> ' + message));
  });

  socket.on('new user', function(newUser) {
    users.push(newUser);
    updateUserSelection();
    $('#notif').append($('<li>').text(newUser + ' joined!'));

    // Append the new user to assigning task section
    var assignTaskSelect = document.getElementById("userSelection");
    var option = document.createElement("option");
    option.value = newUser;
    option.text = newUser;
    assignTaskSelect.appendChild(option);
  });

  socket.on('user gone', function() {
    $('#notif').append($('<li>').text('1 user left!'));
  });

  function updateUserSelection() {
    var select = document.getElementById("userSelection");
    select.innerHTML = ""; // Clear existing options
    for (var i = 0; i < users.length; i++) {
      var option = document.createElement("option");
      option.value = users[i];
      option.text = users[i];
      select.appendChild(option);
    }
  }
});
