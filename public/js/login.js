function storelogintime(){
    const fechaini = {fechaini: new Date()};
    const fechainistr = JSON.stringify(fechaini)
    document.cookie = `fechaini=${fechainistr}; path=/; max-age=3600 `;
}
storelogintime();