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
      html.push(detailView(picture, name, price, ram,  power, graphics, cpu, drive, pc, motherboard, windows, fan, cooler, ssd));
      $('.detail-view').append(html);
    }
  );
}


var listView = function(id, name, picture, description, price) {
  return `
<div class="card" style="width: 18rem;">
  <div class="card-body">
     <h2 class="card-title"><a href="index.html?id=${id}">${name}</a> </h2>
    <p class="card-text">${description}</p>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">$${price}</li>
  </ul>
    ${picture ? `<img src="${picture[0].url}">` : ``}
</div>
`;
}

var detailView = function(picture, name, price, ram,  power, graphics, cpu, drive, pc, motherboard, windows, fan, cooler, ssd) {
  return `
  ${picture ? `<img src="${picture[0].url}">` : ``}
  <h2>${name}</h2>
  <h3>${price}</h3>
<ul class="list-group">
  <li class="list-group-item">${ram}</li>
  <li class="list-group-item">${power}</li>
  <li class="list-group-item">${graphics}</li>
  <li class="list-group-item">${cpu}</li>
  <li class="list-group-item">${drive}</li>
  <li class="list-group-item">${pc}</li>
  <li class="list-group-item">${motherboard}</li>
  <li class="list-group-item">${windows}</li>
  <li class="list-group-item">${fan}</li>
  <li class="list-group-item">${cooler}</li>
  <li class="list-group-item">${ssd}</li>
</ul>
`;
}



var id = getParameterByName('id');
if (id) {
  getOneRecord(id);
} else {
  getAllRecords();
}


