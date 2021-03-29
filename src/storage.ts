export class Storage{

    protected createCookie(name:string, value:string, days:number) {
        var expires
        
        if (days) {
            var date = new Date()
            date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
            expires = '; expires=' + date.toUTCString()
        } else {
            expires = ''
        }
        document.cookie = name + '=' + value + expires + '; path=/'
    }
    protected getCookie(name : string) {
        var nameEQ = name + '='
        var ca = document.cookie.split(';')
        
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i]
            while (c.charAt(0) === ' ') {
            c = c.substring(1, c.length)
            }
            if (c.indexOf(nameEQ) === 0) {
            return c.substring(nameEQ.length, c.length)
            }
        }
        return null
    }
    public save(data:string) : boolean{
        var cookieName = 'sudoku';
        this.createCookie(cookieName,data,30);
        return true;
    }
    public load(): string{
        var cookieName = 'sudoku';
        return this.getCookie('sudoku');
    }
}