function User(){
    let username, password;
    
    function doLogin(us, pass) {
        username = us;
        password = pass
    }

    function getInfo (us, pass) {
        us = username;
        pass = password;
        let havePass = false
        if (pass) havePass = true
        return [us,havePass]
    }
    
    let publicApi = {
        login: doLogin,
        info: getInfo
    }

    return publicApi
}

let fred = User();

fred.login("fred","12Battery34!")
console.log(fred.info())