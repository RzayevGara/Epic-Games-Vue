<template>
    <main id="login">
        <div class="login-container">
            <div class="login-text">
                <img src="../../assets/image/svg/logo.png" alt="logo"/>
                <p>Choose how to sign in to your Epic Games Account.</p>
            </div>
            <ul class="login-option">
                <li>
                    <div class="logo">
                        <div>
                            <GoogleIcon/>
                        </div>
                    </div>
                    <p>Sign in with Google</p>
                </li>
            </ul>
            <div class="sign-up">
                <p>Don`t have an Epic Games Account?</p>
                <router-link to="/sign-up"><span>Sign Up</span></router-link>
            </div>
        </div>
    </main>
</template>

<script setup>
    import GoogleIcon from '../../assets/image/svg/google.svg'
</script>