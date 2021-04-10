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
                  <span class="input-group-text" id="basic-addon1">+</span>
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
              <h3 class="text-center">CONFIRM CODE IS: <span>654321</span></h3>
              <div class="form-group mb-2">
                <label for="confrimCode">Code:</label>
                <input
                  class="form-control"
                  :class="{'is-invalid': v$.confirmCode.$error}"
                  type="text"
                  name="confrimCode"
                  id="confrimCode"
                  v-model="confirmCode"
                  autocomplete="none"
                  @blur="v$.confirmCode.$touch"
                />
                <div
                  v-if="v$.confirmCode.$invalid"
                  class="invalid-feedback"
                >
                  {{v$.confirmCode.$silentErrors[0].$message}}
                </div>
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
                :disabled="confirmStepDisabled"
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
import axios from 'axios';

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
    confirmStepDisabled() {
      return this.v$.confirmCode.$invalid;
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
      },
      confirmCode: '',
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
            const regex = /^([A-z-_.\d])*$/; // eslint-disable-line
            return (
              regex.test(nickname)
            );
          }),
        },
        password: {
          required: helpers.withMessage('This field cannot be empty', required),
          minLength: minLength(8),
          passwordValidation: helpers.withMessage('Only Latin letters and ("-", "_", ".", "+", "=", "@", "$", "!", "?") are allowed', (password) => {
            const regex = /^([A-z-_.+=@$!?\d])*$/;
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
            const regex = /^(?=998)[0-9]{12}$/;
            return (
              regex.test(phone)
            );
          }),
        },
      },
      confirmCode: {
        required: helpers.withMessage('This field cannot be empty', required),
        minLength: minLength(6),
        codeValidation: helpers.withMessage('Please write a correct confirmation code', (code) => {
          const regex = /654321/;
          return (
            regex.test(code)
          );
        }),
      },
    };
  },
  methods: {
    async nextStep() {
      const options = {
        headers: {
          "Accept": "application/json", // eslint-disable-line
          "Content-Type": "application/json", // eslint-disable-line
          "Access-Control-Allow-Origin": "*", // eslint-disable-line
        },
      };
      await axios.post('http://test.ok.paymo.uz/public/user/register', JSON.stringify(this.form), options)
        .then((response) => {
          localStorage.setItem('registrationId', response.data.registrationId);
          this.step = 1;
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response.data);
          }
        });
    },
    previousStep() {
      this.step = 0;
    },
    async submitHandler() {
      const registrationId = localStorage.getItem('registrationId');
      const data = {
        otp: 654321,
      };
      const options = {
        headers: {
          "Accept": "application/json", // eslint-disable-line
          "Content-Type": "application/json", // eslint-disable-line
          "Access-Control-Allow-Origin": "*", // eslint-disable-line
        },
      };
      await axios.post(`http://test.ok.paymo.uz/public/user/confirm-registration/${registrationId}`, JSON.stringify(data), options)
        .then((response) => {
          console.log(response);
          this.$router.push('/');
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response.data);
          }
        });
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
  .text-center span {
    color: red;
  }
</style>
