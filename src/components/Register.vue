<template>
  <!-- <v-layout row justify-center>
  </v-layout> -->
  <v-form ref="form" v-model="valid" lazy-validation>
    <h1>Register</h1>
    <v-text-field
    v-model="name"
    :rules="nameRules"
    label="Name"
    required
    ></v-text-field>
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
    <v-checkbox
    v-model="checkbox"
    :rules="[v => !!v || 'You must agree to continue!']"
    label="Do you agree?"
    required
    ></v-checkbox>

    <v-btn
    :disabled="!valid"
    @click="submit"
    >
    Submit
  </v-btn>
  <v-btn @click="clear">Clear</v-btn>
</v-form>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'register',
  data: () => ({
    valid: true,
    name: '',
    nameRules: [
      v => !!v || 'Name is required',
    ],
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid'
    ],
    password: '',
    passwordRules: [
      v => !!v || 'Password is required',
      v => /.{6,}/.test(v) || 'Password length must be 6 characters or higher',
      v => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(v) || 'Password must have at least 1 number'
    ],
    checkbox: false
  }),

  methods: {
    ...mapActions([
      "registerUser"
    ]),
    submit () {
      if (this.$refs.form.validate()) {
        let inputObj = {name: this.name, email: this.email, password: this.password}
        this.registerUser(inputObj)
      }
    },
    clear () {
      this.$refs.form.reset()
    }
  }
}
</script>
