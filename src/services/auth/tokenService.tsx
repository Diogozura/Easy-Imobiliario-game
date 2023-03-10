import nookies from 'nookies'

const ONE_SECOND = 1;
const ONE_MINUTE = ONE_SECOND *60
const ONE_HOUR = ONE_MINUTE * 60
const ONE_DAY = ONE_HOUR * 24




export const tokenService = {
    save(keyRoom, idPlayer, bank, ctx = null) {
        
        nookies.set(ctx, 'Player', idPlayer, {
            maxAge: ONE_DAY,
            path:'/',
        }),
        nookies.set(ctx, 'chave', keyRoom, {
            maxAge: ONE_DAY,
            path:'/',
        })
        nookies.set(ctx, 'banco', bank, {
            maxAge: ONE_DAY,
            path:'/',
        })
        
    },
    get(ctx = null) {
        const cookies = nookies.get(ctx)
        return cookies['chave' + 'Player' + 'banco'] 
        // return localStorage.getItem('Player')
    },
    delete(ctx = null) {
        nookies.destroy(ctx, 'Player', {
            path:'/'
        })
        nookies.destroy(ctx, 'chave', {
            path:'/'
        })
        nookies.destroy(ctx, 'banco', {
            path:'/'
        })
    }
}