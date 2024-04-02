<template>
    <div class="signInContainer">
        <p class="signInHeader">Sign In</p>
        <input class="signInput" type="text" placeholder="Email" v-model="email" />
        <input class="signInput" type="text" placeholder="Password" v-model="password" />
        <p v-if="errMsg">{{ errMsg }}</p>
        <button class="signButtons" @click="register">Submit</button>
        <br />
        <button class="signButtons" @click="signInWithGoogle">Sign in with Google</button>
        <br />
        <a href='/register'>
            <button class="signButtons">
                New? Create an account!
            </button>
        </a>
    </div>
</template>

<script setup>
import { ref } from "vue";
import {
    getAuth,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const errMsg = ref();
const router = useRouter();

const register = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((data) => {
            console.log("Successfully signed in!");
            router.push("/home");
        })
        .catch((error) => {
            console.log(error.code);
            switch (error.code) {
                case "auth/invalid-email":
                    errMsg.value = "Invalid email.";
                    break;
                case "auth/user-not-found":
                    errMsg.value = "No account with that email was found.";
                    break;
                case "auth/wrong-password":
                    errMsg.value = "Incorrect password";
                    break;
                default:
                    errMsg.value = "Email or password was incorrect";
                    break;
            }
        });
};

const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(getAuth(), provider)
        .then((result) => {
            console.log(result.user);
            router.push("/home");
        })
        .catch((error) => { });
};
</script>

<style>
.signInContainer {
    width: 50%;
    height: fit-content;
    margin: auto;
    margin-top: 150px;
    padding: 10px;
    background-color: #c7c7c7;
    border-radius: 10px;
    box-shadow: 0px 0px 10px black;
}

.signInHeader {
    font-size: 30px;
    font-weight: bolder;
    margin-top: 15px;
    margin-bottom: 10px;
}

.signInput {
    border: 1px solid rgba(0, 0, 0, 0.5);
    margin: 5px;
}

.signButtons {
    border: 1px solid #848484;
    border-radius: 5px;
    color: rgb(0, 0, 0);
    background-color: #7e86cc;
    padding: 7px 15px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 14px;
    margin: 4px 2px;
    margin-bottom: 15px;
    cursor: pointer;
}
</style>
