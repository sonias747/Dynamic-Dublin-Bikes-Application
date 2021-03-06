window.onload = function() {
    initList();
};

// Function to create stations table
function initList() {
    fetch("/stationsquery").then(response => {
      return response.json();
    }).then(data => {
      console.log("data: ", data);

      result = "<table id='myTable'>";
      data.forEach(station => {

        result += "<tr><td><a>" + station.name + "</a>" +
                "<p class='bikeStands'><img id='parking' src='static/stationsListIcons/parking.png' alt='parking icon'> " + station.available_bike_stands +
                "<img id='bike' src ='static/stationsListIcons/bike.png' alt='bike icon'> " + station.available_bikes +
                "<img id='update' src ='static/stationsListIcons/update.png' alt='update icon'> " + timeConverter(station.last_update) + "</p></td></tr>";
      });

    result += "</table>";
    document.getElementById("list").innerHTML = result;

    }).catch(err => {
      console.log("OOPS!", err);
    })
  }


function timeConverter(UNIX){
  // Function which converts UNIX time code to human readable time
          var a = new Date(UNIX);
          var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
          var year = a.getFullYear();
          var month = months[a.getMonth()];
          var date = a.getDate();
          var hour = a.getHours();
          var min = a.getMinutes();
          var sec = a.getSeconds();
          var time =  (("0" + hour).slice(-2)) + ':' + (("0" + min).slice(-2)) + ':' + (("0" + sec).slice(-2)) ;
          return time;
}


function searchFunction() {
  // Declare variables
  var input, filter, table, tr, a, i, txtValue;
  input = document.getElementById('myInput');
  filter = input.value.toUpperCase();
  table = document.getElementById('myTable');
  tr = table.getElementsByTagName('tr');

  // Loop through all list items, and hide those that don't match the search query
  for (i=0; i < tr.length; i++) {
    a = tr[i].getElementsByTagName("a")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      tr[i].style.display = "";
    } else {
      tr[i].style.display = "none";
    }
  }
}
