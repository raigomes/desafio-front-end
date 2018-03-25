function insertElementIntoHTML (content) {
    var section = document.getElementById(content.name);
    var newSection = "<section>";

    content.data.forEach(data => {
        newSection += `<section>
                            <img src="/assets/media/${data.image}" alt="${data.image}" />
                            <h3>${data.label}</h3>
                            <strong>${data.title}</strong>
                            <p>${data.description}</p>
                        </section>`;
    });

    newSection += "</section>";

    section.innerHTML += newSection;
}

function load () {
    var request = new XMLHttpRequest();
    request.open('GET', 'data.json', true);

    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            var data = JSON.parse(request.responseText);            
            data.section.forEach(insertElementIntoHTML);
        } else {
            console.log("ERRO load() status " + request.status);            
        }
    };

    request.onerror = function() {
        console.log("ERRO ao retornar conteúdo JSON");        
    };

    request.send();
}

document.onreadystatechange = function () {
    if (document.readyState == "interactive") {
        load();
    }
}