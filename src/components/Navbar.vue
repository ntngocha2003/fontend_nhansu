<template>
    <div class="navbar">
                <div class="uk-flex uk-flex-between">
                    <button class="btn-menu collapse-menu">
                        <span uk-icon="icon: menu"></span>
                    </button>
                    <div class="navbar-top-link">
                        <div class="notice">
                            <div class="header-link dropdown-toggle">
                                <span uk-icon="icon:bell"></span>
                                <span class="bg-secondary">5</span>
                            </div>
                        </div>
                        <div class="uk-flex uk-flex-middle">
                            <span uk-icon="icon: sign-out" class="icon-logout"></span>
                            <router-link to="/logout" class="link-logout">Đăng xuất</router-link>
                        </div>
                    </div>
                </div>
    </div>
</template>