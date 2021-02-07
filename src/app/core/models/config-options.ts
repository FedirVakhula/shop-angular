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
