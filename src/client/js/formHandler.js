function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    console.log("::: Form Submitted :::")
    if (Client.validateForm(formText)){
        document.getElementById('results').innerHTML = "loading results...";
        postText('http://localhost:8080/analyze',{text: formText})
    }
    
}



const postText = async (url = '', data = {})=>{
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try{
        const newData = await response.json();
        console.log("got data: "+ newData.autocompletes);
        console.log(newData.autocompletes);
        //document.getElementById('results').innerHTML = newData.autocompletes[0].text;
        document.getElementById('results').innerHTML = updateOutputField(newData.autocompletes);
    }catch(error){
        console.log("error",error);
    }
}

function updateOutputField(data){
    if(data.length == 0){
        //document.getElementById('results').innerHTML = "No results found.";
        return "No results found.";
    } else{
        console.log(data);
        let outputText = "";
        for(let entry of data){
            console.log(entry);
            outputText = outputText.concat(entry.text + '</br>');
        }
        return outputText;
        //document.getElementById('results').innerHTML = outputText;
    }
    
}

export { handleSubmit,
    updateOutputField }
