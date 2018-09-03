<template>
<v-container white>
	<v-form @keydown.native.enter="login()">
    <v-layout align-center row wrap>
			<v-flex xs12>
			<h2 display-3>Login</h2>
			<br>
			</v-flex>
			<v-flex xs12>
			<v-text-field
				lg12
				v-model="email"
				:rules="emailRules"
				label="E-mail"
				solo
				required
			></v-text-field>
			</v-flex>
			<v-flex xs12>
			<v-text-field
				v-model="password"
				label="password"
				type="password"
				solo
				required
			></v-text-field>
			</v-flex>

			<v-btn @click="login()">Login</v-btn>
		</v-layout>
	</v-form>
</v-container>
</template>

<script>
import gql from 'graphql-tag'

const signupUser = gql`
mutation signupUser($email: String!, $password: String!) {
  signupUser(email: $email, password: $password) {
    id
    token
  }
}
`

const loginUser = gql`
mutation loginUser($email: String!, $password: String!) {
  authenticateUser(email: $email, password: $password) {
    token
  }
}
`

  export default {
		props: {
			onLogin: Function
		},
    data: () => ({
      valid: false,
      email: '',
      emailRules: [
          v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      password: '',
      passwordRules: [
        v => !!v || 'Password is required',
        v => v.length >= 6 || 'Password must be more than 10 characters',
        v => v.test(/[a-z]/) || 'Password must contain at least one lowercase character',
        v => v.test(/[A-Z]/) || 'Password must contain at least one uppercase character',
      ],
		}),

		methods: {
			signup () {
				const email = this.email
				const password = this.password
				this.$apollo.mutate({
					mutation: signupUser,
					variables: {
						email,
						password,
					}
				})
				.then((data)=>{
					console.log(data)
				})
				.catch((e)=>{
					console.error(e)
				})
			},
			login () {
				const email = this.email
				const password = this.password
				this.$apollo.mutate({
					mutation: loginUser,
					variables: {
						email,
						password,
					}
				})
				.then((data)=>{
					console.log(data)
					window.localStorage.setItem('auth', data.data.authenticateUser.token)
					this.onLogin()
				})
				.catch((e)=>{
					console.error(e)
				})
			},
		}
  }
</script>