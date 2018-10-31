
export default function getMenus(){
    return fetch("/menu/get",{}).then(response => response.json());
}   