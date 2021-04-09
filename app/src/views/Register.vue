<template>
  <div class="container mt-4">
    <div class="row">
      <h2 class="my-5" v-show="step === 0">Registration Form</h2>
      <h2 class="my-5" v-show="step === 1">Confirm Registration</h2>
      <div class="col-sm-5 mx-auto">
        <form @submit.prevent="submitHandler" novalidate>

          <transition name="slide-fade">
            <div class="step" v-show="step === 0">

              <h3 class="text-center">Required</h3>

              <div class="form-group mb-2">
                <label for="fullName">Full Name</label>
                <input
                  class="form-control"
                  :class="{'is-invalid': v$.form.fullName.$error}"
                  type="text"
                  name="fullName"
                  id="fullName"
                  v-model="form.fullName"
                  autocomplete="off"
                  @blur="v$.form.fullName.$touch"
                />
                <div
                  v-if="v$.form.fullName.$invalid"
                  class="invalid-feedback"
                >
                  {{v$.form.fullName.$silentErrors[0].$message}}
                </div>
              </div>

              <div class="form-group mb-2">
                <label for="nickname">Nickname</label>
                <input
                  class="form-control"
                  :class="{'is-invalid': v$.form.nickname.$error}"
                  type="text"
                  name="nickname"
                  id="nickname"
                  v-model="form.nickname"
                  autocomplete="off"
                  @blur="v$.form.nickname.$touch"
                />
                <div
                  v-if="v$.form.nickname.$invalid"
                  class="invalid-feedback"
                >
                  {{v$.form.nickname.$silentErrors[0].$message}}
                </div>
              </div>

              <div class="form-group mb-2">
                <label for="password">Password</label>
                <input
                  class="form-control"
                  :class="{'is-invalid': v$.form.password.$error}"
                  type="password"
                  name="password"
                  id="password"
                  v-model="form.password"
                  @blur="v$.form.password.$touch"
                />
                <div
                  v-if="v$.form.password.$invalid"
                  class="invalid-feedback"
                >
                  {{v$.form.password.$silentErrors[0].$message}}
                </div>
              </div>

              <div class="form-group mb-2">
                <label for="repeatPassword">Repeat Password</label>
                <input
                  class="form-control"
                  :class="{'is-invalid': v$.form.repeatPassword.$error}"
                  type="password"
                  name="repeatPassword"
                  id="repeatPassword"
                  v-model="form.repeatPassword"
                  @blur="v$.form.repeatPassword.$touch"
                />
                <div
                  v-if="v$.form.repeatPassword.$invalid"
                  class="invalid-feedback"
                >
                  {{v$.form.repeatPassword.$silentErrors[0].$message}}
                </div>
              </div>

              <div class="form-group mb-2">
                <label for="phone">Phone</label>
                <div class="input-group">
                  <span class="input-group-text" id="basic-addon1">+998</span>
                  <input
                    class="form-control"
                    :class="{'is-invalid': v$.form.phone.$error}"
                    type="tel"
                    v-model="form.phone"
                    name="phone"
                    id="phone"
                    autocomplete="off"
                    @blur="v$.form.phone.$touch"
                  />
                  <div
                    v-if="v$.form.phone.$invalid"
                    class="invalid-feedback"
                  >
                    {{v$.form.phone.$silentErrors[0].$message}}
                  </div>
                </div>
              </div>

              <hr />

              <h3 class="text-center">Optional</h3>

              <div class="form-group mb-2">
                <label for="gender">Gender:</label>
                <select
                  class="form-select"
                  id="gender"
                  name="gender"
                  v-model="form.gender"
                  aria-label="Default select example"
                >
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="RATHER-NOT-SAY">Rather not say</option>
                </select>
              </div>

              <div class="form-group mb-2">
                <label for="country">Country</label>
                <input
                  class="form-control"
                  type="country"
                  name="country"
                  id="country"
                  v-model="form.country"
                  autocomplete="none"
                />
              </div>

              <div class="form-group mb-2">
                <label for="city">City</label>
                <input
                  class="form-control"
                  type="city"
                  name="city"
                  id="city"
                  v-model="form.city"
                  autocomplete="none"
                />
              </div>

              <button
                @click="nextStep"
                type="button"
                class="btn btn-primary mb-4"
                :disabled="nextStepDisabled"
              >
                Next step
              </button>
            </div>
          </transition>

          <transition name="slide-fade">
            <div class="step" v-show="step === 1">
              <div class="confirm-code"></div>
              <div class="form-group mb-2">
                <label for="code">Code</label>
                <input
                  class="form-control"
                  type="text"
                  name="code"
                  id="code"
                  v-model="form.confirmCode"
                  autocomplete="none"
                />
              </div>
              <button
                @click="previousStep"
                type="button"
                class="btn btn-light me-2"
              >
                Back
              </button>
              <button
                @click="confirmRegistration"
                type="submit"
                class="btn btn-primary"
              >
                Confirm
              </button>
            </div>
          </transition>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core';
import {
  required,
  helpers,
  minLength,
  sameAs,
} from '@vuelidate/validators';

export default {
  name: 'register',
  components: {},
  computed: {
    nextStepDisabled() {
      return this.v$.form.fullName.$invalid
              || this.v$.form.nickname.$invalid
              || this.v$.form.password.$invalid
              || this.v$.form.repeatPassword.$invalid
              || this.v$.form.phone.$invalid;
    },
  },
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  data() {
    return {
      step: 0,
      form: {
        fullName: '',
        nickname: '',
        password: '',
        repeatPassword: '',
        phone: '',
        gender: '',
        country: '',
        city: '',
        confirmCode: '',
      },
    };
  },
  validations() {
    return {
      form: {
        fullName: {
          required: helpers.withMessage('This field cannot be empty', required),
        },
        nickname: {
          required: helpers.withMessage('This field cannot be empty', required),
          minLength: minLength(5),
          nicknameValidation: helpers.withMessage('Only Latin letters and ("-", "_", ".") are allowed', (nickname) => {
            const regex = /^[0-9a-zA-Z]+[-._]*[0-9a-zA-Z]+$/;
            return (
              regex.test(nickname)
            );
          }),
        },
        password: {
          required: helpers.withMessage('This field cannot be empty', required),
          minLength: minLength(8),
          passwordValidation: helpers.withMessage('Only Latin letters and ("-", "_", ".", "+", "=", "@", "$", "!", "?") are allowed', (password) => {
            const regex = /[0-9a-zA-Z!?$@=+-._]{8,}/;
            return (
              regex.test(password)
            );
          }),
        },
        repeatPassword: {
          required: helpers.withMessage('This field cannot be empty', required),
          sameAs: sameAs(this.form.password),
        },
        phone: {
          required: helpers.withMessage('This field cannot be empty', required),
          phoneValidation: helpers.withMessage('Please provide a correct phone number', (phone) => {
            const regex = /^[0-9]{9,}/;
            return (
              regex.test(phone)
            );
          }),
        },
      },
    };
  },
  methods: {
    submitHandler() {
      console.log('submitted');
      this.$router.push('/');
    },
    nextStep() {
      this.step = 1;
    },
    previousStep() {
      this.step = 0;
    },
  },
};
</script>

<style>
  .slide-fade-enter-active {
    transition: all 0.3s ease-out;
  }

  .slide-fade-leave-active {
    transition: all 0.3s ease-in;
  }

  .slide-fade-enter-from,
  .slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
  }
</style>
