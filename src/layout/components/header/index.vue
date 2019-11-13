<template>
    <div class="header">
        <div class="header_l">
            <a href="javascript:;" class="logoLink">
                <img src="./logo.png" alt="logo">Vue Project
            </a>
        </div>
        <div class="header_r">
            <div class="headr_d1">
                <side-collapse class="sidecoll"></side-collapse>
                <bread-crumb class="bread"></bread-crumb>
            </div>
            <div class="headr_d2">
                <ul class="headrUl clearFixed">
                    <li id="domMessage">
                        <el-badge is-dot @click.native="toggleMsgShow">
                            <i class="el-icon-message-solid iconFont"></i>
                        </el-badge>
                    </li>
                    <li id="domFullScreen">
                        <full-screen></full-screen>
                    </li>
                    <li id="domPersonal">
                        <user-dropdown></user-dropdown>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import SideCollapse from '@/components/SideCollapse'
import BreadCrumb from '@/components/BreadCrumb'
import UserDropdown from '@/components/UserDropdown'
import FullScreen from '@/components/FullScreen'
export default{
    components:{
        SideCollapse,
        BreadCrumb,
        UserDropdown,
        FullScreen
    },
    methods:{
        toggleMsgShow(){
            this.$store.commit('app/SET_MSGISOPEN')
        }
    }
}
</script>
<style lang="scss">
.cardBox{
    width:100%;
    .cardHead{
        height: 50px;
        padding: 0 20px;
        border-bottom:1px solid #e4e4e4;
        line-height:50px;
        p{
            font-size:16px;
            color:#333;
            float:left;
        }
        i{
            float: right;
            font-size: 20px;
            margin-top: 14px;
            color:#b3b3b3;
            cursor: pointer;
            transition:all 0.2s;
            &:hover{
                color:#333;
            }
        }
    }
}
.conUl{
    li{
        height: 50px;
        line-height: 50px;
        .conUl_link{
            display: block;
            margin: 0 20px;
            height: 100%;
            border-bottom:1px solid #e4e4e4;
        }
        .conUl_sp0{
            font-size: 14px;
        }
        .conUl_sp1{
            font-size: 12px;
            color: #b3b3b3;
            float: right;
        }
    }
}
</style>