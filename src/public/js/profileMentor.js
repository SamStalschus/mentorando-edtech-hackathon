const xhttp = new XMLHttpRequest()
function saveDate() {
  const date = document.getElementById('dateTime').value;
  if (date === '') {
    alert('Please enter a date');
    return
  }

  var url = `/availabletime`

  xhttp.open("POST", url, true)

  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8")

  xhttp.onreadystatechange = function () {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      alert("Novo horário criado com sucesso!")

    } else if ((xhttp.readyState == 4)) {
      alert("Erro interno do servidor")
    }
  }
  xhttp.send(JSON.stringify({
    date: date
  })
  )
}