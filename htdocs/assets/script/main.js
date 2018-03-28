function addFooter (value) {
    document.getElementById(value)
            .innerHTML += `<section class="secao-footer">
                            <p>${value.toUpperCase()} +</p>
                           </section>`;
}

function insertElementIntoHTML (content) {
    var name = content.name;
    var section = document.getElementById(name);
    var newSection = `<section class="row">`;    
    var template = "";

    content.data.forEach(data => {
        if(data.image.includes("464x261")) {
            template = "destaque-principal";
        } else {
            if(data.image.includes("216x216")) {
                template = "destaque-dois";
            }
            else {
                template = "destaque-tres";
            }
        }

        newSection +=   `<section class="${name} ${template} container">                            
                            <section class="news-image">
                                <img src="/assets/media/${data.image}" alt="${data.image}" />                                
                                <section class="share"></section>
                            </section>                            
                            <section class="news">
                                <h3 class="news-section">${data.label.toUpperCase()}</h3>                                
                                <h4 class="news-title">
                                    <a href="${data.url}" target="_blank" title="${data.title}">
                                        ${data.title}
                                    </a>
                                </h4>                                    
                                <p class="news-description">${data.description}</p>
                            </section>                            
                        </section>`;        
    });
    
    newSection += `</section>`;

    section.innerHTML += newSection;

}

function load () {
    var request = new XMLHttpRequest();
    request.open('GET', 'data.json', true);

    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            var data = JSON.parse(request.responseText);            
            data.section.forEach(insertElementIntoHTML);            
            addFooter("Brasil");
            addFooter("Mundo");
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