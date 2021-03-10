export class User {
    id?: string;
    login?: string;
    email?: string;
    password?: string;
    role: string;
    constructor(user?: User) {
        this.id = user?.id || (new Date().getMilliseconds()).toString();
        this.login = user?.login || 'User';
        this.email = user?.email || 'user@';
        this.role = user?.role || 'user';
    }
}
