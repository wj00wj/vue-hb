<template>
    <div class="notificatBar">
        <div class="cardBox">
            <div class="cardHead">
                <p>消息中心</p>
                <i
                    class="el-icon-close"
                    @click="$store.commit('app/SET_MSGISOPEN')"
                ></i>
            </div>
            <ul class="conUl">
                <li v-for="item in msgList" :key="item.id">
                    <router-link :to="item.link" class="conUl_link">
                        <span class="conUl_sp0">{{item.content}}</span>
                        <span class="conUl_sp1">{{item.time}}</span>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default{
    data(){
        return{
            msgList:[
                {
                    id: '1',
                    content: '优惠券到期提醒',
                    link: '',
                    time: '2019-06-01'
                },
                {
                    id: '2',
                    content: '618大促，请查看活动具体信息',
                    link: '',
                    time: '2019-06-02'
                },
                {
                    id: '3',
                    content: '充值成功',
                    link: '',
                    time: '2019-07-02'
                },
                {
                    id: '4',
                    content: '密码充值成功！',
                    link: '',
                    time: '2019-07-02'
                }
            ]
        }
    }
}
</script>