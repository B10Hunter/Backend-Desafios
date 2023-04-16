export default class UserDTO {
    static getTokenDTO = (user) =>{
        return {
            name:`${user.first_name} ${user.last_name}`,
            role:user.role,
            id:user._id,
            avatar:user.avatar
        }
    }
}