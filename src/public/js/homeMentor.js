const xhttp = new XMLHttpRequest()

function sendData(mentoringEmail, mentorEmail, startDate, endDate, _id) {
  console.log(mentoringEmail, mentorEmail, startDate, endDate)
  var url = `/scheduleEvent`

  xhttp.open("POST", url, true)

  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8")

  xhttp.onreadystatechange = function () {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      alert("Foi criado com sucesso a mentoria, em breve você receberá o link da meeting por email")

    } else if ((xhttp.readyState == 4)) {
      alert("Erro interno do servidor")
    }
  }
  xhttp.send(JSON.stringify({
    "attendees": {
      "mentoring": mentoringEmail,
      "mentor": mentorEmail
    },
    "date": {
      "startDate": startDate,
      "endDate": endDate
    },
    _id
  })
  )
}
