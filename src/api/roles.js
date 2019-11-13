import $axios from './index'
export function getAllRoles(){
    const url = '/getRoles'
    return $axios.get(url)
}