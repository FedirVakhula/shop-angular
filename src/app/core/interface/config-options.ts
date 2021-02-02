export class User {
    id?: number;
    login?: string;
    email?: string;
    constructor(user?: User) {
        this.id = user?.id || new Date().getMilliseconds();
        this.login = user?.login || 'User';
        this.email = user?.email || 'user@';
    }
}
// название папки interface, а тут класс
// если я хочу поменять у пользователя email, похоже, что я не смогу это сделать
// я хотел бы передать объект {id:..., email:...} но в этом случае, похоже, логин измениться на дефолтный
