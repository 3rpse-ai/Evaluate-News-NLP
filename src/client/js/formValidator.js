function validateForm(inputText) {
    if (inputText.length > 10){
        alert("Maximum of 10 Characters")
        return false;
    }else{
        return true;
    }
}

export { validateForm }
