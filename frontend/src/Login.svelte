<script >
import { client } from './stores';

const localStorageItem = window.localStorage.getItem('pocketbase_auth')
let localToken = localStorageItem ? JSON.parse(localStorageItem) : false

if(localToken){
  client.authStore.save(localToken.token, localToken.model)
  console.log(localToken)
}

  async function logout() {
    client.authStore.clear()
    localToken = false
  }

let state ={
  email:"",
  password:""
}

async function register(){
  const user = await client.users.create({
    email: state.email,
    password: state.password,
    passwordConfirm: state.password,
});
  console.log(user)
  if(user){
    sendemail()
  }
}
async function sendemail(){
  await client.users.requestVerification(state.email);
}


async function btnlogin(){
  const authData = await client.users.authViaEmail(state.email, state.password);
  if(authData){
    console.log(authData)
      localToken = authData
  }
}



</script>
<main>

  {#if localToken}
    <h1>login worked, hello {localToken[localToken.model ? "model" : "user" ].email }</h1>  
    <button
      on:click={logout}
      >logout</button>
  {:else}
      <div>
      <h1>Hello</h1>
      email: <input type="text" bind:value={state.email} name="">
      password: <input type="password" bind:value={state.password} name="">
      <button
      on:click={register}
      >Register</button>
        <button
      on:click={btnlogin}
      >login</button>
  </div>
  {/if}
  
</main>

