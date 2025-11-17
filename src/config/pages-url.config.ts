import type { TypeId } from '@/types/root.types'

class DASHBOARD {
	HOME = '/'
	AUTH = '/auth'
	SIGNUP = this.AUTH + '?action=signup'
	LOGIN = this.AUTH + '?action=login'
	LOGOUT = '/logout'
	TREE = '/tree'
	TOKEN_JOIN = '/token-join'
	tokenJoinWithId = (id: TypeId) => `${this.TOKEN_JOIN}?id=${id}`
}

export const DASHBOARD_PAGES = new DASHBOARD()
