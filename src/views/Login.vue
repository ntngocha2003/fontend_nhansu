<script setup >
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import {useStore} from 'vuex'

    const email = ref('')
    const password = ref('')
    const emailError = ref('')
    const passwordError = ref('')
    const router=useRouter();
    const storeLogin=useStore();
    const submit = async()=>{
      try {       
        await storeLogin.dispatch('auth/loginAdmin',{email:email.value,password:password.value});
        storeLogin.dispatch('toast/showMessage',{message:'Đăng nhập thành công', type:'success'})
        router.push({name: 'dashboard.index'})
      } catch(error){
        console.log(error);
          if(error.response.data.errors){
            emailError.value=error.response.data.errors.email
            passwordError.value = error.response.data.errors.password
          }
          else{
            emailError.value=''
            passwordError.value = error.response.data.message
          }
        }
    }

</script>

<template>
  <div class="uk-section uk-section-muted uk-flex uk-flex-middle uk-animation-fade" uk-height-viewport>
    <div class="uk-width-1-1">
      <div class="uk-container">
        <div class="uk-grid-margin uk-grid uk-grid-stack" uk-grid>
          <div class="uk-width-1-1@m">
            <div class="uk-margin uk-width-large uk-margin-auto uk-card uk-card-default uk-card-body uk-box-shadow-large">
              <h3 class="uk-card-title uk-text-center">Đăng nhập!</h3>
              <form @submit.prevent="submit">
                <div class="uk-margin">
                  <div class="uk-inline uk-width-1-1">
                    <input class="uk-input input-login" 
                      type="text"
                      v-model="email"
                      value=""
                      autocomplete="off"
                      placeholder="Email">
                    <div v-if="emailError" class="uk-text-danger">{{'*'+ emailError }}</div>
                  </div>
                </div>
                <div class="uk-margin">
                  <div class="uk-inline uk-width-1-1">
                    <input class="uk-input input-login" 
                      type="password" 
                      v-model="password"
                      value=""
                      autocomplete="off"
                      placeholder="Password">
                      <div v-if="passwordError" class="uk-text-danger">{{'*'+ passwordError }}</div>	
                  </div>
                </div>
                <div class="form-row">
                    <div class="uk-flex uk-flex-middle">
                        <input class="input-checkbox"
                          type="checkbox"
                         
                        >
                      <span>Nhớ mật khẩu</span>
                    </div>
                </div>
                <div class="uk-margin">
                  <button type="submit" class="btn-login uk-width-1-1">Đăng nhập</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .input-login{
    font-size: 1rem;
    border-radius: 3px;
  }
</style>