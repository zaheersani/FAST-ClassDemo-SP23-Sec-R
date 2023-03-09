var p = new Promise((resolve, reject) => {
    var b = false
    if(b)
        resolve('I have succesfully resovled the matter')
    else
        reject('I am failed and rejected!')
})

p
    .then(r => console.log(r))
    .catch(e => console.log(e))