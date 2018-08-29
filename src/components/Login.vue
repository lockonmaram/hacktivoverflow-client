<template>
  <!-- <v-layout row justify-center>
  </v-layout> -->
  <v-flex xs12 md4>
    <v-form ref="form" v-model="valid" lazy-validation>
      <h1>Login</h1>
      <v-text-field
      v-model="email"
      :rules="emailRules"
      label="E-mail"
      required
      ></v-text-field>
      <v-text-field
      v-model="password"
      :append-icon="show ? 'visibility_off' : 'visibility'"
      :type="show ? 'text' : 'password'"
      name="input-10-1"
      counter
      @click:append="show = !show"
      :rules="passwordRules"
      label="Password"
      required
      ></v-text-field>
      <v-btn
      :disabled="!valid"
      @click.prevent="validate"
      >
      Login
    </v-btn>
    <br><br>
    <h1>OR</h1>
    <v-btn color="info" @click.prevent="fbLogin">FB LOGIN</v-btn>
    <!-- <input type="image" src="https://storage.googleapis.com/overflow.lockonmaram.com/fbbutton.png" class="responsive" @click="fbLogin"/> -->
  </v-form>
  </v-flex>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'login',
  data: () => ({
    valid: true,
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid'
    ],
    password: '',
    show: false,
    passwordRules: [
      v => !!v || 'Password is required',
      v => /.{6,}/.test(v) || 'Password length must be 8 characters or higher',
    ]
  }),

  methods: {
    ...mapActions([
      'login',
      'fbLogin'
    ]),
    validate () {
      if (this.$refs.form.validate()) {
        let inputObj = {
          email: this.email,
          password: this.password,
        }
        this.login(inputObj)
      }
    },
    clear () {
      this.$refs.form.reset()
    }
  }
}
</script>
<style>
.responsive {
    width: 40%;
    height: auto;
}
</style>
