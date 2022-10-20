<script >
import { client } from './stores';
import {push} from 'svelte-spa-router'

const localStorageItem = window.localStorage.getItem('pocketbase_auth')
let localToken = localStorageItem ? JSON.parse(localStorageItem) : false
let warning = "success"
let showWarning = false;
let warningcontent = ""
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
  try {
    const user = await client.users.create({
    email: state.email,
    password: state.password,
    passwordConfirm: state.password,
});
  console.log(user)
  if(user){
    sendemail()
  }
  } catch (error) {
    warning = "error"
    showWarning = true;
    warningcontent = "email already used"
  }
}
async function sendemail(){
    const authData = await client.users.requestVerification(state.email);
    if(authData){
      console.log(authData)
      warning = "success"
      showWarning = true;
      warningcontent = "Account created successfully, please verify your email"
    }

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

      <article>
        {#if localToken}
        <div class="success">Wellcome {localToken[localToken.model ? "model" : "user" ].email }</div>  
        <button
          on:click={logout}
          >logout</button>
      {:else}
        <h1>Ibhub login</h1>
      <div class="input">email: <input type="text" bind:value={state.email} name=""></div>
      <div class="input">password: <input type="password" bind:value={state.password} name=""></div>
      <button
      on:click={register}
      >Register</button>
        <button
      on:click={btnlogin}
      >login</button>

      {#if showWarning}
      <div class="{warning}">
          {warningcontent}
      </div>
      {/if}
    {/if}
  </article>
  
</main>


<style>
  button{
    background: var(--button-bg);
color: var(--button-color);
padding: 5px;
font-weight: 700;
font-size: 12px;
border-radius: 8px;
border: 0px;
min-width: 100px;
margin: 0;
cursor: pointer;
margin-bottom:10px;
  }

  article{
    background:var(--card-bg);
    color:var(--button-bg);
    padding:30px;
    max-width:95vw;
    width:500px;
    margin:auto;
    text-align:center;
    box-sizing:border-box;
    margin-top:20px;


  }

  .input{
    display:flex;
    flex-direction: column;
    font-size:12px;
    text-align:left;
    gap:4px;
    margin-bottom:13px;
    font-weight: bold;
  }

  div{
    padding: 5px;
    font-weight: 700;
    font-size: 12px;
    border-radius: 8px;
    border: 0px;
    min-width: 100px;
    margin: 0;
    margin-top:20px;
    margin-bottom:10px;
  }
  .error {
    background:var(--alert);
    color:var(--header-color);
  }
  .success {
    background:var(--header-bg);
    color:var(--header-color);
  }
</style>
