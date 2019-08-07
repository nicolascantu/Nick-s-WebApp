function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}




var getAllRecords = function() {
  $.getJSON('https://api.airtable.com/v0/appkpk7FRYBXhGh6V/Table%201?api_key=key0TC7xEj6GEJkxA',
    function(airtable){
      var html = [];
      $.each(airtable.records, function(index, record) {
        var id = record.id;
        var picture = record.fields['Picture'];
        var name = record.fields['Name'];
        var description = record.fields['Description'];
        var price = record.fields['Price'];
        html.push(listView(id, name, picture, description, price));
      });
      $('.list-view').append(html);
    }
  );
}
var getOneRecord = function(id) {
  $.getJSON(`https://api.airtable.com/v0/appkpk7FRYBXhGh6V/Table%201/${id}?api_key=key0TC7xEj6GEJkxA`,
    function(record){
      var html = [];
      var picture = record.fields['Picture'];
      var name = record.fields['Name'];
      var price = record.fields['Price'];
      var ram = record.fields['RAM'];
      var power = record.fields['Power'];
      var graphics = record.fields['Graphics']; 
      var cpu = record.fields['CPU'];
      var drive = record.fields['Drive'];
      var pc = record.fields['Case'];
      var motherboard = record.fields['Motherboard'];
      var windows = record.fields['Windows'];
      var fan = record.fields['Fan'];
      var cooler = record.fields['Cooler'];
      var ssd = record.fields['SSD'];
      var fanlinks = record.fields['FanLinks'];
      var ssdlinks = record.fields['SSDLinks'];
      var windowslinks = record.fields['WindowsLinks'];
      var motherboardlinks = record.fields['MotherboardLinks'];
      var caselinks = record.fields['CaseLinks'];
      var drivelinks = record.fields['DriveLinks'];
      var cpulinks = record.fields['CPULinks'];
      var graphicslinks = record.fields['GraphicsLinks'];
      var powerlinks = record.fields['PowerLinks'];
      var coolerlinks = record.fields['CoolerLinks'];
      var ramlinks = record.fields['RAMLinks'];
      html.push(detailView(picture, name, price, ram,  power, graphics, cpu, drive, pc, motherboard, windows, fan, cooler, ssd, fanlinks, ssdlinks, windowslinks, motherboardlinks, caselinks, drivelinks, cpulinks, graphicslinks, powerlinks, coolerlinks, ramlinks));
      $('.detail-view').append(html);
    }
  );
}


var listView = function(id, name, picture, description, price) {
  return `
<div class="card" style="width: 18rem;">
  <div class="card-body">
     <h2 class="card-title"><a href="index.html?id=${id}" style="background-color: white;" >${name}</a> </h2>
    <p class="card-text">${description}</p>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">$${price}</li>
  </ul>
    ${picture ? `<img src="${picture[0].url}">` : ``}
</div>
`;
}

var detailView = function(picture, name, price, ram, power, graphics, cpu, drive, pc, motherboard, windows, fan, cooler, ssd, fanlinks, ssdlinks, windowslinks, motherboardlinks, caselinks, drivelinks, cpulinks, graphicslinks, powerlinks, coolerlinks, ramlinks) {
  return `
  <div class="Image">
  ${picture ? `<img src="${picture[0].url}">` : ``}
  </div>
  <h2>${name}</h2>
  <h3>$${price}</h3>
<ul class="list-group">
  <li class="list-group-item"> <strong> System Memory: </strong> &nbsp &nbsp ${ram} &nbsp &nbsp <a href="${ramlinks}" target="_blank">Link to purchase</a> </li> 
  <li class="list-group-item"> <strong> Power Supply: </strong> &nbsp &nbsp ${power} &nbsp &nbsp <a href="${powerlinks}" target="_blank">Link to purchase</a> </li>
  <li class="list-group-item"> <strong> Graphics Card: </strong> &nbsp &nbsp ${graphics} &nbsp &nbsp <a href="${graphicslinks}" target="_blank">Link to purchase</a> </li>
  <li class="list-group-item"> <strong> Central Processing Unit: </strong> &nbsp &nbsp ${cpu} &nbsp &nbsp <a href="${cpulinks}" target="_blank">Link to purchase</a> </li>
  <li class="list-group-item"> <strong> Hardrive/Storage: </strong> &nbsp &nbsp ${drive} &nbsp &nbsp <a href="${drivelinks}" target="_blank">Link to purchase</a> </li>
  <li class="list-group-item"> <strong> PC Case: </strong> &nbsp &nbsp ${pc} &nbsp &nbsp <a href="${caselinks}" target="_blank">Link to purchase</a> </li>
  <li class="list-group-item"> <strong> Motherboard: </strong> &nbsp &nbsp ${motherboard} &nbsp &nbsp <a href="${motherboardlinks}" target="_blank">Link to purchase</a> </li>
  <li class="list-group-item"> <strong> Windows 10 Operating System: </strong> &nbsp &nbsp ${windows} &nbsp &nbsp <a href="${windowslinks}" target="_blank">Link to purchase</a> </li>
  <li class="list-group-item"> <strong> Fans: </strong> &nbsp &nbsp ${fan} &nbsp &nbsp <a href="${fanlinks}" target="_blank">Link to purchase</a> </li> 
  <li class="list-group-item"> <strong> Cooling System: </strong> &nbsp &nbsp ${cooler} &nbsp &nbsp <a href="${coolerlinks}" target="_blank">Link to purchase</a> </li>
  <li class="list-group-item"> <strong> Solid State Drive: </strong> &nbsp &nbsp ${ssd} &nbsp &nbsp <a href="${ssdlinks}" target="_blank">Link to purchase</a></li>
</ul>
`;
}



var id = getParameterByName('id');
if (id) {
  getOneRecord(id);
} else {
  getAllRecords();
}


