 //API fetch sert à nous connecter de l'Api //then c'est une methode liée a fetch raison pour laquelle on met un point avant
       // On utilise une fonction asysnchrone pour recuperer les données recu de l'Api
      
       async function getData(){
        let data = await fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        //console.log(data)
        
       
         data.map(rep =>{ //on utilise la boucle map lorsqu'on veut parcourir un tableau[]
                 const tr = document.createElement('tr')
                 tr.innerHTML = `
                    <td>${rep.id}</td>
                    <td>${rep.userId}</td>
                    <td>${rep.title}</td>
                    <td>${rep.body}</td>
                    <td><a href ="/articles/edit/${rep.id}" onclick ="editer(event)">Editer</a></td>
                    <td><a href ="https://jsonplaceholder.typicode.com/posts/${rep.id}" onclick ="supprimer(event)">Supprimer</a></td>
                    <td><a href ="/articles/details/${rep.id}" onclick ="details(event)">Voir plus</a></td>
                 `
                document.querySelector('#tb-article tbody').prepend(tr)

             })

     }
     
    

     async function creer(event) {
        event.preventDefault();
        const form = document.querySelector("#createForm")
        var donnee = {
            userId:form.userId.value,
            title:form.title.value,
            body:form.body.value 
          
           
        }

        let rep = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(donnee),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          })
        .then((response) => response.json())

        const tr = document.createElement('tr')
            tr.innerHTML = `
                    <td>${rep.userId}</td>
                    <td>${rep.title}</td>
                    <td>${rep.body}</td>
                    <td><a href ="/articles/edit/${rep.id}" onclick ="editer(event)">Editer</a></td>
                    <td><a href ="https://jsonplaceholder.typicode.com/posts/${rep.id}" onclick ="supprimer(event)">Supprimer</a></td>
                    <td><a href ="/articles/details/${rep.id}" onclick ="details(event)">Voir plus</a></td>
                 `

            document.querySelector('#tb-article tbody').prepend(tr)
            form.reset()
 
     }

     async function supprimer(event) {
        event.preventDefault();

        if(confirm("Voulez vous effectuer cette suppression?")){
              const lien = event.target.getAttribute("href")
              const tr = event.target.closest('tr')
              await fetch(lien, {
              method: 'DELETE',
        });
        tr.remove()
        }
      
    }
 