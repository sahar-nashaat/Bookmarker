var siteName = document.getElementById('siteName');
var siteUrl = document.getElementById('siteUrl');
var tableBody = document.getElementById('tableBody');


var websiteContainer;
if (localStorage.getItem('websites')){
    websiteContainer =  JSON.parse(localStorage.getItem('websites'));
    displayWebsites(websiteContainer);

}else{
    websiteContainer = [];
}

function addWebsite(){
var website = {
    siteName : siteName.value,
    siteUrl : siteUrl.value,
}
if (validateUrl(website)){
    websiteContainer.push(website);
localStorage.setItem('websites', JSON.stringify(websiteContainer));
console.log(localStorage.getItem('websites'));
clearForm();
displayWebsites();
}else{
    alert('please enter a valid url adding http:// or https://');
}
}

function clearForm(){
    siteName.value = '';
    siteUrl.value = '';
}

function displayWebsites (websitesContainer){
    var cartoona = '';
for (var i = 0; i < websiteContainer.length; i++){
    cartoona+= `
    <tr>
        <td>${i+1}</td>
        <td>${websiteContainer[i].siteName}</td>
        <td><button class="btn btn-outline-success"><a target="_blank" href="${websiteContainer[i].siteUrl}">${websiteContainer[i].siteName}</a></button></td>
        <td><button onclick="deleteWebsite(${i})" class="btn btn-outline-warning"><i class="fa-solid fa-trash-can"></i></button></td>
    
    </tr>
    ` 
}
tableBody.innerHTML = cartoona;
}

function deleteWebsite(deleteIndex){
    websiteContainer.splice(deleteIndex,1);
    localStorage.setItem('websites', JSON.stringify(websiteContainer));

    displayWebsites (websiteContainer);
}
function validateUrl(website){
if(/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(website.siteUrl))
return true;
else
return false;
}