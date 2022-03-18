import WallPage from "../pages/Wall/WallPage.vue"
import LoginPage from "../pages/LoginPage.vue"
import RegisterPage from "../pages/RegisterPage.vue"
import ProfilePage from "../pages/ProfilePage.vue"
import { createRouter, createWebHistory } from "vue-router"

const routes = [
    { path: "/login", component: LoginPage },
    { path: "/signup", component: RegisterPage },
    { path: "/home", component: WallPage },
    { path: "/", redirect:"/login" },
    { path: "/profile", component: ProfilePage }
]

const router = createRouter({ history: createWebHistory(), routes })

export { router }