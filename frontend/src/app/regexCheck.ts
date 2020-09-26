export function checkPassword(password: String): boolean
{
    let regex = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,12}$/;
    return regex.test(password+'');
}



export function checkEmail(email: String): boolean
{
    let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email+'');
}

export function checkTelephone(telephone: String): boolean
{
    let regex = /^[0-9]{6}$/;
    return regex.test(telephone+'');
}

export function returnSmallerDescription(description: String): String
{
    //let regex = /^(.{80}[^\s]*).*$/;
    return description.replace(/^(.{80}[^\s]*).*/, "$1");
}