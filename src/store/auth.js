import firebase from 'firebase/app'

export default {
  state: {
  	tokenID: null,
  	LoadingToken: false,
  	error: ''
  },
  getters: {
    tokenID: s => s.tokenID,
    error: s => s.error,
    LoadingToken: s => s.LoadingToken,
  },
  mutations: {
    async UPDATE_TOKEN(state, data) {
      state.tokenID = data
    },
    async UPDATE_ERROR(state, data) {
      state.error = data
    },
    async UPDATE_LOADINGTOKEN(state, data) {
      state.LoadingToken = data
    },
  },
  actions: {

    async LOGIN({dispatch, commit}, data) {
    	commit('UPDATE_LOADINGTOKEN', true)
         await firebase.auth().signInWithEmailAndPassword(data.email, data.password)
        .then(function(user) {
        	dispatch('GET_TOKEN')
        })
        .catch(function(error) {
          	commit('UPDATE_ERROR', error.code)
          	commit('UPDATE_LOADINGTOKEN', false)
        });
    },
    async SIGNUP({dispatch, commit}, data) {
    	commit('UPDATE_LOADINGTOKEN', true)
        await firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
        .then(data => {

	    })
	    .catch(err => {
	    	this.error = err.message;
	        commit('UPDATE_ERROR', err.code)
	        commit('UPDATE_LOADINGTOKEN', false)
	    });
	    dispatch('LOGIN', data)
    },
    async LOGOUT({dispatch, commit}) {
    	await firebase.auth().signOut().then(() => {
		  commit('UPDATE_TOKEN', null)
		  localStorage.clear();
		}).catch((error) => {
			commit('UPDATE_LOADINGTOKEN', false)
		});

    },

    async GET_TOKEN({dispatch, commit}) {
    	commit('UPDATE_LOADINGTOKEN', true)
    	await firebase.auth().currentUser.getIdToken().then(token => {
    		commit('UPDATE_TOKEN', token)
    		commit('UPDATE_LOADINGTOKEN', false)
          	localStorage.setItem('__session', token);
        })
        .catch((e) => {
          commit('UPDATE_ERROR', e.code)
          commit('UPDATE_LOADINGTOKEN', false)
        })
    }
  },
  modules: {
  },
  components: {
  	
  }
}








